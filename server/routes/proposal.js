var express = require('express');
var router = express.Router();
var proposalManager = require('../manager/proposal');
var userManager = require('../manager/user');
var url = require('url');

function worker(io) {

    /* ROUTES */
    router.post('/', create);
    router.get('/:token', getAll);
    router.get('/ownPublishment/:username', getMyPublishment);
    router.delete('/', deletePublishment);
    router.post('/favourite/:id/:token', createFavourite);

    /* ROUTES */
    function deletePublishment(req, res, next) {
        proposalManager.deletePublishment(req.body.name, req.body.id, function (err, result) {
            if (result) {
                res.json(result)
                io.sockets.emit('AdDeleted');
            } else {
                next(new Error(new Error('Unable to delete publishment')));
            }
        });
    }
    function getMyPublishment(req, res, next) {
        proposalManager.getMyPublishment(req.params.username, function (err, result) {
            if (result) {
                res.json(result);
            } else {
                next(new Error(new Error('Unable to get publishment')));
            }
        });
    }
    function create(req, res, next) {
        var post = {
            content: req.body.content,
            mail: req.body.mail,
            date: req.body.date,
            username: req.body.username,
            letters: req.body.letters
        }
        if(post.letters<=1000){
         proposalManager.create(post, function (err, result) {
            if (err) {
                return next(err);
            }
            res.json(result);
            io.sockets.emit('AdPublished', result);
        });
        
        }
        
    }
    function createFavourite(req, res, next) {
        var decode;
        userManager.decryptToken(req.params.token, function (result) {
            decode = result;
        });
        userManager.comprobateToken(decode, function (err, result) {

            if (result) {
                userManager.createFavourite(decode.userName, req.params.id, function (err, result) {
                    if (result) {
                        res.json(result);
                    } else {
                        next(new Error(new Error('Unable to connect')));
                    }
                })
            } else {
                next(new Error(new Error('Invalid token')));
            }
        });
    }
    function getAll(req, res, next) {
        var decode;
        userManager.decryptToken(req.params.token, function (result) {
            decode = result;
        });
        userManager.comprobateToken(decode, function (err, result) {
            if (result) {
                proposalManager.getAll(function (err, result) {
                    if (result) {
                        res.json(result);
                    } else {
                        next(new Error(new Error('Unable to connect')));
                    }
                });
            }
        });



    }
    return router;
}
module.exports = worker;