var daoProposal = require('../Dao/proposal');

function create(post, callback) {
    daoProposal.create(post, callback);
}
function getAll(callback){
  daoProposal.getAll(callback);
}
function getMyPublishment(username, callback){
  daoProposal.getMyPublishment(username, callback);
}
function deletePublishment(username, id, callback){
    daoProposal.deletePublishment(username, id, callback);
} 
module.exports = {
    deletePublishment: deletePublishment,
    getMyPublishment: getMyPublishment,
    create: create,
    getAll: getAll
}