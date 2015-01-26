var express = require('express');
var router = express.Router();
var proposalManager = require('../manager/proposal');
var url = require('url');

function worker(io) {
  /* ROUTES */
  router.post('/', create);
  router.get('/', getAll);
  
  /* ROUTES */

  
      
  
  function create(req, res, next) {
    var post = {
      content: req.body.content,
      mail: req.body.mail,
      date: req.body.date
    }
    proposalManager.create(post, function (err, result) {
      if (err) {
        return next(err);
      }
      res.json(result);
      io.sockets.emit('AdPublished', result);
    });

  }
  function getAll(req, res, next) {
    proposalManager.getAll(function (err, result) {
      if (result) {
        res.json(result);
        console.log(result);
      } else {
        next(new Error(new Error('Unable to connect')));
      }
    });
  }
  return router;
}
module.exports = worker;