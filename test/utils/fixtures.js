/*jshint asi:true, white:false*/
/*global describe, it, expect, console, jasmine,
  beforeEach, spyOn, afterEach, xdescribe, xit */

/**
 * helper functions to set up minimum dependency chains.
 * this is a showcase of the dependency tree discussed
 * https://www.github.com/skookum/cheetah/issues/250
 *
 * @return {Object} `instantiate['thing']` to the global namespace
 */
(function (namespace) {
  'use strict';

  var ns = window[namespace] = window[namespace] || {}

  var exports = {
    // general
    empty: emptyFixture,
    create: createFixture,

    // component specific
    orderBuilder: createOrderBuilder
  }

  function emptyFixture() {
    // this could very well leak memory. good way to test how good/bad our code is
    var fixture = document.querySelector('#fixture')
    fixture.innerHTML = ''
  }

  function createFixture(html) {
    var fixture = document.querySelector('#fixture')
    if ('string' === typeof html)
      fixture.innerHTML = html
    else
      fixture.appendChild(html)
  }

  function createOrderBuilder() {
     var fixture = '<section class="modal" id="modal-order-builder"><header class="modal-header"><h1>Edit Your Order</h1><a class="close" href="#modal-order-builder">&times;</a></header><div class="modal-body"><form><table><thead><tr><th class="rpad" scope="row">Quantity</th><th class="lpad rpad" scope="row">Size</th><th class="lpad rpad" scope="row">Color</th><th class="lpad" scope="row"><span class="visuallyhidden">Delete</span></th></tr></thead><tbody class="order-template-container"></tbody><tfoot><tr><td colspan="4"><a data-action="add" href="javascript:null">Add another variant</a></td></tr></tfoot></table><script class="order-template" type="text/template"><tr data-id="{{ lineitem.uuid }}" id="lineitem-{{ lineitem.uuid }}"><td class="column-quantity rpad"><input data-property="quantity" id="quantity-{{ lineitem.uuid }}" min="0" name="quantity-{{ lineitem.uuid }}" step="1" type="number" value="0" /></td><td class="column-size lpad rpad"><div class="swatch-select select-ui"><select data-property="size" id="size-{{ lineitem.uuid }}" name="size-{{ lineitem.uuid }}">{[ options.sizes.forEach(function (size, index) { ]}<option value="{{ size.value }}">{{ size.name }}</option>{[ }); ]}</select></div></td><td class="column-color lpad rpad"><div class="swatch-select select-ui"><select class="swatch" data-property="color" id="color-{{ lineitem.uuid }}" name="color-{{ lineitem.uuid }}">{[ options.colors.forEach(function(color, index) { ]}<option value="{{ color[1] }}">{{ color[0] }}</option>{[ }); ]}</select></div></td><td class="column-delete lpad"><a class="delete" data-action="delete" href="#lineitem-{{ lineitem.uuid }}"><abbr title="Delete">&times;</abbr></a></td></tr></script><div class="form-actions"><button class="btn btn-inline" type="submit">Update</button></div></form></div></section>'

     emptyFixture()
     createFixture(fixture)
  }

  ns.fixtures = exports

})('skookum');
