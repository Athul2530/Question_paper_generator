const express = require("express");
const {
  uploadQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");

const router = express.Router();

// ✅ Upload a question
router.post("/upload", uploadQuestion);

// ✅ Fetch questions (supports filtering by subject and marks)
router.get("/", getQuestions);

// ✅ Delete a question by ID
router.delete("/:id", deleteQuestion);

// ✅ Update a question by ID
router.put("/:id", updateQuestion);

module.exports = router;
