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
            subject: "Welcome to Ikarus",
            html:"<h1>Ikarus ®</h1> <br> <h3>Welcome to Ikarus your account has been created sucesfully</h3> <p style='margin-left: 20px'>User name: <b>"
                    + user.username + "</b><br> Password: <b>" + user.passwd +"</b></p><br> <p>Click Here To Activate The Account: <br>"+
                    "http://localhost:9001/loggin/"+logId
                    
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