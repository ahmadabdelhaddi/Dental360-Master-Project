const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateStatus,
  getSingleAppointment,
} = require("../controllers/bookingsController");

// Create a new Appointment
router.post("/:id", createAppointment);

// get all Appointments
router.get("/", getAppointments);

//get all Appointment of  user
router.get("/user/:id", getAppointment);

//get all signle  Appointment
router.get("/appointment/:id", getSingleAppointment);

//update status
// router.patch("/:id", updateStatus);
router.patch("/updateStatus/:userId/:appointmentId", updateStatus);
module.exports = router;
