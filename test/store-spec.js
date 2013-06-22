/*jshint asi:true, white:false*/
/*global describe, it, expect, console, jasmine,
  beforeEach, spyOn, afterEach, xdescribe, xit */

(function (namespace) {
  'use strict';

  var ns = window[namespace] = window[namespace] || {};

  // TODO: update this since we killed the orderBuilder
  xdescribe('OrderBuilder UI Component', function() {
    var store;
    beforeEach(function () {
      orderBuilder = ns.instantiate.orderBuilder()
    })

    afterEach(ns.fixtures.empty)

    describe('instance', function() {
      it('should be chainable', function() {
        expect( orderBuilder.isChainable ).toBe(true)
      })

      it('should be observable', function() {
        expect( orderBuilder.isObservable ).toBe(true)
      })

      it('should be templateable', function() {
        expect( orderBuilder.isTemplateable ).toBe(true)
      })
    })

    describe('start()', function() {})

    describe('add()', function() {
      var orderBuilder;
      var uuid = '1234'
      beforeEach(function () {
        orderBuilder = ns.instantiate.orderBuilder()
        var colors = [[ 'White', '#ffffff' ]]
        var sizes = [{ name: 'Small', value: 'S' }]
        orderBuilder._order.colors(colors)
        orderBuilder._order.sizes(sizes)
        spyOn(window, 'UUID').andReturn(uuid)
        spyOn(ns.Stage.prototype, 'color').andReturn('White')
      })

      afterEach(ns.fixtures.empty)

      it('should add a new line item entry row', function() {
        orderBuilder.add()
        var totalNumberOfLineItems = getLineItemRows(orderBuilder).length

        expect( totalNumberOfLineItems ).toBe( 1 )
      })

      it('should render a line item with the correct data', function() {
        var colors = [[ 'Black', '#000' ]]
        var sizes = [{ name: 'Large', value: 'L' }]
        var lineitem = { uuid: uuid, quantity: 1, size: 'M', color: colors[0][0] };
        spyOn(orderBuilder._order, 'colors').andReturn(colors)
        spyOn(orderBuilder._order, 'sizes').andReturn(sizes)
        spyOn(orderBuilder._order, 'create').andReturn(lineitem)

        orderBuilder.add()

        var row = getLineItemRows(orderBuilder)[0]
        var expected = '<td class="column-quantity rpad"><input data-property="quantity" id="quantity-1234" min="0" name="quantity-1234" step="1" type="number" value="0"></td><td class="column-size lpad rpad"><div class="swatch-select select-ui"><select data-property="size" id="size-1234" name="size-1234"><option value="L">Large</option></select></div></td><td class="column-color lpad rpad"><div class="swatch-select select-ui"><select class="swatch" data-property="color" id="color-1234" name="color-1234"><option value="#000">Black</option></select></div></td><td class="column-delete lpad"><a class="delete" data-action="delete" href="#lineitem-1234"><abbr title="Delete">×</abbr></a></td>'

        expect( row.innerHTML ).toBe( expected )
      })
    })

    describe('remove()', function() {
      var orderBuilder;
      var uuid = '1234'
      beforeEach(function () {
        spyOn(window, 'UUID').andReturn(uuid)
        orderBuilder = ns.instantiate.orderBuilder()

        var lineitem = { uuid: uuid, quantity: 1, size: 'M', color: 'Black' };
        spyOn(orderBuilder._order, 'create').andReturn(lineitem)

        orderBuilder.add()
      })

      afterEach(ns.fixtures.empty)

      it('should remove a line item by uuid', function() {
        orderBuilder.remove(uuid)

        var totalNumberOfLineItems = getLineItemRows(orderBuilder).length

        expect( totalNumberOfLineItems ).toBe( 0 )
      })

      it('should call `remove` on the Order model', function() {
        spyOn(ns.Order.prototype, 'remove')

        orderBuilder.remove(uuid)

        expect( orderBuilder._order.remove ).toHaveBeenCalled()
        expect( orderBuilder._order.remove ).toHaveBeenCalledWith(uuid)
      })

    })

    describe('update()', function() {
      var orderBuilder;
      var uuid = '1234'
      beforeEach(function () {
        orderBuilder = ns.instantiate.orderBuilder()

        var lineitem = { uuid: uuid, quantity: 1, size: 'M', color: 'Black' };
        spyOn(orderBuilder._order, 'create').andReturn(lineitem)

        orderBuilder.add()
      })

      afterEach(ns.fixtures.empty)

      it('should call update on the Order model', function() {
        spyOn(orderBuilder._order, 'update')

        orderBuilder.update(uuid, 'quantity', 5)

        expect(orderBuilder._order.update).toHaveBeenCalled()
        expect(orderBuilder._order.update).toHaveBeenCalledWith(uuid, 'quantity', 5)

      })
    })

    describe('sync()', function() {
      var orderBuilder;
      beforeEach(function () {
        orderBuilder = ns.instantiate.orderBuilder()
      })

      afterEach(ns.fixtures.empty)

      it('should sync its view with the current Order', function() {
        var colors = [[ 'White', '#ffffff' ], ['Ash', '#777777']]
        var sizes = [{ name: 'Medium', value: 'M' }, { name: 'Large', value: 'L' }]
        var order = [
          { uuid: '1234', size: 'M', quantity: 6, color: 'White' },
          { uuid: '1235', size: 'M', quantity: 6, color: 'Ash' },
          { uuid: '1236', size: 'L', quantity: 2, color: 'Ash' },
        ]
        spyOn(orderBuilder._order, 'colors').andReturn(colors)
        spyOn(orderBuilder._order, 'sizes').andReturn(sizes)
        spyOn(orderBuilder._order, 'order').andReturn(order)

        orderBuilder.sync()

        var rendered = orderBuilder.template['lineItem'].container.innerHTML
        var expected = [
          '<tr data-id="1234" id="lineitem-1234"><td class="column-quantity rpad"><input data-property="quantity" id="quantity-1234" min="0" name="quantity-1234" step="1" type="number" value="0"></td><td class="column-size lpad rpad"><div class="swatch-select select-ui"><select data-property="size" id="size-1234" name="size-1234"><option value="M">Medium</option><option value="L">Large</option></select></div></td><td class="column-color lpad rpad"><div class="swatch-select select-ui"><select class="swatch" data-property="color" id="color-1234" name="color-1234"><option value="#ffffff">White</option><option value="#777777">Ash</option></select></div></td><td class="column-delete lpad"><a class="delete" data-action="delete" href="#lineitem-1234"><abbr title="Delete">×</abbr></a></td></tr>',
          '<tr data-id="1235" id="lineitem-1235"><td class="column-quantity rpad"><input data-property="quantity" id="quantity-1235" min="0" name="quantity-1235" step="1" type="number" value="0"></td><td class="column-size lpad rpad"><div class="swatch-select select-ui"><select data-property="size" id="size-1235" name="size-1235"><option value="M">Medium</option><option value="L">Large</option></select></div></td><td class="column-color lpad rpad"><div class="swatch-select select-ui"><select class="swatch" data-property="color" id="color-1235" name="color-1235"><option value="#ffffff">White</option><option value="#777777">Ash</option></select></div></td><td class="column-delete lpad"><a class="delete" data-action="delete" href="#lineitem-1235"><abbr title="Delete">×</abbr></a></td></tr>',
          '<tr data-id="1236" id="lineitem-1236"><td class="column-quantity rpad"><input data-property="quantity" id="quantity-1236" min="0" name="quantity-1236" step="1" type="number" value="0"></td><td class="column-size lpad rpad"><div class="swatch-select select-ui"><select data-property="size" id="size-1236" name="size-1236"><option value="M">Medium</option><option value="L">Large</option></select></div></td><td class="column-color lpad rpad"><div class="swatch-select select-ui"><select class="swatch" data-property="color" id="color-1236" name="color-1236"><option value="#ffffff">White</option><option value="#777777">Ash</option></select></div></td><td class="column-delete lpad"><a class="delete" data-action="delete" href="#lineitem-1236"><abbr title="Delete">×</abbr></a></td></tr>'
        ].join('')

        expect(rendered).toBe(expected)
      })
    })

  })

  function getLineItemRows(orderBuilder) {
    return orderBuilder.template['lineItem'].container.querySelectorAll('tr')
  }

})('skookum')

