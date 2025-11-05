import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import { BiLogIn } from "react-icons/bi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import CeoDashboard from "./Components/CeoDashbaord/Dashboard/CeoDashboard";
import CeoSettings from "./Components/CeoDashbaord/Settings/CeoSettings";
import CeoJobs from "./Components/CeoDashbaord/Jobs/CeoJobs";
import List from "./Components/CeoDashbaord/ManageUser/List";
import PermissionsMatrix from "./Components/CeoDashbaord/ManageUser/Permission";

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



                {/* ceo-dashboard routes */}
                <Route path="/ceo-dashboard" element={<CeoDashboard />} />
                <Route path="/settings" element={<CeoSettings />} />
                <Route path="/jobs-management" element={<CeoJobs />} />
                <Route path="/manage-users/list" element={<List />} />
                <Route path="/manage-users/permissions" element={<PermissionsMatrix />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;