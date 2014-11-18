var express = require('express');
var router = express.Router();
var userManager = require('../manager/user');


/* ROUTES */
router.post('/', create);
router.put('/:userId/set/:name/set/:password/', setUser);
router.get('/:userName', getUser);
router.delete('/:userName', delUser);



function create(req, res) {
    userManager.create(function (err, result) {
        res.json(result);
    });
}
function setUser(req, res) {
    var userId = req.params.userId;
    var name = req.params.name;
    var password = req.params.password;
    userManager.setUser(userId, name, password, function (err, newUser) {
        if (newUser === null) {
            next(new Error(new Error(userId + ' not exists')));
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
            res.send('User[' + userName + ' deleted');
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

/*function checkUserExists(req, res, next, userId) {
    if (users[userId]) {
        req.user = users[userId];
        next();
    } else {
        next(new Error(userId + ' not exists'));
    }
}*/

module.exports = router;