var daoUser = require('../Dao/user');


function create(callback){
    var user = {
        name : "",
        passwd:""
    }
    daoUser.create(user,callback);
}
function setUSer(userId, name, password,callback){
    var update = {
		$set: {}
	};
    update.$set[name]=password;
    daoUser.setUser(scoreId,update,callback);
}
function delUser(userId, callback) {
	daoScore.delUser(userId, callback);
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