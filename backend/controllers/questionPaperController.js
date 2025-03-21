const Question = require("../models/Question");
const QuestionPaper = require("../models/QuestionPaper");

// Function to get random questions based on subject and marks
const getRandomQuestions = async (subject, numTwoMark, numTenMark) => {
  const twoMarkQuestions = await Question.aggregate([
    { $match: { subject: subject, marks: 2 } },
    { $sample: { size: numTwoMark } },
  ]);
  const tenMarkQuestions = await Question.aggregate([
    { $match: { subject: subject, marks: 10 } },
    { $sample: { size: numTenMark } },
  ]);

  return [...twoMarkQuestions, ...tenMarkQuestions];
};

// Controller to handle the generation of the question paper
const generateQuestionPaper = async (req, res) => {
  try {
    const { subject, numTwoMark, numTenMark, totalMarks } = req.body;

    // Validate input
    if (!subject || !numTwoMark || !numTenMark || !totalMarks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate random questions
    const questions = await getRandomQuestions(subject, numTwoMark, numTenMark);

    // Create a new question paper
    const questionPaper = new QuestionPaper({
      subject,
      numTwoMark,
      numTenMark,
      totalMarks,
      questions: questions.map(q => q._id), // Store only question IDs
    });

    // Save the generated question paper to the database
    await questionPaper.save();

    // Populate the questions field with full question data (questionText, marks, etc.)
    const populatedQuestionPaper = await QuestionPaper.findById(questionPaper._id)
      .populate("questions");

    // Respond with the generated question paper, including the full question details
    res.status(201).json({
      message: "Question paper generated successfully",
      questionPaper: populatedQuestionPaper,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating question paper", error: error.message });
  }
};

module.exports = {
  generateQuestionPaper,
};
