var express = require('express');
var router = express.Router();

var users = {};
var numUser = 0;
/* ROUTES */
router.post('/', createUser);
router.put('/:userId/set/:name', setUser);
router.get('/:userId', getUser);
router.delete('/:userId', delUser);

function createUser(req, res) {
    var user = {
        _id: String(numUser),
        name: " "
    };
    user[user._id] = user;
    numUser++;

    res.json(user);
}
function setUser(req, res) {
    var user = {
        _id: String(numUser),
        name: req.params.name,
    };
    user[req.params._id] = user;
    numUser++;

    res.json(user);
}

function delUser(req, res) {
    delete users[req.params.userId];

    res.send('scored ' + req.params.userId + ' removed.');
}
function getUser(req, res) {
    res.json(req.User);
}