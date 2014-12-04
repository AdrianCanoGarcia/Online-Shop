var daoUser = require('../Dao/user');


function create(user, callback) {
  daoUser.create(user, callback);
}
function setUser(name,mail, callback) {
  var update = {
    $set:{email:mail}
  };
  daoUser.setUser(name, update, callback);
}
function delUser(userName, callback) {
  daoUser.delUser(userName, callback);
}
function getUser(userName, callback) {
  daoUser.getUser(userName, callback);
}
function verifyUser (user, callback){
  daoUser.getUser(user, callback);
  
}
module.exports = {
  create: create,
  setUser: setUser,
  delUser: delUser,
  getUser: getUser,
  verifyUser: verifyUser
};