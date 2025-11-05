import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import { BiLogIn } from "react-icons/bi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import SubContractorDashboard from "./Components/SubConstractorDashboard/SubContractorDashboard";
import JobDashboard from "./Components/SubConstractorDashboard/JobDashboard";
import ScheduleDashboard from "./Components/SubConstractorDashboard/ScheduleDashboard";
import ToDo from "./Components/SubConstractorDashboard/ToDo";
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
                <Route path="/subcontractor-dashboard" element={<SubContractorDashboard />} />
                <Route path="/jobs-management" element={<JobDashboard />} />
                <Route path="/schedule-rfis" element={<ScheduleDashboard />} />
                <Route path="/to-do" element={<ToDo />} />

              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;