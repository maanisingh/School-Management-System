import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import { BiLogIn } from "react-icons/bi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import SettingOwer from "./Components/OwnerDashboard/SettingOwer";
import JobManagment from "./Components/OwnerDashboard/JobManagment";
import Permissions from "./Components/OwnerDashboard/Permissions";
import ListOwer from "./Components/OwnerDashboard/ListOwer";
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
          <Route path="/" element={<Login />} />
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
              className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""
                }`}
            >
              <Routes>




                {/* owner-dashboard */}
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/owner/settings" element={<SettingOwer />} />
                <Route path="/jobs-management" element={<JobManagment />} />
                <Route path="/manage-users/permissions" element={<Permissions />} />
                <Route path="/manage-users/list" element={<ListOwer />} />

              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;