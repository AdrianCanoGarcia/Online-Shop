var express = require('express');
var router = express.Router();
var apiManager = require('../../manager/ebay');

function worker(io) {
  /* ROUTES */
  router.get('/:item/:numberPage', getApi);
  /* ROUTES */

  function getApi(req, res) {
    var item = req.params.item;
    var numberPage=req.params.numberPage;
    apiManager.getApi(item,numberPage, function (result) {
      res.json(result);
    });

  }
  return router;
}

module.exports = worker;