var express = require('express');
var router = express.Router();

var user={};

/* ROUTES */
router.post('/', createUser);
router.put('/:userId/set/:name', setUser);
router.get('/:userId', getUser);
router.delete('/:userId', delUser);

function createScore(req, res) {
	var score = {
		_id: String(numScores),
		home: 0,
		guest: 0
	};
	
	scores[score._id] = score;
	numScores++;
  
 res.json(score);
}; 
