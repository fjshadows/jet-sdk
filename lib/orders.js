/**
 * Products API requests and definitions for Jet web services.
 * For information on using, please see examples folder.
 *
 * @author Robert Saunders
 */
var jet = require('./jet');

/**
 * Construct a Products API request for using with jet.Client.invoke()
 *
 * @param {String} action Action parameter of request
 * @param {Object} params Schemas for all supported parameters
 */
function OrdersRequest(action, params) {
  var opts = {
    name: 'Orders',
    group: 'Orders',
    path: 'orders/',
    action: action ? action + '/': '',
    params: params
  };
  return new jet.Request(opts);
}

/**
 * A collection of currently supported request constructors. Once created and
 * configured, the returned requests can be passed to an jet client `invoke` call
 * @type {Object}
 */
var calls = exports.requests = {

  /**
   * Returns a order id list by status
   */
  GetOrderList: function() {
    return new OrdersRequest('', {
      status: { name: 'status', required: true}
    });
  },

  /** @DEPRICATED
   * Returns a order id list by status
   */
  GetOrders: function() {
    console.log('[WARNING!] GetOrders DEPRICATED use GetOrderList');
    return new OrdersRequest('', {
      status: { name: 'status', required: true}
    });
  },

  /**
   * Returns a orders details
   */
  GetOrder: function() {
    return new OrdersRequest('withoutShipmentDetail', {
      orderId: { name: 'orderId', required: true}
    });
  },

  /** @DEPRICATED
   * Returns a orders details
   */
  GetOrderDetails: function() {
    console.log('[WARNING!] GetOrderDetails DEPRICATED use GetOrder');
    return new OrdersRequest('withoutShipmentDetail', {
      orderID: { name: 'orderID', required: true}
    });
  }
};
