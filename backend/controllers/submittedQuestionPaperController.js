const SubmittedQuestionPaper = require("../models/SubmittedQuestionPaper");

// 📌 Teacher submits a question paper
const submitQuestionPaper = async (req, res) => {
    try {
      const { subject, teacherId, numTwoMark, numTenMark, totalMarks, questions } = req.body;
  
      // Validate input fields
      if (!subject || !teacherId || numTwoMark == null || numTenMark == null || totalMarks == null) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newPaper = new SubmittedQuestionPaper({
        subject,
        teacherId,
        numTwoMark,
        numTenMark,
        totalMarks,
        questions: questions || [], // Ensure an empty array if no questions provided
        approved: "pending" // Default status when submitted
      });
  
      await newPaper.save();
      res.status(201).json({ message: "Question paper submitted successfully", newPaper });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// 📌 Admin fetches all submitted question papers
const getAllSubmittedPapers = async (req, res) => {
  try {
    const papers = await SubmittedQuestionPaper.find()
      .populate("teacherId", "email")
      .populate("questions", "description marks"); // Populating questions

    res.status(200).json(papers);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 📌 Admin approves a question paper
const approveQuestionPaper = async (req, res) => {
  const { paperId } = req.params;

  try {
    const updatedPaper = await SubmittedQuestionPaper.findByIdAndUpdate(
      paperId,
      { approved: "approved" },
      { new: true }
    );

    if (!updatedPaper) return res.status(404).json({ message: "Paper not found" });

    res.status(200).json({ message: "Question paper approved successfully", updatedPaper });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 📌 Admin rejects a question paper
const rejectQuestionPaper = async (req, res) => {
  const { paperId } = req.params;

  try {
    const updatedPaper = await SubmittedQuestionPaper.findByIdAndUpdate(
      paperId,
      { approved: "rejected" },
      { new: true }
    );

    if (!updatedPaper) return res.status(404).json({ message: "Paper not found" });

    res.status(200).json({ message: "Question paper rejected successfully", updatedPaper });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 📌 Teacher fetches their submitted question papers
const getTeacherSubmittedPapers = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const papers = await SubmittedQuestionPaper.find({ teacherId })
      .select("subject approved createdAt");

    res.status(200).json(papers);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  submitQuestionPaper,
  getAllSubmittedPapers,
  approveQuestionPaper,
  rejectQuestionPaper,
  getTeacherSubmittedPapers,
};