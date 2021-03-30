// Importing the required Dependencies 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//Importing routes
const authRoute = require('./lib/auth');
const hostRoute = require('./routes/host');
const attendeeRoute = require('./routes/attendee')

//Defining the port on which the application will operate
const port = 3000;

const app = express();

//Middleware to parse JSON payload
app.use(express.json());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("Database connected");
        //Listening to requests only if the connection is establshed with the Database 
        app.listen(port, () => console.log("Listening on port "+ port));       
    })
    .catch(err => console.log(err));//Logging the error if there is no establishment of connection


//Route Middlewares
app.use('/api/auth', authRoute);
app.use('/user/host', hostRoute);
app.use('/user/attendee', attendeeRoute);