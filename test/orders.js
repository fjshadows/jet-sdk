"use strict"
var Jet = require('../');

var params = {
  orderId: 'testsku',
  user: 'test',
  pass: 'test',
  status: 'complete',
  offset: 'testsku',
  limit: 1
}

function GetOrderList(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Orders.requests.GetOrderList();
  req.set('status', params.status);
  return client.auth().then(client=>client.invoke(req));
}

function GetOrder(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Orders.requests.GetOrder();
  req.set('orderId', params.orderId);
  return client.auth().then(client=>client.invoke(req));
}

GetOrderList(params);
GetOrder(params);
