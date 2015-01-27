var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Users');

function validate(logId, callback) {
  this.findOne({logId: logId}, callback);
}

function activateAccount(logId, callback) {
  this.findAndModify(
    { "logId": logId },
    [['_id','asc']],
    { "$set": { "activate": 1 } },
    {new: true, upsert: true}, 
    function(err, doc){
        console.log('find and modified  ' + doc);
    }
  );
}

col.bind({
  validate: validate,
  activateAccount: activateAccount
});

module.exports = col;