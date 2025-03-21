const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api", require("./routes/generateRoutes"));
app.use("/api/question", require("./routes/paperGenerationRoutes")); 
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/submitted-question-papers", require("./routes/submittedQuestionPaperRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
