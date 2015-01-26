var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Users');

function validate(logId,callback){
    this.findOne({logId:logId},callback);
}
col.bind({
        validate:validate
});

module.exports = col;