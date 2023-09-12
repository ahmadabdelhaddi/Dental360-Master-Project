const express = require("express");
const router = express.Router();
const { loginUser, signupUser,getAllusers } = require("../controllers/userController");

//login
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/", getAllusers);

module.exports = router;
