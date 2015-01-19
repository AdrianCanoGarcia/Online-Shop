var daoProposal = require('../Dao/proposal');

function create(post, callback) {
    daoProposal.create(post, callback);
}

module.exports = {
    create: create
    
};