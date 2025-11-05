import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

// ✅ 8 Clean Dashboards (only imports)
import AdminDashboard from "./Components/AdminDashbaord/AdminDashboard";

import ClientDashboard from "./Components/ClientDashbaord/ClientDashboard";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import ProjectManager from "./Components/ProjectManager/ProjectManager";
import SalesManager from "./Components/SalesManager/SalesManagerOverview";
import BookkeeperDashboard from "./Components/BookkeeperDashboard/BookkeeperDashboard";
import BookkeeperInvoice from "./Components/BookkeeperDashboard/BookkeeperInvoice";

import { BiLogIn } from "react-icons/bi";
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
                {/* ✅ 8 Dashboards */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route
                  path="/bookkeeper-dashboard"
                  element={<BookkeeperDashboard />}
                />

                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route
                  path="/project-manager-dashboard"
                  element={<ProjectManager />}
                />
                <Route
                  path="/sales-manager-dashboard"
                  element={<SalesManager />}
                />
                <Route
                  path="/subcontractor-dashboard"
                  element={<SubContractorDashboard />}
                />
                <Route
                  path="/bookkeeper-dashboard"
                  element={<BookkeeperDashboard />}
                />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />

                {/* ceo-dashboard routes */}
                <Route path="/ceo-dashboard" element={<CeoDashboard />} />
                <Route path="/settings" element={<CeoSettings />} />
                <Route path="/jobs-management" element={<CeoJobs />} />
                <Route path="/manage-users/list" element={<List />} />
                <Route
                  path="/manage-users/permissions"
                  element={<PermissionsMatrix />}
                />
                <Route path="/project-manager" element={<ProjectManager />} />
                <Route path="/rfis" element={<RequestForInformation />} />
                <Route path="/invoices" element={<BookkeeperInvoice />} />

                {/* owner-dashboard */}
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route
                  path="/subcontractor-dashboard"
                  element={<SubContractorDashboard />}
                />
                <Route path="/jobs-management" element={<JobDashboard />} />
                <Route path="/schedule-rfis" element={<ScheduleDashboard />} />
                <Route path="/to-do" element={<ToDo />} />
                <Route path="/owner/settings" element={<SettingOwer />} />
                <Route path="/jobs-management" element={<JobManagment />} />
                <Route
                  path="/manage-users/permissions"
                  element={<Permissions />}
                />
                <Route path="/manage-users/list" element={<ListOwer />} />

                <Route
                  path="/sales-manager-overview"
                  element={<SalesManagerOverview />}
                />
                <Route path="/lead-management" element={<LeadManagement />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/reports" element={<Reports />} />
                <Route
                  path="/bookkeeper-reports"
                  element={<BookKeeperReports />}
                />
                <Route path="/banking" element={<Banking />} />
                <Route path="/tax-gst" element={<TaxGst />} />
                <Route path="/selection" element={<Selection />} />
              </Routes>

              {/* Client Dashboard Content Start Here */}
              <Routes>
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route
                  path="/client-selections"
                  element={<ClientSelections />}
                />
                <Route path="/client-schedules" element={<ClientSchedule />} />
                <Route path="/client-payments" element={<ClientPayments />} />
              </Routes>
              {/* Client Dashboard Content End Here */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
