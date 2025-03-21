import React, { useState, useEffect } from "react";

const UploadedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMarks, setSelectedMarks] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);
  const [message, setMessage] = useState("");

  const [editedValues, setEditedValues] = useState({
    subject: "",
    module: "",
    marks: "",
    description: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setMessage("Error fetching questions.");
      }
    };

    fetchQuestions();
  }, []);

  const uniqueSubjects = [...new Set(questions.map((q) => q.subject))];
  const uniqueMarks = [...new Set(questions.map((q) => q.marks))];

  useEffect(() => {
    if (selectedSubject && selectedMarks) {
      const filtered = questions.filter(
        (q) => q.subject === selectedSubject && q.marks === parseInt(selectedMarks)
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions([]);
    }
  }, [selectedSubject, selectedMarks, questions]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete question");

      setQuestions((prev) => prev.filter((q) => q._id !== id));
      setMessage("✅ Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      setMessage("❌ Failed to delete question.");
    }
  };

  const handleEdit = (question) => {
    setEditQuestion(question);
    setEditedValues({
      subject: question.subject,
      module: question.module,
      marks: question.marks,
      description: question.description,
    });
  };

  const handleInputChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    if (!editQuestion) return;

    try {
      const response = await fetch(`http://localhost:5000/api/questions/${editQuestion._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedValues),
      });

      if (!response.ok) throw new Error("Failed to update question");

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === editQuestion._id ? { ...q, ...editedValues } : q
        )
      );

      setEditQuestion(null);
      setEditedValues({ subject: "", module: "", marks: "", description: "" });
      setMessage("✅ Question updated successfully!");
    } catch (error) {
      console.error("Error updating question:", error);
      setMessage("❌ Failed to update question.");
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", color: "#333" }}>📋 Uploaded Questions</h1>

      {message && <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>}

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#f5f5f5",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "3px 3px 8px #d1d1d1, -3px -3px 8px #ffffff",
          }}
        >
          <option value="">Select Subject</option>
          {uniqueSubjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedMarks}
          onChange={(e) => setSelectedMarks(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#f5f5f5",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "3px 3px 8px #d1d1d1, -3px -3px 8px #ffffff",
          }}
        >
          <option value="">Select Marks</option>
          {uniqueMarks.map((marks, index) => (
            <option key={index} value={marks}>
              {marks} Marks
            </option>
          ))}
        </select>
      </div>

      {selectedSubject && selectedMarks && filteredQuestions.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {filteredQuestions.map((q) => (
            <div
              key={q._id}
              style={{
                background: "#f5f5f5",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff",
                textAlign: "left",
                transition: "0.3s",
              }}
            >
              {editQuestion && editQuestion._id === q._id ? (
                <>
                  <input type="text" name="subject" value={editedValues.subject} onChange={handleInputChange} style={{ width: "100%", padding: "5px" }} />
                  <input type="text" name="module" value={editedValues.module} onChange={handleInputChange} style={{ width: "100%", padding: "5px", marginTop: "10px" }} />
                  <input type="number" name="marks" value={editedValues.marks} onChange={handleInputChange} style={{ width: "100%", padding: "5px", marginTop: "10px" }} />
                  <input type="text" name="description" value={editedValues.description} onChange={handleInputChange} style={{ width: "100%", padding: "5px", marginTop: "10px" }} />
                  <button onClick={handleSaveEdit} style={{ marginTop: "10px", background: "green", color: "white", padding: "8px", borderRadius: "6px" }}>Save</button>
                </>
              ) : (
                <>
                  <h3 style={{ color: "#888", fontWeight: "lighter" }}>{q.subject} - {q.module}</h3>
                  <p style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>{q.description}</p>
                  <p><strong>Marks:</strong> {q.marks}</p>
                  <button onClick={() => handleEdit(q)} style={{ marginRight: "10px", background: "#007bff", color: "white", padding: "8px", borderRadius: "6px" }}>Edit</button>
                  <button onClick={() => handleDelete(q._id)} style={{ background: "red", color: "white", padding: "8px", borderRadius: "6px" }}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Select a subject and marks to view questions.</p>
      )}
    </div>
  );
};

export default UploadedQuestions;
