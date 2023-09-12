const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
} = require("../controllers/bookingsController");
// Create a new booking
router.post("/", createAppointment);
router.get("/", getAppointments);
// Add more routes for reading, updating, and deleting bookings here...

module.exports = router;
