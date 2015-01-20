var express = require('express');
var router = express.Router();
var apiManager = require('../../manager/ebay');

function worker(io) {
  /* ROUTES */
  router.get('/:item', getApi);
  /* ROUTES */

  function getApi(req, res) {
    var item = req.params.item;
    apiManager.getApi(item, function (result) {
      res.json(result);
    });

  }
  return router;
}

module.exports = worker;