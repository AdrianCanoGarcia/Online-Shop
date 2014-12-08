var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Usuario');


function create(user, callback){
    this.insert(user, callback);
    
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

col.bind({
	create: create,
        setUser: setUser,
        delUser: delUser,
        getUser: getUser
});

module.exports = col;