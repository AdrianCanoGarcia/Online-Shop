var daoLoggins = require('../Dao/loggins');
var mandrill = require('node-mandrill')('Rdsh06EthIf4eJZQOAu0og');

function validate(logId, callback) {
    daoLoggins.validate(logId, callback);
}

module.exports = {
    validate:validate
};