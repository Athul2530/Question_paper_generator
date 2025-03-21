const API_URL = "http://localhost:5000/api/auth"; // Backend API URL

// ✅ Register a new user
export const registerUser = async ( email, password, role) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  email, password, role }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Registration error:", error);
    return { success: false, error: "Network error" };
  }
};

// ✅ Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login Response:", data); // ✅ Log response to debug

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // ✅ Store correct role
    }

    return data;
  } catch (error) {
    console.error("❌ Login error:", error);
    return { success: false, error: "Network error" };
  }
};
