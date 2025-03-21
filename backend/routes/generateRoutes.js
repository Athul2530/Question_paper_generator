const express = require("express");
const router = express.Router();
const { generateQuestionPaper } = require("../controllers/questionPaperController");

// Route to generate question paper
router.post("/generate-paper", generateQuestionPaper);

module.exports = router;
