const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Allows us to include environment variables in .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005

// Middlewares
app.use(cors());
app.use(express.json());    // Allows us to parse json for our Mongo DB

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})