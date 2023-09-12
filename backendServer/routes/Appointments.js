const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
} = require("../controllers/bookingsController");



// Create a new booking
router.post("/", createAppointment);

// get all Appointments
router.get("/", getAppointments);

//get single Appointment
router.get("/:id", getAppointment);

module.exports = router;
