var request = require('request');

function getApi(item,numberPage, callback) {
  request('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=Ikaruscfa-4fc4-4be7-a6b0-4e54505e4f8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords='+item+'&paginationInput.entriesPerPage=10&paginationInput.pageNumber='+numberPage+'&sortOrder=CurrentPriceHighest', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  })
}
module.exports = {
  getApi: getApi
};
//PricePlusShippingLowest
//CurrentPriceHighest