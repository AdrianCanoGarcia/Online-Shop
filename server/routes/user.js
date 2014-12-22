var express = require('express');
var router = express.Router();
var userManager = require('../manager/user');

/* ROUTES */
router.post('/', create);
router.put('/', setUser);
router.get('/:userName', getUser);
router.delete('/:userName', delUser);
router.get('/verify/:userName/:password', verifyUser);
/* ROUTES */

function create(req, res) {
    var user = {
        username: req.body.username,
        passwd: req.body.passwd,
        email: req.body.email
    }
    userManager.create(user, function (err, result) {
        res.json(result);
        userManager.sendMail(user);
    });
}
function verifyUser(req, res, next) {
    var user ={
        userName: req.params.userName,
        passwd: req.params.password
    }
    userManager.verifyUser(user.userName, function (err, result) {
        if (result) {
            if(result.passwd==user.passwd){
                res.json(result);
            }else{
                next(new Error(new Error(req.params+ ' not exists')));
            }
        } else {
            next(new Error(new Error(req.params+ ' not exists')));
        }
    });
}
function setUser(req, res) {
    var name = req.body.username;
    var mail = req.body.email;
    
    userManager.setUser(name,mail, function (err, newUser) {
        if (newUser === null) {
            new Error(new Error(name + ' not exists'));
        } else {
            res.json(newUser);
        }
    });
}
function delUser(req, res, next) {
    var userName = req.params.userName;
    userManager.delUser(userName, function (err, result) {
        if (result === 0) {
            next(new Error(userName + ' not exists'));
        } else {
            //res.send('User[' + userName + ' deleted');
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
            next(new Error(new Error(userName + ' not exists')));
        }
    });
}

function checkUserExists(req, res, next, userId) {
    if (users[userId]) {
        req.user = users[userId];
        next();
    } else {
        next(new Error(userId + ' not exists'));
    }
}

module.exports = router;