const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router(); // ✅ Define the router before using it

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router; // ✅ Now `router` is properly defined and exported
