var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Publications');



function create(post, callback){
    col.insert(post, callback);      
}
function getAll(callback){
    col.find().sort({date: -1},function(err, cursor){
        if(err){
            return callback(err);
        }
        cursor.toArray(callback);
    });
}
function getMyPublishment(username, callback){
    col.find({username: username}).sort({date: -1},function(err, cursor){
        if(err){
            return callback(err);
        }
        cursor.toArray(callback);
    });
}
function deletePublishment(username, id, callback){
    id = toObjectID(id);
    console.log(id+" "+username);
    col.remove({username:username, _id:id },callback);
}

col.bind({
    deletePublishment: deletePublishment,
    create: create,
    getAll: getAll,
    getMyPublishment: getMyPublishment
});

module.exports = col;