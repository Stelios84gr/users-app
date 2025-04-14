const mongoose = require('mongoose');

const schema = mongoose.Schema;

let addressSchema = new schema({
    area: { type: String },
    road: { type: String }
}, {_id: false});    // Επειδή το address αποτελεί ξεχωριστό object το mongoose βάζει _id. Αν δεν θέλουμε, το δηλώνουμε.

let phoneSchema = new schema({
    type: { type: String },
    number: { type: String }
}, {_id: false});

let productsSchema = new schema({
    product: { type: String },
    cost: { type: Number },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})

let userSchema = new schema({
    username: {
        type: String,
        required: [true, "username is a required field"],  // η δεύτερη μεταβλητή είναι το μήνυμα που επιστρέφεται αν δεν δοθεί username
        max: 20,
        unique: true,   // results in creating index for said field
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is a required field"],
        max: 20,
    },
    name: {
        type: String,
        required: [true, "name is a required field"],
        max: 20
    },
    surname: {
        type: String,
        required: [true, "surname is a required field"],
        max: 20
    },
    email: {
        type: String,
        required: [true, "e-mail is a required field"],
        max: 40,
        unique: true,   // results in creating index for said field
        trim: true,
        lowercase: true
    },
    address: addressSchema,
    phone: { type: [phoneSchema], null: true},
    products: { type: [productsSchema], null: true },
    roles: { type: [String], null: true }
},
{
    collection: 'users',
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);