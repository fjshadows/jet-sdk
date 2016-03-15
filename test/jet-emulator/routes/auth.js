var express = require('express');
var router = express.Router();

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

module.exports = router;
