import React, { useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import UploadQuestions from "../components/UploadQuestions";
import DefinePatterns from "../components/DefinePattern";
import GeneratePaper from "../components/GeneratePaper";
import UploadedQuestions from "../components/UploadedQuestions";
import ApprovalStatus from "../components/ApprovalStatus";

const TeacherModule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setLogoutMessage("✅ Logout successful! Redirecting...");

    setTimeout(() => {
      setLogoutMessage("");
      navigate("/"); // Redirect to login
    }, 2000);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      alignItems: "center",
      overflowX: "hidden",
    },
    sidebar: {
      width: "100%",
      background: "rgba(20, 20, 40, 0.9)",
      color: "white",
      padding: "15px 0",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backdropFilter: "blur(12px)",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
      borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
      zIndex: 1000,
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      color: "white",
      textDecoration: "none",
      padding: "12px 18px",
      borderRadius: "12px",
      transition: "all 0.3s ease-in-out",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.1)",
    },
    activeMenuItem: {
      background: "rgba(23, 162, 184, 0.8)",
      fontWeight: "bold",
      boxShadow: "0px 5px 20px rgba(23, 162, 184, 0.5)",
      transform: "scale(1.1)",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      backgroundColor: "#f4f7fc",
      marginTop: "80px",
      width: "100%",
      minHeight: "100vh",
      overflowY: "auto",
    },
    logoutButton: {
      background: "rgba(255, 69, 69, 0.8)",
      color: "white",
      padding: "10px 18px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <nav style={styles.sidebar}>
        <Link to="/teacher-module/upload-questions" style={{ ...styles.menuItem, ...(location.pathname.includes("upload-questions") ? styles.activeMenuItem : {}) }}>📥 Upload</Link>
        <Link to="/teacher-module/generate-paper" style={{ ...styles.menuItem, ...(location.pathname.includes("generate-paper") ? styles.activeMenuItem : {}) }}>📄 Generate</Link>
        <Link to="/teacher-module/uploaded-questions" style={{ ...styles.menuItem, ...(location.pathname.includes("uploaded-questions") ? styles.activeMenuItem : {}) }}>📋 Uploaded</Link>
        <Link to="/teacher-module/approval" style={{ ...styles.menuItem, ...(location.pathname.includes("approval") ? styles.activeMenuItem : {}) }}>✅ Approval</Link>
        <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* ✅ Logout Success Message */}
        {logoutMessage && <div style={styles.logoutMessage}>{logoutMessage}</div>}

        {/* Nested Routes */}
        <Routes>
          <Route index element={<Navigate to="upload-questions" />} /> {/* Default Redirect */}
          <Route path="upload-questions" element={<UploadQuestions />} />
          <Route path="define-patterns" element={<DefinePatterns />} />
          <Route path="generate-paper" element={<GeneratePaper />} />
          <Route path="uploaded-questions" element={<UploadedQuestions />} />
          <Route path="approval" element={<ApprovalStatus />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherModule;
