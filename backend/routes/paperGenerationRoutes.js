const express = require("express");
const router = express.Router();
const { generateQuestionPaper, getQuestionPaperById } = require("../controllers/paperGenerationController");

router.post("/generate-paper", generateQuestionPaper);
router.get("/question/:id", getQuestionPaperById);

module.exports = router;
