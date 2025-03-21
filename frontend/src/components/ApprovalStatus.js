import React, { useEffect, useState } from "react";

const ApprovalStatus = () => {
  const [papers, setPapers] = useState([]);

  // Extract token from localStorage
  const token = localStorage.getItem("token");
  let teacherId = null;

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    teacherId = decodedToken.id;
  }

  useEffect(() => {
    if (!teacherId) return;

    fetch(`http://localhost:5000/api/submitted-question-papers/status/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPapers(data))
      .catch((err) => console.error("Error fetching approval status:", err));
  }, [teacherId, token]);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7fc", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>📜 Your Submitted Question Papers</h2>
      
      {papers.length > 0 ? (
        <div style={{ maxWidth: "900px", margin: "auto", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#007bff", color: "white" }}>
                <th style={headerStyle}>Subject</th>
                <th style={headerStyle}>Status</th>
                <th style={headerStyle}>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper._id} style={rowStyle}>
                  <td style={cellStyle}>{paper.subject}</td>
                  <td style={{ ...cellStyle, fontWeight: "bold", color: getStatusColor(paper.approved) }}>
                    {getStatusText(paper.approved)}
                  </td>
                  <td style={cellStyle}>{new Date(paper.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555", marginTop: "20px" }}>No question papers submitted yet.</p>
      )}
    </div>
  );
};

// **🔹 Styles for table elements**
const headerStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "16px",
};

const rowStyle = {
  borderBottom: "1px solid #ddd",
  backgroundColor: "#fff",
  transition: "all 0.3s ease-in-out",
};

const cellStyle = {
  padding: "12px",
  fontSize: "15px",
  color: "#333",
};

// **🔹 Status Colors & Text**
const getStatusColor = (status) => {
  switch (status) {
    case "approved": return "green";
    case "rejected": return "red";
    default: return "orange";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "approved": return "✅ Approved";
    case "rejected": return "❌ Rejected";
    default: return "⏳ Pending";
  }
};

export default ApprovalStatus;
