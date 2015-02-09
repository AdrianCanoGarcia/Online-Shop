var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Users');



function create(user, callback){
    col.insert(user, callback);   
}
function setUser(name, update, callback){
    var query = {
        username: name
    };
    col.update(query, update, callback);
}
function delUser(userName, callback){
    this.remove({username:userName},callback);
}
function getUser(userName, callback){
    this.findOne({username:userName},callback);
}
function createFavourite(username, id, callback){
  this.findOne({username:username},function(err,result){
      if(result){
          if(result.favourite){
              col.update({username:username},{$push:{"favourite":id}});
          }
      }
  });
}

// db.Users.update({ "_id" : ObjectId("54d9004a1ac2371cacec61b2")},{$push: {"array":3}});

col.bind({
        create: create,
        setUser: setUser,
        delUser: delUser,
        getUser: getUser,
        createFavourite: createFavourite
});

module.exports = col;