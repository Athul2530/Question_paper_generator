const Question = require("../models/Question");

// Get count of unique subjects from the Question collection
exports.getUniqueSubjectCount = async (req, res) => {
  try {
    const uniqueSubjects = await Question.distinct("subject"); // Get unique subjects
    const count = uniqueSubjects.length; // Count them
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching unique subject count:", error);
    res.status(500).json({ error: "Error fetching unique subject count" });
  }
};
