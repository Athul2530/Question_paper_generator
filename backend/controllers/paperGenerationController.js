const QuestionPaper = require("../models/QuestionPaper");
const Question = require("../models/Question");

const generateQuestionPaper = async (req, res) => {
  try {
    const { subject, numTwoMark, numTenMark, totalMarks } = req.body;
    const questions = [];
    
    for (let i = 0; i < numTwoMark; i++) {
      const question = new Question({
        description: `2-mark question ${i + 1}`,
        marks: 2,
      });
      await question.save();
      questions.push(question._id);
    }
    
    for (let i = 0; i < numTenMark; i++) {
      const question = new Question({
        description: `10-mark question ${i + 1}`,
        marks: 10,
      });
      await question.save();
      questions.push(question._id);
    }

    const newQuestionPaper = new QuestionPaper({
      subject,
      numTwoMark,
      numTenMark,
      totalMarks,
      questions,
    });

    await newQuestionPaper.save();

    res.status(201).json({ questionPaper: newQuestionPaper });
  } catch (error) {
    console.error("Error generating paper:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getQuestionPaperById = async (req, res) => {
  try {
    const { id } = req.params;

    const questionPaper = await QuestionPaper.findById(id).populate("questions");

    if (!questionPaper) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    res.json({ questionPaper });
  } catch (error) {
    console.error("Error fetching question paper:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  generateQuestionPaper,
  getQuestionPaperById
};
