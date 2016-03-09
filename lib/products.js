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
function ProductsRequest(action, params) {
    var opts = {
        name: 'Products',
        group: 'Products',
        path: 'merchant-skus/',
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
     * Returns a product and attributes
     */
    GetProductBySKU: function() {
        return new ProductsRequest('', {
            SKU: { name: 'SKU', required: true}
        });
    },

    /**
     * Returns a product SKU list
     */
    GetProductSKU: function() {
        return new ProductsRequest('', {
          offset: { name: 'offset', required: false},
          limit: { name: 'limit', required: false}
        });
    },

    /**
     * Returns a product SKU list
     */
    GetProductPrice: function() {
        return new ProductsRequest('price', {
            SKU: { name: 'SKU', required: true}
        });
    },
};
