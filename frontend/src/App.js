import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import TeacherModule from "./Pages/TeacherModule";
import UploadQuestions from "./components/UploadQuestions";
import DefinePatterns from "./components/DefinePattern";
import GeneratePaper from "./components/GeneratePaper";
import Register  from "./Pages/register";
import ScrollToTop from "./components/ScrollToTop";
import AdminApproval from "./components/AdminApproval";
function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<Dashboard />}>
          <Route path="approval" element={<AdminApproval />} /> {/* ✅ Nested correctly */}
        </Route>

        {/* Teacher Module with Nested Routes */}
        <Route path="/teacher-module/*" element={<TeacherModule />}>
          <Route path="upload-questions" element={<UploadQuestions />} />
          <Route path="define-patterns" element={<DefinePatterns />} />
          <Route path="generate-paper" element={<GeneratePaper />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
