const express = require('express');
const connectDB = require('./DB');
require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());



app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on http://${port}`);
})