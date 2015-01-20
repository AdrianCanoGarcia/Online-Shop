var daoProposal = require('../Dao/proposal');

function create(post, callback) {
    daoProposal.create(post, callback);
}
function getAll(callback){
  daoProposal.getAll(callback);
}

module.exports = {
    create: create,
    getAll: getAll
};