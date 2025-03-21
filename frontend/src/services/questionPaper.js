const API_URL = "http://localhost:5000/api/generate-paper"; // Update if needed

export const generateQuestionPaper = async (subject, numTwoMark, numTenMark, totalMarks) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, numTwoMark, numTenMark, totalMarks }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate question paper");
    }

    return data;
  } catch (error) {
    console.error("Error fetching question paper:", error);
    throw error;
  }
};
