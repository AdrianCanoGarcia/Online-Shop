var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Usuario');

function create(user, callback){
    this.insert(user, callback);
    
}
function setUser(userId, update, callback){
    var query = {
        _id: toObjectID(userId)
    };
    var sort =[ ['_id',1] ];
    
    col.findAndModify(query,sort,update,{new:true},callback);
}
function delUser(userName,callback){
    this.remove({name:userName},callback);
}
function getUser(userName,callback){
    this.findOne({name:userName},callback);
}

col.bind({
	create: create,
        setUser: setUser,
        delUser: delUser,
        getUser: getUser
});

module.exports = col;