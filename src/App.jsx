import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import { BiLogIn } from "react-icons/bi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ProjectManager from "./Components/ProjectManager/ProjectManager";
import RequestForInformation from"./Components/ProjectManager/RequestForInformation.jsx"
function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => window.innerWidth <= 768;
    if (checkIfMobile()) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {hideLayout ? (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      ) : (
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Sidebar
              collapsed={isSidebarCollapsed}
              setCollapsed={setIsSidebarCollapsed}
            />
            <div
              className={`right-side-content ${
                isSidebarCollapsed ? "collapsed" : ""
              }`}
            >
              <Routes>
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/project-manager" element={<ProjectManager />} />
                <Route path="/rfis" element={<RequestForInformation />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;