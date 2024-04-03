const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login"); 

connect.then(()=>{
    console.log("Users Collection of Login Database connected Successfully");
}).catch(()=>{
    console.log("Database not connected");
})


// Creating a schema 
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Creating a model 
const LoginCollection = new mongoose.model("users", LoginSchema); // Make collection named users in login database
module.exports = LoginCollection;