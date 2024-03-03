import Admin from "./Components/Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import AdminLogin from "./Components/Credentials/Admin/AdminLogin";





function App() {
  return (
    <>
    
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="admin/" element={<AdminLogin />} />

            <Route path="admin_dash/" element={<Admin />} />

           

          </Routes>
        </BrowserRouter>
    
    </>
  );
}

export default App;
