
var debug = require('debug')('Online-Shop');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();



app.use(favicon(__dirname + '/../cliente/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/../cliente')));

// Routes
var basePath = path.join(__dirname, '/routes/');

function addRoutes(basePath, prefix) {
  fs.readdirSync(basePath).forEach(function (filename) {
    if (fs.statSync(basePath + filename).isDirectory()) {
      addRoutes(basePath + '/' + filename + '/', (prefix ? prefix : '/') + filename + '/');
    } else {
      var basePathService = (prefix ? prefix : '/') + filename.replace(/\.js$/, '');
      var serviceDefinition = basePath + filename;
      app.use(basePathService, require(serviceDefinition));
    }
  });
}
addRoutes(basePath);

var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9001;

app.listen(port, ip, function () {
    debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;