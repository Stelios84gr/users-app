const User = require('../models/user.model');

function findAll() {    // εναλλακτικά: exports.findAll() χωρίς το module.exports στο τέλος
    const result = User.find();
    return result;
}

function findOne(username) {
    const result = User.findOne({username:username});
    return result;
}

async function findLastInsertedUser() {
    console.log("Find last inserted user.");

    try {
        const result = await User.find().sort({_id:-1}).limit(1); // sort από τον πιο πρόσφατο στον πιο παλιό, μόνο το πρώτο result
        // const result = User.findOne()sort.({_id:-1}) // η findOne επιστρέφει ένα document
        console.log("Success in finding last inserted user.", result[0].username);  // η find επιστρέφει array
        return result[0];
    } catch (err) {
        console.log("Problem in finding last inserted user.", err);
        return false;
    }
}

module.exports = { findAll, findOne, findLastInsertedUser };