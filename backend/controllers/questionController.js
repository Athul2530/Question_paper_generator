const Question = require("../models/Question");

// ✅ Upload a new question
const uploadQuestion = async (req, res) => {
  try {
    const { subject, module, marks, description } = req.body;

    if (!subject || !module || !marks || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Question({ subject, module, marks, description });
    await newQuestion.save();

    res.status(201).json({ message: "Question uploaded successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Fetch uploaded questions with optional filtering
const getQuestions = async (req, res) => {
  try {
    const { subject, marks } = req.query;
    let filter = {};

    if (subject) filter.subject = subject;
    if (marks) filter.marks = marks;

    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, module, marks, description } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { subject, module, marks, description },
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question updated successfully", updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { uploadQuestion, getQuestions, deleteQuestion, updateQuestion };
