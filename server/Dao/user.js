var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Usuario');

function create(user, callback){
    this.insert({name:"Antonia",password:"empresas69"}, callback);
    
}
function setUSer(userId,update,callback){
    var query = {
        _id: toObjectId(userId)
    };
    var sort =[ ['_id',1] ];
    
    col.findAndModify(query,sort,update,{new:true},callback);
}
function delUser(userId,callback){
    this.removeById(scoreId,callback);
}
function getUser(userId,callback){
    this.findById(scoreId,callback);
}

col.bind({
	create: create,
        setUser: setUser,
        delUser: delUser,
        getUser: getUser
});

module.exports = col;