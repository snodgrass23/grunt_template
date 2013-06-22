/*jshint asi:true, white:false*/
/*global describe, it, expect, console, jasmine,
  beforeEach, spyOn, afterEach, xdescribe, xit */

(function (namespace) {
  'use strict';

  var ns = window[namespace] = window[namespace] || {};

  describe('Order Model', function() {
    var order;
    beforeEach(function () {
      order = ns.instantiate.orderModel()
    })

    describe('instance', function() {
      it('should be stateful', function() {
        expect( order.isStateful ).toBeDefined()
        expect( order._state ).toBeDefined()
      })

      it('should be observable', function() {
        expect( order.isObservable ).toBe(true)
      })
    })

    describe('start()', function () {})
    describe('update()', function () {})

    describe('_isValidLineItem()', function () {
      var order;
      beforeEach(function () {
        order = ns.instantiate.orderModel()
      })

      it('should return true for valid line items', function() {
        var lineItem = {
          quantity: 7,
          color: 'White',
          size: 'M'
        }

        var returned = order._isValidLineItem(lineItem)

        expect(returned).toBe(true)
      })

      it('should return false for invalid line items', function() {
        var invalidLineItem = {
          quantity: 7,
          color: 'White',
          size: 'Q'
        }

        var returned = order._isValidLineItem(invalidLineItem)

        expect(returned).toBe(false)
      })
    })

    describe('add()', function () {
      var order
      beforeEach(function () {
        order = ns.instantiate.orderModel()
      })

      it('should add a new valid item', function() {
        var validItem = { quantity: 3, color: 'White', size: 'M' };
        var expected = [validItem]
        order.add(validItem)

        expect(order._state.order).toEqual(expected)
      })

      it('should append quantity to a valid item', function() {
        // setup to double the order
        var validItem = { quantity: 3, color: 'White', size: 'M' }
        order._state.order.push(validItem);

        var expected = [{ quantity: 6, color: 'White', size: 'M' }]
        order.add(validItem)

        expect(order._state.order).toEqual(expected)
      })

      it('should add a second item', function() {
        // setup to double the order
        var validItem = { quantity: 3, color: 'White', size: 'M' }

        var validItem2 = { quantity: 1, color: 'White', size: 'L' }
        var expected = [validItem, validItem2]
        order.add(validItem)
        order.add(validItem2)

        expect(order._state.order).toEqual(expected)
      })

      it('should emit an `add` event when adding adding data', function() {
        spyOn(order, 'emit')
        var validItem = { quantity: 3, color: 'White', size: 'M' }
        order.add(validItem)

        expect(order.emit).toHaveBeenCalled()
        expect(order.emit.argsForCall[0][0]).toBe('add')
      })

      it('should emit an `add:error` event when adding adding data', function() {
        spyOn(order, 'emit')
        var validItem = { quantity: 3, color: 'White', size: 'Q' }
        order.add(validItem)

        expect(order.emit).toHaveBeenCalled()
        expect(order.emit.argsForCall[0][0]).toBe('add:error')
      })
    })

    describe('remove()', function () {
      var order
      beforeEach(function () {
        order = ns.instantiate.orderModel()
        var validItem = { quantity: 3, color: 'White', size: 'M' };
        order.add(validItem);
      })

      it('should remove an item', function() {
        var validItem = { quantity: 3, color: 'White', size: 'M' };
        var expected = []
        order.remove(validItem)

        expect(order._state.order).toEqual(expected)
      })

      it('should reduce the quantity of a lineitem', function() {
        // setup to double the order
        var validItem = { quantity: 1, color: 'White', size: 'M' }

        var expected = [{ quantity: 2, color: 'White', size: 'M' }]
        order.remove(validItem)

        expect(order._state.order).toEqual(expected)
      })

      it('should emit a `remove` event when removing a lineitem', function() {
        spyOn(order, 'emit')
        var validItem = { quantity: 3, color: 'White', size: 'M' }
        order.remove(validItem)

        expect(order.emit).toHaveBeenCalled()
        expect(order.emit.argsForCall[0][0]).toBe('remove')
      })

      it('should emit an `remove:error` event when adding adding data', function() {
        spyOn(order, 'emit')
        var validItem = { quantity: 3, color: 'White', size: 'Q' }
        order.remove(validItem)

        expect(order.emit).toHaveBeenCalled()
        expect(order.emit.argsForCall[0][0]).toBe('remove:error')
      })
    })

    describe('update()', function () {
      var order, uuid = '1234'
      beforeEach(function () {
        order = ns.instantiate.orderModel()
        spyOn(window, 'UUID').andReturn(uuid)
        var validItem = { quantity: 3, color: 'White', size: 'M' }
        order.create(validItem);
      })

      it('should update an item given arguments (uuid, property, value)', function() {
        order.update(uuid, 'quantity', '4')
        var expected = [
          { uuid: uuid, quantity: 4, color: 'White', size: 'M' }
        ]

        expect(order._state.order).toEqual(expected)
      })

      it('should update an item given arguments (uuid, { prop: value, prop: value})', function() {
        order.update(uuid, { quantity: 7, size: 'L' })
        var expected = [
          { uuid: uuid, quantity: 7, color: 'White', size: 'L' }
        ]

        expect(order._state.order).toEqual(expected)
      })

    })
  })

})('skookum')
