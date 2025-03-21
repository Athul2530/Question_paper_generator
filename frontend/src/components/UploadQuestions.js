import React, { useState } from 'react';
import '../styles/UploadQuestions.css'; // Import external CSS

const UploadQuestions = () => {
  const [subject, setSubject] = useState('');
  const [module, setModule] = useState('');
  const [marks, setMarks] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');

  const handleUpload = async () => {
    if (!subject || !module || !marks || !questionDescription) {
      alert("⚠️ Please fill all fields before uploading.");
      return;
    }

    const questionData = { subject, module, marks, description: questionDescription };

    try {
      const response = await fetch("http://localhost:5000/api/questions/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

      alert("✅ Question uploaded successfully!");
      setSubject('');
      setModule('');
      setMarks('');
      setQuestionDescription('');
    } catch (error) {
      console.error("❌ Error uploading question:", error);
      alert("Failed to upload question. Check console for details.");
    }
  };

  return (
    <div
    className="upload-container"
    
  >
  
      <div className="upload-card">
        <h1>📥 Upload Questions</h1>

        <div className="form-group">
          <label>📚 Subject</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            <option value="Advanced Web">Advanced Web</option>
            <option value="Programming Using C#">Programming Using C#</option>
            <option value="Computer Network">Computer Network</option>
            <option value="NOSQL">NOSQL</option>
            <option value="IOT">IOT</option>
          </select>
        </div>

        <div className="form-group">
          <label>📑 Module</label>
          <select value={module} onChange={(e) => setModule(e.target.value)}>
            <option value="">Select Module</option>
            <option value="Module 1">Module 1</option>
            <option value="Module 2">Module 2</option>
            <option value="Module 3">Module 3</option>
            <option value="Module 4">Module 4</option>
            <option value="Module 5">Module 5</option>
          </select>
        </div>

        <div className="form-group">
          <label>🎯 Marks</label>
          <select value={marks} onChange={(e) => setMarks(e.target.value)}>
            <option value="">Select Marks</option>
            <option value="2">2 Marks</option>
            <option value="10">10 Marks</option>
          </select>
        </div>

        <div className="form-group">
          <label>✏️ Question Description</label>
          <textarea
            placeholder="Enter question description..."
            value={questionDescription}
            onChange={(e) => setQuestionDescription(e.target.value)}
          />
        </div>

        <button className="upload-btn" onClick={handleUpload}>🚀 Upload</button>
      </div>
    </div>
  );
};

export default UploadQuestions;
