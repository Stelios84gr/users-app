const User = require('../models/user.model');

function findAll() {    // εναλλακτικά: exports.findAll() χωρίς το module.exports στο τέλος
    const result = User.find();
    return result;
}

function findOne(username) {
    const result = User.findOne({username:username});
    return result;
}

module.exports = { findAll, findOne };