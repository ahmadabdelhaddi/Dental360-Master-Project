// import model
const Appointment = require("../models/userModel");
// import Mongoose
const mongoose = require("mongoose");

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
    // Find all users
    const users = await Appointment.find({});
    // Check if the selected date and time are already booked by any user
    const isBooked = users.some((user) => {
      return user.appointments.some((appointment) => {
        return (
          appointment.selectedDate === selectedDate &&
          appointment.selectedHour === selectedHour
        );
      });
    });

    if (isBooked) {
      return res.status(400).json({ error: "Appointment already booked" });
    }

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
    const userAppointment = await Appointment.findById(id);

    if (!userAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Push the new appointment to the user's appointments array
    userAppointment.appointments.push(appointment);

    // Save the updated user document
    await userAppointment.save();

    // Respond with a success message or any other appropriate response
    res.status(200).json({ message: "Appointments created successfully" });
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
//   const { appointmentId } = req.params;
//   const {
//     newStatus,
//     fullName,
//     service,
//     selectedDate,
//     selectedHour,
//     phoneNumber,
//   } = req.body;
//   console.log(newStatus);
//   console.log(fullName);
//   console.log(service);
//   console.log(selectedDate);
//   console.log(selectedHour);
//   console.log(phoneNumber);
//   try {
//     // Find the appointment by its ID
//     const appointment = await Appointment.findById({ _id: appointmentId });
//     console.log(appointment);
//     console.log(appointmentId);

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // Update the status of the appointment and other details if needed
//     appointment.status = newStatus;
//     appointment.fullName = fullName;
//     appointment.service = service;
//     appointment.selectedDate = selectedDate;
//     appointment.selectedHour = selectedHour;
//     appointment.phoneNumber = phoneNumber;

//     // Save the updated appointment to the database
//     await appointment.save();

//     res.status(200).json({ message: "Appointment updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Update appointment status
const updateStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body; // Assuming you'll send the new status in the request body

    // Find the user by appointmentId and update the status
    const appointment = await Appointment.findOneAndUpdate(
      { "appointments._id": appointmentId },
      { $set: { "appointments.$.status": status } },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Appointment status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateStatus };

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateStatus,
  getSingleAppointment,
};
