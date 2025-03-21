const express = require("express");
const { getTeacherCount } = require("../controllers/teacherController");

const router = express.Router();

// Route to get teacher count
router.get("/count", getTeacherCount);

module.exports = router;
