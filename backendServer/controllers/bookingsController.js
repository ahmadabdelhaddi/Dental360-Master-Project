// import model
const Appointment = require("../models/userModel");
// import Mongoose
const mongoose = require("mongoose");

// get all Appointments
// const getAppointments = async (req, res) => {
//   // Find method to get all data and sort it from newest to oldest
//   const appointments = await Appointment.find({}).sort({ createdAt: -1 });

//   res.status(200).json(appointments);
// };

//create new Appointment

// const createAppointment = async (req, res) => {
//   const { fullName, service, selectedDate, selectedHour, phoneNumber, status } =
//     req.body;
//   // Or
//   // const newWorkout = req.body;

//   //add doc to db
//   try {
//     // workout object
//     // create new document from workout constent
//     const appointment = await Appointment.create({
//       fullName,
//       service,
//       selectedDate,
//       selectedHour,
//       phoneNumber,
//       status,
//     });
//     //status 200 to say the request is success
//     // json return the workout document ..
//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const createAppointment = async (req, res) => {
//   const { fullName, service, selectedDate, selectedHour, phoneNumber, status } =
//     req.body;

//   try {
//     // Create a new appointment
//     const appointment = {
//       fullName,
//       service,
//       selectedDate,
//       selectedHour,
//       phoneNumber,
//       status,
//     };

//     // Find the user by _id
//   const { id } = req.params;

//     // const userId = req.user._id; // Assuming you have user information in the request
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Push the new appointment to the user's appointments array
//     user.appointments.push(appointment);

//     // Save the updated user document
//     await user.save();

//     // Respond with the newly created appointment
//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// get all Appointments
const getAppointments = async (req, res) => {
  // Find method to get all appointments and sort them from newest to oldest
  const appointments = await Appointment.find({}, "-_id appointments").sort({
    createdAt: -1,
  });

  res.status(200).json(appointments);
};

const createAppointment = async (req, res) => {
  const { fullName, service, selectedDate, selectedHour, phoneNumber, status } =
    req.body;

  try {
    // Create a new appointment
    const appointment = {
      fullName,
      service,
      selectedDate,
      selectedHour,
      phoneNumber,
      status,
    };

    // Find the user by _id
    const { id } = req.params;

    // Find the user by ID
    const user = await Appointment.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Push the new appointment to the user's appointments array
    user.appointments.push(appointment);

    // Save the updated user document
    await user.save();

    // Respond with the newly created appointment
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a all Appointment of user

const getAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    const appointment = await Appointment.findById(id, "-_id appointments");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment.appointments); // Return only the appointments field
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getSingleAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  try {
    const appointment = await Appointment.findOne({ _id: id });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// const updateStatus = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Find the user by their ID and select the "appointments" field
//     const appointment = await Appointment.findById(id, "appointments");

//     if (!appointment) {
//       return res.status(404).json({ message: "appointment not found" });
//     }

//     const appointments = appointment.appointments || []; // Get the appointments or an empty array if none exist

//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateStatus = async (req, res) => {
//   const { id } = req.params;
//   const { newStatus } = req.body; // Get the new status from the request body

//   try {
//     // Find the user by their ID and select the "appointments" field
//     const user = await Appointment.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const appointments = user.appointments;

//     // Find the appointment to update
//     const appointmentToUpdate = appointments.find(
//       (appointment) => appointment._id.toString() === req.params.appointmentId
//     );

//     if (!appointmentToUpdate) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // Check if the new status is valid (accepted or declined)
//     if (newStatus !== "accepted" && newStatus !== "declined") {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     // Update the status of the appointment
//     appointmentToUpdate.status = newStatus;

//     // Save the updated user document
//     await user.save();

//     res
//       .status(200)
//       .json({ message: "Appointment status updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const updateStatus = async (req, res) => {
  const { userId, appointmentId } = req.params;
  const { newStatus } = req.body;

  try {
    // Find the user by their ID and select the "appointments" field
    const user = await Appointment.findById(userId, "appointments");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the appointment by its ID
    const appointment = user.appointments.find(
      (apt) => apt._id.toString() === appointmentId
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the status of the appointment
    appointment.status = newStatus;

    // Save the updated user object to the database
    await user.save();

    res
      .status(200)
      .json({ message: "Appointment status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateStatus,
  getSingleAppointment,
};
