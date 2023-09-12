// import model
const Appointment = require("../models/bookingModel");
// import Mongoose
const mongoose = require("mongoose");

// get all Appointments
const getAppointments = async (req, res) => {
  // Find method to get all data and sort it from newest to oldest
  const appointments = await Appointment.find({}).sort({ createdAt: -1 });

  res.status(200).json(appointments);
};

//create new Appointment

const createAppointment = async (req, res) => {
  const { fullName, service, selectedDate, selectedHour, phoneNumber, status } =
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
      status,
    });
    //status 200 to say the request is success
    // json return the workout document ..
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a single Appointment
const getAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//update appointment
// const updateWorkout = async (req, res) => {
//   //get id
//   const { id } = req.params;

//   //check if valid or not
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "This is Not Valid Id" });
//   }

//   const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

//   // if workout not found
//   if (!workout) {
//     return res.status(404).json({ error: "No such Workout " });
//   }

//   //send data to mongoose
//   res.status(200).json(workout);
// };

// Update appointment status by ID
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,{ status },{ new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateStatus,
};
