const mongoose = require("mongoose");

const questionPaperSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  numTwoMark: { type: Number, required: true },
  numTenMark: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // ✅ Store question IDs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);
