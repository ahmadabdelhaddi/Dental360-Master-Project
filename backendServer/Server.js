//import express (npm i express)
const express = require("express");
// import Mongoose
const mongoose = require("mongoose");

//to make the app faster
const app = express();

// middlewear
// express.json() is a built in middleware function in Express, It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

// import dotenv
require("dotenv").config();

// import Routes
// const bookingRoutes = require("./routes/bookings");
const appointmentRoute = require("./routes/Appointments");
//Routes
app.use("/api/appointments", appointmentRoute);

// middlewear
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Connect to MongooseDB
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log("connected to db & listeining on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// ...
