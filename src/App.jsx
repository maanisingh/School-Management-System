import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

// ✅ 8 Clean Dashboards (only imports)
import ClientDashboard from "./Components/ClientDashbaord/ClientDashboard";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import ProjectManager from "./Components/ProjectManager/ProjectManager";
import BookkeeperInvoice from "./Components/BookkeeperDashboard/BookkeeperInvoice";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import CeoDashboard from "./Components/CeoDashbaord/Dashboard/CeoDashboard";
import CeoSettings from "./Components/CeoDashbaord/Settings/CeoSettings";
import CeoJobs from "./Components/CeoDashbaord/Jobs/CeoJobs";
import List from "./Components/CeoDashbaord/ManageUser/List";
import PermissionsMatrix from "./Components/CeoDashbaord/ManageUser/Permission";

import RequestForInformation from "./Components/ProjectManager/RequestForInformation.jsx";
import SubContractorDashboard from "./Components/SubConstractorDashboard/SubContractorDashboard";
import JobDashboard from "./Components/SubConstractorDashboard/JobDashboard";
import ScheduleDashboard from "./Components/SubConstractorDashboard/ScheduleDashboard";
import ToDo from "./Components/SubConstractorDashboard/ToDo";
import ClientSelections from "./Components/ClientDashbaord/ClientSelections";
import ClientSchedule from "./Components/ClientDashbaord/ClientSchedule";
import ClientPayments from "./Components/ClientDashbaord/ClientPayments";
import Activities from "./Components/SalesManager/Activities";
import LeadManagement from "./Components/SalesManager/LeadManagement";
import Proposals from "./Components/SalesManager/Proposals";
import Reports from "./Components/SalesManager/Reports";
import SalesManagerOverview from "./Components/SalesManager/SalesManagerOverview";
import BookKeeperReports from "./Components/BookkeeperDashboard/BookKeeperReports";
import Banking from "./Components/BookkeeperDashboard/Banking";
import TaxGst from "./Components/BookkeeperDashboard/TaxGst";
import Selection from "./Components/ProjectManager/Selection";
import SettingOwer from "./Components/OwnerDashboard/SettingOwer";
import JobManagment from "./Components/OwnerDashboard/JobManagment";
import ListOwer from "./Components/OwnerDashboard/ListOwer";
import Permissions from "./Components/OwnerDashboard/Permissions";

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
              className={`right-side-content ${
                isSidebarCollapsed ? "collapsed" : ""
              }`}
            >
              <Routes>
                {/* CEO Dashboard */}
                <Route path="/ceo-dashboard" element={<CeoDashboard />} />
        

                {/* Owner Dashboard */}
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        
        
               {/* Client Dashboard */}
                <Route path="/client-dashboard" element={<ClientDashboard />} />
              
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
