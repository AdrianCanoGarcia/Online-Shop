var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Publications');



function create(post, callback){
    col.insert(post, callback);      
}
function getAll(callback){
    col.find({},function(err, cursor){
        if(err){
            return callback(err);
        }
        cursor.toArray(callback);
    });
}

col.bind({
    create: create,
    getAll: getAll
});

module.exports = col;