import React, { useEffect, useState } from "react";

const AdminApproval = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [questions, setQuestions] = useState([]);

  const fetchPapers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/submitted-question-papers/all");
      const data = await res.json();
      setPapers(data);
    } catch (err) {
      console.error("Error fetching submitted papers:", err);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/submitted-question-papers/${status}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to update status to ${status}`);
      }

      // ✅ Fetch updated papers after approval
      fetchPapers();

      alert(`Question paper ${status}`);
      closeQuestionPaperView();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Failed to update approval status.");
    }
  };

  const handleViewQuestions = (paper) => {
    setSelectedPaper(paper);
    setQuestions(paper.questions);
  };

  const closeQuestionPaperView = () => {
    setSelectedPaper(null);
    setQuestions([]);
  };

  const twoMarkQuestions = questions.filter((q) => q.marks === 2);
  const tenMarkQuestions = questions.filter((q) => q.marks === 10);

  return (
    <div style={{ padding: "20px" }}>
 

      {!selectedPaper && (
        <>
          {papers.length > 0 ? (
            <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px", textAlign: "left" }}>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper) => (
                  <tr key={paper._id}>
                    <td>{paper.subject}</td>
                    <td style={{ color: paper.approved === "approved" ? "green" : paper.approved === "rejected" ? "red" : "orange" }}>
                      {paper.approved === "approved" ? "✅ Approved" : paper.approved === "rejected" ? "❌ Rejected" : "⏳ Pending"}
                    </td>
                    <td>
                      <button onClick={() => handleViewQuestions(paper)}>View Questions 📋</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No question papers submitted.</p>
          )}
        </>
      )}

      {selectedPaper && (
        <div style={styles.paperDetails}>
          <h2 style={{ textAlign: "center" }}>{selectedPaper.subject}</h2>

          <h3>Two Marks Questions</h3>
          <ul>
            {twoMarkQuestions.length > 0 ? (
              twoMarkQuestions.map((q, index) => (
                <li key={index}>
                  <strong>{q.description || "No description"}</strong> ({q.marks} marks)
                </li>
              ))
            ) : (
              <p>No two-mark questions available.</p>
            )}
          </ul>

          <h3>Ten Marks Questions</h3>
          <ul>
            {tenMarkQuestions.length > 0 ? (
              tenMarkQuestions.map((q, index) => (
                <li key={index}>
                  <strong>{q.description || "No description"}</strong> ({q.marks} marks)
                </li>
              ))
            ) : (
              <p>No ten-mark questions available.</p>
            )}
          </ul>

          <div style={styles.buttonContainer}>
            <button onClick={() => handleApproval(selectedPaper._id, "approve")} style={styles.button}>
              Approve ✅
            </button>
            <button onClick={() => handleApproval(selectedPaper._id, "reject")} style={styles.rejectButton}>
              Reject ❌
            </button>
            <button onClick={closeQuestionPaperView} style={styles.closeButton}>
              Close View ✖️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  paperDetails: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between", 
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  rejectButton: {
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#FF4D4D",
    color: "white",
  },
  closeButton: {
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#808080",
    color: "white",
  },
};

export default AdminApproval;
