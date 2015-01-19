var express = require('express');
var router = express.Router();
var proposalManager = require('../manager/proposal');

/* ROUTES */
router.post('/', create);
/* ROUTES */

function create(req, res) {
    var post = {
     content : req.body.content,
     mail : req.body.mail
    }
    proposalManager.create(post, function (err, result) {
        res.json(result);
        
    });
    
}
module.exports = router;