const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  getAllusers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

//login
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/", getAllusers);
router.patch("/updateuserinfo/:id", updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;
