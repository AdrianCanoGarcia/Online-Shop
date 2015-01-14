var request = require('request');
          
function getApi(item, callback){
    request('http://open.api.ebay.com/shopping?version=713&'+'appid=Ikaruscfa-4fc4-4be7-a6b0-4e54505e4f8&'+'callname=FindItems&'+'QueryKeywords='+item+'&ResponseEncodingType=JSON&'+'MaxEntries=10', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
})   

}
module.exports = {
    getApi:getApi
};