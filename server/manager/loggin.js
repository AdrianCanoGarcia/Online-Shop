var daoLoggins = require('../Dao/loggins');
var mandrill = require('node-mandrill')('Rdsh06EthIf4eJZQOAu0og');

function validate(logId, callback) {
    daoLoggins.validate(logId, callback);
}
function activateAccount(logId, callback){
    daoLoggins.activateAccount(logId, callback);
}

module.exports = {
    validate:validate,
    activateAccount:activateAccount
};