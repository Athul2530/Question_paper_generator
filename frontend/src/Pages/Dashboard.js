import React, { useState, useEffect } from "react";
import AdminApproval from "../components/AdminApproval";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showApproval, setShowApproval] = useState(false);
  const navigate = useNavigate();

  const handleApprovalClick = () => {
    setShowApproval(!showApproval);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  // ✅ Prevent Back Navigation
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      if (showApproval) {
        setShowApproval(false); // ✅ Instead of going back, just hide approval
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [showApproval]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* ✅ Sidebar */}
      <div style={{ 
        width: "280px", 
        background: "#2C3E50", 
        padding: "20px", 
        color: "white", 
        position: "fixed", 
        height: "100vh",
        overflowY: "auto"
      }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center" }}>📘 Admin Dashboard</h2>

        <button 
          onClick={handleApprovalClick}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
            padding: "10px",
            borderRadius: "5px",
            background: "#27AE60",
            textAlign: "center",
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginTop: "20px"
          }}
        >
          {showApproval ? "🔙 Back" : "✅ Approval"}
        </button>
      </div>

      {/* ✅ Logout Button (OUTSIDE Sidebar) */}
      <button 
        onClick={handleLogout}
        style={{
          background: "#E74C3C",
          color: "white",
          fontSize: "16px",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          left: "calc(100% + 10px)",  /* ✅ Fully outside sidebar */
          zIndex: "10"
        }}
      >
        🚪 Logout
      </button>

      {/* ✅ Main Content Area */}
      <div style={{ flex: 1, marginLeft: "280px", height: "100vh", overflowY: "auto" }}>
        {/* ✅ Content Section */}
        <div style={{ padding: "40px", textAlign: "center", marginTop: "60px" }}>
          {showApproval ? (
            <AdminApproval />
          ) : (
            <div style={{ display: "flex", justifyContent: "center", gap: "50px", marginTop: "20px" }}>
              {/* ✅ Total Teachers Card */}
              <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "300px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <h2 style={{ fontSize: "50px", marginBottom: "10px" }}>👨‍🏫 2</h2>
                <p style={{ fontSize: "18px", color: "#666" }}>Total Teachers</p>
              </div>

              {/* ✅ Subjects Available Card */}
              <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "300px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <h2 style={{ fontSize: "50px", marginBottom: "10px" }}>📚 2</h2>
                <p style={{ fontSize: "18px", color: "#666" }}>Subjects Available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
