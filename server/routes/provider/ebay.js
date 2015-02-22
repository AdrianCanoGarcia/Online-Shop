var express = require('express');
var router = express.Router();
var apiManager = require('../../manager/ebay');

function worker(io) {
  /* ROUTES */
  router.get('/:item/:numberPage/:order', getApi);
  /* ROUTES */

  function getApi(req, res) {
    var item = req.params.item;
    var numberPage=req.params.numberPage;
    var order= req.params.order;
    console.log("order en routes:"+order);
    apiManager.getApi(item,numberPage,order, function (result) {
      res.json(result);
    });

  }
  return router;
}

module.exports = worker;