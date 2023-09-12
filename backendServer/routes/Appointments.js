const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateStatus,
} = require("../controllers/bookingsController");

// Create a new booking
router.post("/:id", createAppointment);

// get all Appointments
router.get("/", getAppointments);

//get single Appointment
router.get("/:id", getAppointment);

//update status
router.patch("/:id", updateStatus);

module.exports = router;
