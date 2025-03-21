const express = require("express");
const router = express.Router();
const { getUniqueSubjectCount } = require("../controllers/subjectController");

// Route to get unique subject count
router.get("/unique-count", getUniqueSubjectCount);

module.exports = router;
