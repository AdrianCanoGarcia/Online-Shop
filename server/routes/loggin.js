var express = require('express');
var router = express.Router();
var logginManager = require('../manager/loggin');

function worker(io) {
  
    /* ROUTES */
    router.get('/:logId', validate);
    /* ROUTES */

    function validate(req, res) {
        var logId = req.params.logId;
        logginManager.validate(logId, function (err, result) {
            if (result) {
                logginManager.activateAccount(logId,function(err, result){
                  if(result){
                    console.log("Modificado Correctamente");
                  }else{
                    console.log(err);
                  }
                });
                res.redirect("/#SignIn");
                logginManager.createToken();
            }

        });
    }
    return router;
}

module.exports = worker;