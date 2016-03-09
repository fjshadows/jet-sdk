var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(req.baseUrl + req.url);
});

/* GET home page. */
router.post('/', function(req, res, next) {
  res.send(req.baseUrl + '\n' + JSON.stringify(req.body, null, 2));
});

/* Auth emulation. */
router.post('/api/token', function(req, res, next) {
  var result;
  if(req.body.user !== 'test'  || req.body.pass !== 'test') {
    result = {
      "errors": [
        "Bad Request"
      ]
    };
  } else {
    result = {
      "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpcm9ubWFuX3BvcnRhbF91c2VyX2lkIjoiYmE2OTQ1NjRjNzM2NGRiY2FkNTFkMzEwZWY5NGJjOGMiLCJpc19zYW5kYm94X3VpZCI6IlRydWUiLCJtZXJjaGFudF9pZCI6IjZiYThmOWUzZjFhYjQ5MmQ4MWRhNzk1MGYyYTNjNGM5IiwicGFydG5lcl90eXBlIjoiTWVyY2hhbnQiLCJzY29wZSI6Imlyb25tYW4tYXBpIiwiaXNzIjoiamV0LmNvbSIsImV4cCI6MTQ1MDI0MTY5NSwibmJmIjoxNDUwMjA1Njk1fQ.Cx_L1n2smHOsPfbjoOBPz_k4NFg_QSAz6cxJi6Z_cm_i1yKE7uiciF3fHvv7Y5MIsGbqDSEMP2GDHrJDrMYgPlYZvf42AX90ZLUak_QG17WWpwTtia1kkRN8SBYTgUvG-biBepvxmLnf-hty-Hj20c7j1TZH8qFblbMSDm3ximVY9Xw2As5OfyEoZZcswPfO_VgLwks6sz-uTociFgvGwxpS_Nn6LPSaj6KUqCWgSnbs5cLc0ux23brvWW7S8ZgJuEPHECSFo_ivyHyh55oPlXrCtOFnN-S9ny7Azgl7szFAFCCTAq01moAQBE5yYee07NO1EAJNsOEjFiHDsqvzow",
      "token_type": "Bearer",
      "expires_on": "2015-12-16T04:54:55Z"
    };
  }
  res.send(JSON.stringify(result));
});

router.get('/api/merchant-skus/testsku', function(req, res, next) {
  var result = {
    "status":"Available for Purchase",
    "product_title": "My Product",
    "jet_browse_node_id": 1000001,
    "standard_product_codes": [
      {
      "standard_product_code": "123456789012",
      "standard_product_code_type": "UPC"
      }
    ],
    "multipack_quantity": 6,
    "brand": "My Product's Brand",
    "manufacturer": "My Product's Manufacturer",
    "mfr_part_number": "AB-9874",
    "product_description": "This is a terrific product that everyone should own.",
    "bullets": [
      "This is bullet line 1",
      "This is bullet line 2"
    ],
    "number_units_for_price_per_unit": 1,
    "type_of_unit_for_price_per_unit": "each",
    "shipping_weight_pounds": 10,
    "package_length_inches": 12,
    "package_width_inches": 12,
    "package_height_inches": 12,
    "display_length_inches": 15,
    "display_width_inches": 12,
    "display_height_inches": 14,
    "prop_65": true,
    "legal_disclaimer_description": "Legal stuff goes here",
    "cpsia_cautionary_statements": [
      "choking hazard balloon",
      "choking hazard small parts"
    ],
    "country_of_origin": "U.S.A.",
    "safety_warning": "warning text goes here",
    "fulfillment_time": 1,
    "msrp": 6.99,
    "map_price": 6.49,
    "map_implementation": "101",
    "product_tax_code": "123",
    "no_return_fee_adjustment": 0.01,
    "exclude_from_fee_adjustments": false,
    "ships_alone": false,
    "attributes_node_specific": [
      {
      "attribute_id": 95,
      "attribute_value": "80",
      "attribute_value_unit": "count"
      },
      {
      "attribute_id": 119,
      "attribute_value": "aqua"
      },
      {
      "attribute_id": 2,
      "attribute_value": "blue"
      }
    ],
    "main_image_url": "http://www.mydomain.com/images/myImage.png",
    "swatch_image_url": "http://www.mydomain.com/images/myImage.png",
    "alternate_images": [
      {
      "image_slot_id": 1,
      "image_url": "http://www.mydomain.com/images/myImage.png"
      },
      {
      "image_slot_id": 2,
      "image_url": "http://www.mydomain.com/images/myImage.png"
      }
    ]
  };
  res.send(JSON.stringify(result));
});

router.get('/api/merchant-skus', function(req, res, next) {
  var result = {
    "sku_urls": [
      "merchant-skus/testsku",
      "merchant-skus/testsku1",
      "merchant-skus/testsku2",
      "merchant-skus/errsku2"
    ]
  };
  res.send(JSON.stringify(result));
});

router.get('/api/merchant-skus/testsku/price', function(req, res, next) {
  var result = {
    "fulfillment_nodes": [],
    "price": 10,
    "price_last_update": "2015-09-10T18:07:20.0830684+00:00"
  };
  res.send(JSON.stringify(result));
});

module.exports = router;
