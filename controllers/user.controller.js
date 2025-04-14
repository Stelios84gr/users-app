const User = require('../models/user.model');
const userService = require('../services/user.services');
const bcrypt = require('bcrypt');

const logger = require('../logger/logger');

exports.findAll = async(req, res) => {
    console.log("Find all users from collection 'Users'.");

    try {
        // const result = await User.find();    // μεταφέρθηκε στο user.services.js
        const result = await userService.findAll();

        res.status(200).json({ status: true, data: result });   // status μέσα στο body του response: structured/enveloped json response, συμπληρωματικά με το HTTP response
        logger.info("Success in reading all users");
        // logger.warn("Success in reading all users");
        // logger.error("Message with error");
    } catch (err) {
        console.log("Problem in reading 'Users'.", err);
        logger.error("ERROR, Problem in reading all users", err);
        res.status(400).json({ status: false, data: err })
    }
}

exports.findOne = async(req, res) => {
    console.log('Find a user with a specific username.');
    const username = req.params.username;

    try {
        const result = await userService.findOne(username);
        // const result = await User.findOne({username: username}); // αν δεν υπάρχει ο user δεν θα περάσει στο catch, θα επιστραφεί json με άδειο data
        if (result) {
        res.status(200).json({ status: true, data: result })
    } else {
        res.status(404).json({ status: false, data: "User does not exist." })
    }
}   catch (err) {
        console.log('Problem in finding user.', err);
        res.status(400).json({ status: false, data: err })
    }
}

exports.create = async(req, res) => {
    console.log('Create user.')

    let data = req.body;
    const SaltOrRounds = 10;    // κύκλοι κρυπτογράφησης
    const hashedPassword = await bcrypt.hash(data.password, SaltOrRounds);

    const newUser = new User({
        username: data.username,
        password: hashedPassword,
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: {
            area: data.address.area,
            road: data.address.road
        }
    });

    try {
        const result = await newUser.save();    // αποθηκεύει στη MongoDB ως νέο document το newUser
        res.status(200).json({ status: true, data: result })
    } catch (err) {
        console.log('Problem in creating user.', err);
        res.status(400).json({ status: false, data: err });
    }
}

exports.update = async(req, res) => {
    const username = req.body.username;

    console.log("Update user with username ", username);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: {
            area: req.body.address.area,
            road: req.body.address.road
        }
    };

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true}) // μας επιστρέφει το document με τις αλλαγές
        res.status(200).json({status:true, data:result});
    } catch (err) {
        console.log("Problem in updating user.", err);
        res.status(400).json({status:false, data:err});
    }
}

//  http://localhost:3000/api/users/test

exports.deleteByUsername = async(req, res) => {
    const username = req.params.username;
    console.log("Delete user with username: ", username);

    try {
        const result = await User.findOneAndDelete({username: username});
        res.status(200).json({status:true, data:result});
    } catch (err) {
        console.log("Problem in deleting user.", err)
        res.status(400).json({status: false, data:err})
    }
}

//  http://localhost:3000/api/users/test/email/lakis@aueb.gr

exports.deleteByEmail = async(req, res) => {
    const email = req.params.email;
    console.log("Delete user with email: ", email);

    try {
        const result = await User.findOneAndDelete({email: email});
        res.status(200).json({status:true, data:result});
    } catch (err) {
        console.log("Problem in deleting user.", err)
        res.status(400).json({status: false, data:err})
    }
}