var request = require('request');
            var appid = 'appid=Ikaruscfa-4fc4-4be7-a6b0-4e54505e4f8';
            var callname = 'callname=FindItems';
            var keryWords = 'QueryKeywords=';
            var response = 'ResponseEncodingType=JSON';
            var entries = 'MaxEntries=10';

function req(item){
    request('http://open.api.ebay.com/shopping?version=713&'+'appid=Ikaruscfa-4fc4-4be7-a6b0-4e54505e4f8&'+'QueryKeywords='+item+'&ResponseEncodingType=JSON&'+'MaxEntries=10', function (error, response, body) {
     if (!error && response.statusCode == 200) {
        return body;
     }
})   
}
module.exports = {
    req:req
};