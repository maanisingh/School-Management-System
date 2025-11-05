import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";



// ✅ 8 Clean Dashboards (only imports)
import AdminDashboard from "./Components/AdminDashbaord/AdminDashboard";
import CeoDashboard from "./Components/CeoDashbaord/CeoDashaboard";
import ClientDashboard from "./Components/ClientDashbaord/ClientDashboard";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import ProjectManager from "./Components/ProjectManager/ProjectManager";
import SalesManager from "./Components/SalesManager/SalesManager"; 
import SubContractorDashboard from "./Components/SubConstractorDashboard/SubContractorDashboard";  
import BookkeeperDashboard from "./Components/BookkeeperDashboard/BookkeeperDashboard"
import BookkeeperInvoice from "./Components/BookkeeperDashboard/BookkeeperInvoice";


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
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
             

             
                {/* ✅ 8 Dashboards */}
                <Route
                  path="/admin-dashboard"
                  element={<AdminDashboard/>}
                />
                <Route
                  path="/bookkeeper-dashboard"
                  element={<BookkeeperDashboard/>}
                />
                <Route
                  path="/ceo-dashboard"
                  element={<CeoDashboard/>}
                />
                <Route
                  path="/client-dashboard"
                  element={<ClientDashboard/>}
                />
                <Route
                  path="/owner-dashboard"
                  element={<OwnerDashboard/>}
                />
                <Route
                  path="/project-manager-dashboard"
                  element={<ProjectManager/>}
                />
                <Route
                  path="/sales-manager-dashboard"
                  element={<SalesManager/>}
                />
                <Route
                  path="/subcontractor-dashboard"
                  element={<SubContractorDashboard/>}
                />
                <Route path="/bookkeeper-dashboard" element={<BookkeeperDashboard />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/invoices" element={<BookkeeperInvoice />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;