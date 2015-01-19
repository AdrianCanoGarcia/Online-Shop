var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('Publications');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('../../node_modules/socket.io/index.js')(http);


function create(post, callback){
    col.insert(post, callback);
        io.emit('createPublishment',{ for: 'everyone' });
}

col.bind({
    create: create
});

module.exports = col;