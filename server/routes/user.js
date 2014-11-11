var express = require('express');
var router = express.Router();

var users = {};
var numUser = 0;

/* ROUTES */
router.post('/', createUser);
router.put('/:userId/set/:name', setUser);
router.get('/:userId', getUser);
router.get('/', getAll);
router.delete('/:userId', delUser);

router.param('userId', checkUserExists);


function createUser(req, res) {
    var user = {
        _id: String(numUser),
        name: " "
    };
    users[user._id] = user;
    numUser++;

    res.json(user);
}
function setUser(req, res) {
    var newUser = {
        name: req.params.name,
    };
    users[req.params._id] = user;
    numUser++;

    res.json(user);
}

function delUser(req, res) {
    delete users[req.params.userId];

    res.send('user ' + req.params.userId + ' removed.');
}
function getUser(req, res) {
    res.json(req.user);
}
function getAll(req, res) {
    res.json(users);
}

function checkUserExists (req, res, next, userId) {
	if (users[userId]) {
		req.user = users[userId];
		next();
	} else {
		next(new Error(userId + ' not exists'));
	}
}

module.exports = router;