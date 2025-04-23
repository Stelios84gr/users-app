const mongoose = require("mongoose");
const app = require('./app');
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)   // εκχωρούμε μεταβλητή που έχουμε ορίσει στο .env
  .then(
    () => {
      console.log("Connection to MongoDB established");
      
      // μεταφορά του παρακάτω block απ' το app.js γιατί χρειάζεται δημιουργία ξεχωριστού server για testing
      app.listen(port, ()=>{
        console.log("Server is up")
      })
    },
    err => { console.log('Failed to connect to MongoDB', err); }
  )