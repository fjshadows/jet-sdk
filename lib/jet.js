'use strict';
var qs = require("querystring");
var request = require('request');
var _ = require('underscore');

/**
 * Constructor for the main Jet client interface
 *
 * @param {String} user     Id for your user (required)
 * @param {String} pass     Secret Access Key provided by Jet (required)
 * @param {Object} options         Additional configuration options for this instance
 */
function JetClient(user, pass, options) {
	options = options || {};
	this.host = options.host || 'merchant-api.jet.com';
	this.user = user || null;
	this.pass = pass || null;
	this.id_token = options.id_token || null;
	this.method = options.method || 'GET';
}

/**
 * Calls auth method and set id_token.
 *
 * @return Promise
 */
JetClient.prototype.auth = function() {
	var _this = this;
	var requestOpts,
			query;

	if (this.user == null || this.pass == null) {
		throw "user and pass, or id_token must be set";
	}

	var requestOpts = {
		"method": 'POST',
		"uri": 'http://' + this.host + '/api/token',
		form: {
			"user": this.user,
			"pass": this.pass
		}
	};

	return new Promise(function(resolve, reject) {
		request(requestOpts, function(err, response, data) {
			try {
				data = JSON.parse(data);
				if (err) {
					reject(err);
				} else if(data.errors) {
					reject(data.errors[0]);
				} else {
					_this.id_token = data.id_token;
					resolve(_this);
				}
			} catch(e) {
				reject(e);
			}
		});
	});
}

// @TODO need refactoring. it's terribly
/**
 * Calls Jet Endpoints.
 *
 * @param  {Object}   api      Settings object unique to each API submodule
 * @param  {Object}   query    Any parameters belonging to the current action
 * @return Promise
 */
JetClient.prototype.call = function(api, query) {
	var usedParams = ['sku', 'offset', 'limit'],
			SKU,
			tmpParam,
			requestOpts;

	if (this.id_token == null) {
		throw "need Authorization";
	}

	SKU = query.SKU ? query.SKU + '/': '';
	api.path = api.path + SKU + api.action;

	for(var param in query) {
	  if(query.hasOwnProperty(param) && !~usedParams.indexOf(param.toLowerCase())) {
	     tmpParam = query[param] ? query[param] + '/': '';
			 api.path = api.path + tmpParam;
	  }
	}

	if(query.offset && query.limit) {
		api.path = api.path + '?offset=' + query.offset + '&limit=' + query.limit;
	} else if(query.offset) {
		api.path = api.path + '?offset=' + query.offset;
	} else if(query.limit) {
		api.path = api.path + '?limit=' + query.limit;
	}

	requestOpts = {
		method: this.method,
		uri: 'http://' + this.host + '/api/' + api.path
	};

	requestOpts.headers = {
		'Content-Type': 'application/json',
		'Authorization': this.id_token
	};

	return new Promise(function(resolve, reject) {
		request(requestOpts, function(err, response, data) {
			try {
				data = JSON.parse(data);
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			} catch(e) {
				reject(e);
			}
		});
	});
};

/**
 * Suggested method for invoking a pre-defined mws request object.
 *
 * @param  {Object}   request  An instance of JetRequest with params, etc.
 * @return Promise
 */
JetClient.prototype.invoke = function(request) {
	var _this = this;
	return request.query().then(function(q) {
		return _this.call(request.api, q);
	});
};

/**
 * Constructor for general MWS request objects, wrapped by api submodules to keep
 * things DRY, yet familiar despite whichever api is being implemented.
 *
 * @param {Object} options Settings to apply to new request instance.
 */
function JetRequest(options) {
	this.params = options.params || {};
	this.paramsMap = {};

	this.api = {
		path: options.path,
		action: options.action,
		upload: options.upload
	};

	if(Object.keys(this.params).length > 0) {
		for( var name in this.params){
			var realName = this.params[name].name;
			if(name!== this.params[name].name){
				this.paramsMap[name] = realName;
				this.params[realName] = this.params[name];
				delete this.params[name];
			}
		}
	}
}

/**
 * Handles the casting, renaming, and setting of individual request params.
 *
 * @param {String} param Key of parameter (not ALWAYS the same as the param name!)
 * @param {Mixed} value Value to assign to parameter
 * @return {Object} Current instance to allow function chaining
 */
JetRequest.prototype.set = function(param, value) {
	if (value !== null && value !== undefined) {
		var self = this;

		if(this.paramsMap.hasOwnProperty(param)) {
				param = this.paramsMap[param];
		}

		var p = this.params[param],
			  v = p.value = {};

		// Handles the actual setting based on type
		var setValue = function setValue(name, val) {
			console.log('setValue',name, val);
			if (p.type == 'Boolean') {
				self.params[name].value = val ? 'true' : 'false';
			} else {
				self.params[name].value = val;
			}
		};

		setValue(p.name, value);
	}
	return this;
};

/**
 * Builds a query object and checks for required parameters.
 *
 * @return {Object} KvP's of all provided parameters (used by invoke())
 */
JetRequest.prototype.query = function() {
	var _this = this;
	return new Promise(function(resolve, reject) {
		var q = {};
		var missing = [];
		for (var param in _this.params) {
			var value = _this.params[param].value,
				name = _this.params[param].name,
				required = _this.params[param].required;
			if (value !== undefined && value !== null) {
				q[name] = value;
			} else {
				if (param.required === true) {
					missing.push(name);
				}
			}
		}
		if (missing.length > 0) reject(new Error("ERROR: Missing required parameter(s): " + missing.join(',') + "!"));
		else resolve(q);
	});
};

exports.Client = JetClient;
exports.Request = JetRequest;
exports.Products = require('./products');
exports.Orders = require('./orders');
