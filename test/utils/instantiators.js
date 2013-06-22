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
    orderModel: createOrderModel,
    orderBuilder: createOrderBuilder
  }

  function createOrderModel() {
    // TODO: create stub/mock for stage dependency
    var stage = new ns.Stage()
    var orderModel = new ns.Order()
      .stage(stage)
      .start()

    return orderModel
  }

  function createOrderBuilder() {
    // TODO: create stub/mock for stage dependency
    ns.fixtures.orderBuilder()
    var orderModel = createOrderModel()
    var orderBuilder = new ns.OrderBuilder()
          .container(document.getElementById('modal-order-builder'))
          .order(orderModel)
          .start();

    return orderBuilder
  }

  ns.instantiate = exports

})('skookum');
