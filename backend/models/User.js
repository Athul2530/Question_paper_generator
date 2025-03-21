const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Password stored as plain text
  role: { type: String, enum: ["admin", "teacher", "exam_staff", "HOD"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
