const express = require("express");
const router = express.Router();
const { createAppointment } = require("../controllers/bookingsController");
// Create a new booking
router.post("/", createAppointment);
// Add more routes for reading, updating, and deleting bookings here...

module.exports = router;
