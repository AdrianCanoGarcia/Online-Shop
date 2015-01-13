var express = require('express');
var router = express.Router();
var apiManager = require('../manager/api-call');

//routes
router.get('/:item', getApi);

function getApi(req, res, next){
    var item = req.params.item;
    res.json(apiManager.req(item));
}

module.exports = {
    req:req
};