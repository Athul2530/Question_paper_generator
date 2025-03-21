const mongoose = require("mongoose");

const submittedQuestionPaperSchema = new mongoose.Schema({
teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  numTwoMark: { type: Number, required: true },
  numTenMark: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // ✅ Store question IDs
  approved: { type: String, default: "pending" }, // ✅ Track admin approval
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SubmittedQuestionPaper", submittedQuestionPaperSchema);
