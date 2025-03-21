const express = require("express");
const router = express.Router();
const submittedPaperController = require("../controllers/submittedQuestionPaperController");

// Teacher submits question paper
router.post("/submit", submittedPaperController.submitQuestionPaper);

// Admin fetches all submitted question papers
router.get("/all", submittedPaperController.getAllSubmittedPapers);

// Admin approves a question paper
router.put("/approve/:paperId", submittedPaperController.approveQuestionPaper);

// Admin rejects a question paper (Use PUT instead of DELETE)
router.put("/reject/:paperId", submittedPaperController.rejectQuestionPaper);

// Teacher fetches their submitted question papers
router.get("/status/:teacherId", submittedPaperController.getTeacherSubmittedPapers);

module.exports = router;
