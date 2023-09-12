// import model
const Appointment = require("../models/bookingModel");

// import mongoose
const mongoose = require("mongoose");

//create new workout

const createAppointment = async (req, res) => {
  const { fullName, service, selectedDate, selectedHour, phoneNumber } =
    req.body;
  // Or
  // const newWorkout = req.body;

  //add doc to db
  try {
    // workout object
    // create new document from workout constent
    const appointment = await Appointment.create({
      fullName,
      service,
      selectedDate,
      selectedHour,
      phoneNumber,
    });
    //status 200 to say the request is success
    // json return the workout document ..
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAppointment,
};
