var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Usuario');
var cal = db.bind('Images');


function create(user, callback){
    col.insert(user, callback);
    
}
function setUser(name, update, callback){
    var query = {
        username: name
    };
    col.update(query,update,callback);
}
function delUser(userName,callback){
    this.remove({username:userName},callback);
}
function getUser(userName,callback){
    this.findOne({username:userName},callback);
}
function getTodo(callback){
    cal.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}

		cursor.toArray(callback);
	});
}

col.bind({
        getTodo: getTodo,
	create: create,
        setUser: setUser,
        delUser: delUser,
        getUser: getUser
});

module.exports = col;