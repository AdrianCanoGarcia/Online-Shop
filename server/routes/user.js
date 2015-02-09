var express = require('express');
var router = express.Router();
var userManager = require('../manager/user');


function worker(io) {

    /* ROUTES */
    router.post('/', create);
    router.post('/token/:token', verifyToken);
    router.post('/file/:file', uploadFile);
    router.put('/', setUser);
    router.get('/:userName', getUser);
    router.get('/verify/:userName/:password', verifyUser);
    router.get('/loggin/:loged', show);
    router.delete('/:token', delUser);
    /* ROUTES */

    function show(req, res) {
        res.json(req.url.loged);
        console.log(req.params.loged);
    }
    function uploadFile(req, res) {
        var file = req.params.file;
        console.log(file[0])
    }
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 50; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    function create(req, res) {
        var logId = makeid();
        var user = {
            username: req.body.username,
            passwd: req.body.passwd,
            email: req.body.email,
            logId: logId,
            activate: 0
        }
        userManager.create(user, function (err, result) {
            if (result) {
                res.json(result);
                userManager.sendMail(user, logId);
            } else {
                res.json(err);
            }
        });
    }
    function verifyUser(req, res, next) {
        var user = {
            userName: req.params.userName,
            passwd: req.params.password
        }
        userManager.verifyUser(user.userName, function (err, result) {
            if (result) {
                if (result.passwd == user.passwd && result.activate == 1) {
                    var token = userManager.createToken(user);
                    res.json(token);
                } else {
                    next(new Error(new Error(req.params + ' not exists')));
                }
            } else {
                next(new Error(new Error(req.params + ' not exists')));
            }
        });
    }
    function setUser(req, res) {
        var name = req.body.username;
        var mail = req.body.email;

        userManager.setUser(name, mail, function (err, newUser) {
            if (newUser === null) {
                new Error(new Error(name + ' not exists'));
            } else {
                res.json(newUser);
            }
        });
    }
    function delUser(req, res, next) {
        token = userManager.decryptToken(req.params.token);
        var username = token.userName;
        userManager.delUser(username, function (err, result) {
            if (result === 0) {
                next(new Error(username + ' not exists'));
            } else {
                res.json(result);
            }
        });
    }
    function getUser(req, res, next) {
        var userName = req.params.userName;
        userManager.getUser(userName, function (err, user) {
            if (user) {
                res.json(user);
            } else {
                next(new Error(userName + ' not exists'));
            }
        });
    }
    function verifyToken(req, res, next) {
        /*userManager.comprobateToken(req.params.token, res);*/
        var that = this;
        var decode;
        userManager.decryptToken(req.params.token, function (result) {
            decode = result;
        });
         
        userManager.comprobateToken(decode, function (err, result) {
           if (result) {
                if (result.passwd == decode.passwd) {
                    var user = {
                        name: result.username,
                        email: result.email
                    }
                    res.json(user);
                } else {
                    console.log("token result not matched with bbdd: " + err);
                }
            }
        });

    }
    return router;
}

module.exports = worker;