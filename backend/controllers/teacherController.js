const User = require("../models/User");

// Get count of teachers
exports.getTeacherCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "teacher" }); // Count users with role "teacher"
    res.json({ count });
  } catch (error) {
    console.error("Error fetching teacher count:", error);
    res.status(500).json({ message: "Server error" });
  }
};
