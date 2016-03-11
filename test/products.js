"use strict"
var Jet = require('../');

var params = {
  SKU: 'testsku',
  user: 'test',
  pass: 'test',
  offset: 'testsku',
  limit: 1
}

function GetProductBySKU(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Products.requests.GetProductBySKU();
  req.set('SKU', params.SKU);
  return client.auth().then(client=>client.invoke(req));
}

function GetProductSKU(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Products.requests.GetProductSKU();
  req.set('offset', params.offset);
  req.set('limit', params.limit);
  return client.auth().then(client=>client.invoke(req));
}

function GetProductPrice(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Products.requests.GetProductPrice();
  req.set('SKU', params.SKU);
  return client.auth().then(client=>client.invoke(req));
}

function GetProductInventory(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Products.requests.GetProductInventory();
  req.set('SKU', params.SKU);
  return client.auth().then(client=>client.invoke(req));
}

function GetProductShippingException(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Products.requests.GetProductShippingException();
  req.set('SKU', params.SKU);
  return client.auth().then(client=>client.invoke(req));
}

GetProductSKU(params);
GetProductBySKU(params);
GetProductPrice(params);
GetProductInventory(params);
GetProductShippingException(params);
