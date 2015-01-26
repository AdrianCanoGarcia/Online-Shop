var daoUser = require('../Dao/user');
var mandrill = require('node-mandrill')('Rdsh06EthIf4eJZQOAu0og');

function create(user, callback) {
    daoUser.create(user, callback);
}
function setUser(name, mail, callback) {
    var update = {
        $set: {email: mail}
    };
    daoUser.setUser(name, update, callback);
}
function delUser(userName, callback) {
    daoUser.delUser(userName, callback);
}
function getUser(userName, callback) {
    daoUser.getUser(userName, callback);
}
function verifyUser(user, callback) {
    daoUser.getUser(user, callback);
}
function sendMail(user,logId) {
    
    mandrill('/messages/send', {
        message: {
            to: [{email: user.email}],
            from_email: 'Admin@ikarus.com',
            subject: "Wellcome to Ikarus",
            text: "Wellcome to Ikarus your account has been created sucesfully \n User name: "
                    + user.username + "\n Password: " + user.passwd +"\n ClICK HERE TO ACTIVATE THE ACCOUNT: \n"+
                    'localhost:9001/loggin/'+logId
                    
        }
    }, function (error, response){
       if (error)
            console.log(JSON.stringify(error));
       
    else
            console.log(response);
    });
}

module.exports = {
    sendMail:sendMail,
    create: create,
    setUser: setUser,
    delUser: delUser,
    getUser: getUser,
    verifyUser: verifyUser,
    
};