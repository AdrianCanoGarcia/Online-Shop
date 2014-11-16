var express = require('express');
var router = express.Router();
var userManager = require('../manager/user');


/* ROUTES */
router.post('/', create);
router.put('/:userId/set/:name/set/:password/', setUser);
router.get('/:userId', getUser);
router.get('/', getAll);
router.delete('/:userId', delUser);

router.param('userId', checkUserExists);


function create(req, res) {
    userManager.create(function (err, result) {
        res.json(result);
    });
}
function setUser(req, res) {
    var userId = req.params.userId;
    var name = req.params.name;
    var password = req.params.name;
    userManager.setUser(userId, name, password, function (err, newUser) {
        if (newUser === null) {
            next(new Error(new Error(userId + ' not exists')));
        } else {
            res.json(newUser);
        }
    });
}

function delUser(req, res) {
    var userId = req.params.userId;
    userManager.delUser(userId, function (err, result) {
        if (result === 0) {
            next(new Error(userId + ' not exists'));
        } else {
            res.send('User[' + userId + ' deleted');
        }
    });

}
function getUser(req, res, next) {
    var userId = req.params.userId;
    userManager.getUser(userId, function (err, user) {
        if (user) {
            res.json(user);
        } else {
            next(new Error(new Error(userId + ' not exists')));
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