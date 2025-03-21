import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF library for generating PDF

// Function to send POST request to generate the question paper
const generateQuestionPaper = async (subject, numTwoMark, numTenMark, totalMarks) => {
  try {
    const response = await fetch("http://localhost:5000/api/generate-paper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, numTwoMark, numTenMark, totalMarks }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate question paper");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const GenerateQuestionPaper = () => {
  const [subject, setSubject] = useState("");
  const [numTwoMark, setNumTwoMark] = useState("");
  const [numTenMark, setNumTenMark] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [questions, setQuestions] = useState([]); // Store generated questions
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is submitted

  const handleGenerate = async () => {
    if (!subject || numTwoMark <= 0 || numTenMark <= 0 || totalMarks <= 0) {
      alert("All fields must be greater than zero and subject must be selected.");
      return;
    }

    try {
      const data = await generateQuestionPaper(subject, numTwoMark, numTenMark, totalMarks);

      console.log("Received Data: ", data); // Log response to check

      // Ensure questions are present in the response
      if (data.questionPaper && data.questionPaper.questions && Array.isArray(data.questionPaper.questions)) {
        setQuestions(data.questionPaper.questions); // Update state with questions
      } else {
        setQuestions([]); // In case no questions are returned
      }

      alert(
        `Generating Question Paper:\nSubject: ${data.questionPaper.subject}\n2-Mark Questions: ${numTwoMark}\n10-Mark Questions: ${numTenMark}\nTotal Marks: ${totalMarks}`
      );

      // Set form as submitted and hide the form
      setFormSubmitted(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to generate and download the question paper as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title and Subject
    doc.setFontSize(20);
    doc.text(`${subject} - Question Paper`, 105, 20, null, null, 'center');
    doc.setFontSize(12);
    
    // 2-Mark Questions
    doc.text('2-MARK QUESTIONS', 20, 30);
    questions.filter(q => q.marks === 2).forEach((q, index) => {
      doc.text(`${index + 1}. ${q.description}`, 20, 40 + index * 10);
    });

    // 10-Mark Questions
    doc.text('10-MARK QUESTIONS', 20, 50 + questions.filter(q => q.marks === 2).length * 10);
    questions.filter(q => q.marks === 10).forEach((q, index) => {
      doc.text(`${index + 1}. ${q.description}`, 20, 60 + (index + questions.filter(q => q.marks === 2).length) * 10);
    });

    // Save PDF
    doc.save(`${subject}-Question-Paper.pdf`);
  };

  // Function to send question paper to the backend
  const submitQuestionPaperToBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/submitted-question-papers/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          teacherId: "67cebc7f1ac56dce0f24ab19", // Replace with the actual teacher ID
          numTwoMark,
          numTenMark,
          totalMarks,
          questions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit question paper");
      }

      const data = await response.json();
      alert("Question paper submitted successfully!");
    } catch (error) {
      alert("Error submitting question paper: " + error.message);
    }
  };

  const sendQuestionPaper = () => {
    submitQuestionPaperToBackend(); // Call the function to submit to the backend
    alert("Sending the question paper to the backend...");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📜 Generated Question Paper</h2>

      {!formSubmitted ? (
        // Form will be displayed only if the form is not submitted yet
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.select}>
              <option value="">Select Subject</option>
              <option value="Advanced Web">Advanced Web</option>
              <option value="Programming Using C#">Programming Using C#</option>
              <option value="Computer Network">Computer Network</option>
              <option value="NOSQL">NOSQL</option>
              <option value="IOT">IOT</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Number of 2-Mark Questions</label>
            <select value={numTwoMark} onChange={(e) => setNumTwoMark(parseInt(e.target.value, 10) || "")} style={styles.select}>
              <option value="">Select</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Number of 10-Mark Questions</label>
            <select value={numTenMark} onChange={(e) => setNumTenMark(parseInt(e.target.value, 10) || "")} style={styles.select}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Total Marks</label>
            <select value={totalMarks} onChange={(e) => setTotalMarks(parseInt(e.target.value, 10) || "")} style={styles.select}>
              <option value="">Select</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <button onClick={handleGenerate} style={styles.button}>Generate Paper</button>
        </div>
      ) : (
        // After form submission, display the generated questions
        <div style={styles.paperContainer}>
          {questions.length > 0 ? (
            <>
              <div style={styles.questionCard}>
                <h4 style={styles.subjectHeading}>{subject} - Question Paper</h4>
                <h5>2-MARK QUESTIONS</h5>
                <ul style={styles.questionList}>
                  {questions.filter(q => q.marks === 2).map((q, index) => (
                    <li key={index} style={styles.questionItem}>
                      {q.description}
                    </li>
                  ))}
                </ul>
                <h5>10-MARK QUESTIONS</h5>
                <ul style={styles.questionList}>
                  {questions.filter(q => q.marks === 10).map((q, index) => (
                    <li key={index} style={styles.questionItem}>
                      {q.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons moved outside the questionCard */}
              <div style={styles.buttons}>
                <button onClick={downloadPDF} style={styles.button}>Download PDF</button>
                <button onClick={sendQuestionPaper} style={styles.button}>Send</button>
              </div>
            </>
          ) : (
            <p>No questions generated yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    background: "linear-gradient(135deg, #ff7eb3, #ff758c)", // Vibrant gradient
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    boxShadow: "0 4px 10px rgba(255, 117, 140, 0.3)",
  },
  paperContainer: {
    marginTop: "30px",
    textAlign: "left",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  questionCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  subjectHeading: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  questionList: {
    listStyleType: "decimal",
    paddingLeft: "20px",
  },
  questionItem: {
    marginBottom: "10px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
};

export default GenerateQuestionPaper;
