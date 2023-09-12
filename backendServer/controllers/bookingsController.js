// import model
const Appointment = require("../models/bookingModel");

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
    return res.status(404).json({ error: " The Id is " });
  }

  //   #################
  const appointments = await Appointment.findById(id);
  res.status(200).json(appointments);

  if (!appointments) {
    res.status(404).json({ error: " This Workout Not Found" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
};
