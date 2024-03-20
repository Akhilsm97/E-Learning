import Admin from "./Components/Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import AdminLogin from "./Components/Credentials/Admin/AdminLogin";
import Student from "./Components/Students/Student";
import Register from "./Components/Students/Register";
import Login from "./Components/Students/Login";
import React, {useState} from 'react';
import MoreDetails from "./Components/HomePage/MoreDetails";
import Message from "./Components/Payment/Message";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <>
    
    <BrowserRouter>
          <Routes>
          <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
            <Route path="admin/" element={<AdminLogin />} />
            <Route path="register/" element={<Register />} />

            <Route path="admin_dash/" element={<Admin />} />
            <Route path="student_dash/:username" element={<Student />} />
            <Route path="more_details/:course_id/" element={<MoreDetails />} />
            <Route path='success/:username' element={<Message />} />
           

          </Routes>
        </BrowserRouter>
    
    </>
  );
}

export default App;
