"use strict"
var Jet = require('../');

var params = {
  orderID: 'testsku',
  user: 'test',
  pass: 'test',
  status: 'complete',
  offset: 'testsku',
  limit: 1
}

function GetOrders(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Orders.requests.GetOrders();
  req.set('status', params.status);
  return client.auth().then(client=>client.invoke(req));
}

function GetOrderDetails(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});
  var req = Jet.Orders.requests.GetOrderDetails();
  req.set('orderID', params.orderID);
  return client.auth().then(client=>client.invoke(req));
}

GetOrders(params);
GetOrderDetails(params);
