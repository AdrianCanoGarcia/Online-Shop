var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Users');



function create(user, callback) {
  col.insert(user, callback);
}
function setUser(name, update, callback) {
  var query = {
    username: name
  };
  col.update(query, update, callback);
}
function delUser(userName, callback) {
  this.remove({username: userName}, callback);
}
function getUser(userName, callback) {
  this.findOne({username: userName}, callback);
}
function createFavourite(username, id, callback) {
  this.findOne({username: username}, function (err, result) {
    if (result) {
      if (result.favourite) {
        col.findOne({"favourite": id}, {"username": username}, function (err,result) {
          if (result) {
            col.update({username: username}, {$pull: {"favourite": id }}, callback);
          }
          if(!result){
            col.update({"username": username}, {$push: {"favourite": id }}, callback);
          }
        });
      } else {
        col.update({"username": username}, {$set: {"favourite": [id]}}, callback);
      }
    }
  });
}
//db.Users.find({"favourite": { $elemMatch: { "idMessage":"54d9f7a0476551611117d0d9"}}},{username:"Adri"});
col.bind({
  create: create,
  setUser: setUser,
  delUser: delUser,
  getUser: getUser,
  createFavourite: createFavourite
});

module.exports = col;