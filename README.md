jet-sdk
======

Originally forked from [vedmalex/mws-sdk](https://github.com/fjshadows/jet-sdk).

What is done:
-------------

 - It is uses [request](https://www.npmjs.com/package/request). it is more flexible and there is no eventEmitter syntax.

 - Promises to provide generic async support.

Use it. Contriburte it.

it can be seamlesly used in ES2015/2016 way using [babel.js](https://babeljs.io/).
with new javascript code features like `yield` or `async` `wait` to put some sugar on your code.

Examples
--------

Initialize

```javascript
var Jet = require('jet-sdk'),
    client = new Jet.Client('user', 'pass', {});
```

Using for getting Products by SKU

```javascript

function GetProductBySKU(user, pass, SKU) {
  var client = new Jet.Client(user, pass, {});
  var req = Jet.Products.requests.GetProductBySKU();
  req.set('SKU', SKU);
  return client.auth().then(client=>client.invoke(req));
}

```
