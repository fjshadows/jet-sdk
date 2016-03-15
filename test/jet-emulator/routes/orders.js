var express = require('express');
var router = express.Router();

// Return order list
router.get('/complete', function(req, res, next) {
  var result = {
    "order_urls": [
      "/orders/withoutShipmentDetail/57e542a613fa42d8b6e8362dbd5911f5",
      "/orders/withoutShipmentDetail/a10b4b28467c490984e0b387e1cc2d9a",
      "/orders/withoutShipmentDetail/32c05c3230fc498e95f82129efd10213"
    ]
  };
  res.send(JSON.stringify(result));
});

// Return order details
router.get('/withoutShipmentDetail/*', function(req, res, next) {
  var result = {
    "merchant_order_id" : "9b13bdd68c314d1b9c8b93277dea4da1",
    "reference_order_id" : "123456789012",
    "fulfillment_node" : "EIDIDSNKDSFDKSJDKJSDJKFJF",
    "order_placed_date" : "2014-07-24T17:00:00.0000000Z",
    "order_transmission_date" : "2014-07-24T17:01:00.0000000Z",
    "order_ready_date" : "2014-07-24T20:00:00.0000000Z",
    "order_acknowledge_date" : "2014-07-24T20:01:00.0000000Z",
    "status" : "complete",
    "hash_email" : "aj45894Ifklsdjfkdshfioweiorjfiurser93djfh@customer.jet.com",
      "buyer": {
        "name": "Tony Stark",
        "phone_number": "555-999-9999"
      },
      "shipping_to": {
        "recipient" : {
          "name" : "Pepper Potts",
          "phone_number" : " 555-888-8888"
        },
        "address" : {
          "address1": "10880 Malibu Point",
          "address2": "",
          "city": "Malibu",
          "state": "CA",
          "zip_code": "90265"
        }
      },
      "order_totals": {
        "item_price": {
          "base_price": 20,
          "item_tax" : 0.14,
          "item_shipping_cost" : 5,
          "item_shipping_tax" : 0.35
        },
        "item_fees": 2.01,
        "fee_adjustments": [
          {
            "adjustment_name": "",
            "adjustment_type": "base",
            "commission_id":"",
            "value": 1.20
          }
        ],
        "regulatory_fees" : 0.00,

      "order_items": [
        {
          "order_item_id": "8f5ae15b6b414b00a1b9d6ad99166a00",
          "merchant_sku": "B289B4B",
          "request_order_quantity": 2,
          "item_tax_code": "",
          "item_price": {
            "base_price": 20,
            "item_tax" : 0.14,
            "item_shipping_cost" : 5,
            "item_shipping_tax" : 0.35
          },
          "item_fees": 2.01,
          "fee_adjustments": [
            {
              "adjustment_name": "",
              "adjustment_type": "base",
              "commission_id":"",
              "value": 1.20
            }
          ],
          "regulatory_fees" : 0.00,
          "product_title": "blue pair of socks",
          "url": ""
        }
      ],
      "order_detail": {
        "request_shipping_carrier" : "UPS",
        "request_shipping_method" : "UPS_ground",
        "request_service_level" : "Standard",
        "request_ship_by": "2014-07-26T:04:00.0000000Z",
        "request_delivery_by": "2014-07-28T04:00:00.0000000Z"
      }
    }
  };
  res.send(JSON.stringify(result));
});



module.exports = router;
