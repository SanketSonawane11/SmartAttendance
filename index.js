const express = require('express');
const connectDB = require('./DB');
require('dotenv').config();
const employeeRoutes = require('./Routes/exployee')
const orgRoutes = require('./Routes/organisation')

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use('/api/v1', employeeRoutes);
app.use('/api/v1', orgRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
})