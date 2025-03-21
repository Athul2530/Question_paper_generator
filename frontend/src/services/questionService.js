const uploadQuestion = async (questionData) => {
    try {
      const response = await fetch("http://localhost:5000/api/questions/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });
      
      const data = await response.json();
      console.log("✅ Question uploaded:", data);
    } catch (error) {
      console.error("❌ Error uploading question:", error);
    }
  };
  