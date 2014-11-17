var daoUser = require('../Dao/user');

var num=1;
function create(callback){
    var user = {
        name : "",
        passwd:"",
        ide:num++
    }
    daoUser.create(user,callback);
    
}
function setUser(userId, name, password,callback){
    var update = {
		$set: {}
	};
    update.$set[name]=password;
    daoUser.setUser(scoreId,update,callback);
}
function delUser(userId, callback) {
	daoUser.delUser(userId, callback);
}

function getUser (userId,callback){
    daoUser.getUser(scoreId,callback);
}
module.exports = {
	create: create,
        setUser: setUser,
        delUser : delUser,
        getUser : getUser
};