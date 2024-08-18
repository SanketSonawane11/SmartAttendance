const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");
    }
    catch (err) {
        console.log("Connection to DB failed!");
    }
}

module.exports = connectDB;