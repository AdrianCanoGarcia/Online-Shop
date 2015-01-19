var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Publications');

function create(post, callback){
    col.insert(post, callback);
}

col.bind({
        create: create
});

module.exports = col;