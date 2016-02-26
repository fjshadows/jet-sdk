"use strict"
var Jet = require('../');

var params = {
  SKU: 'testsku',
  user: 'test',
  pass: 'test'
}

function GetProductBySKU(params) {
  var client = new Jet.Client(params.user, params.pass, {host:'localhost:3021'});

  var req = Jet.Products.requests.GetProductBySKU();
  req.set('SKU', params.SKU);

  return client.auth().then(client=>client.invoke(req));
}

GetProductBySKU(params);
