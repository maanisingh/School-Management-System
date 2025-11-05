import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import { BiLogIn } from "react-icons/bi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Activities from "./Components/SalesManager/Activities";
import LeadManagement from "./Components/SalesManager/LeadManagement";
import Proposals from "./Components/SalesManager/Proposals";
import Reports from "./Components/SalesManager/Reports";
import SalesManagerOverview from "./Components/SalesManager/SalesManagerOverview";
import BookKeeperReports from "./Components/BookkeeperDashboard/BookKeeperReports";
import Banking from "./Components/BookkeeperDashboard/Banking";
import TaxGst from "./Components/BookkeeperDashboard/TaxGst";
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
              className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""
                }`}
            >
              <Routes>
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/sales-manager-overview" element={<SalesManagerOverview />} />
                <Route path="/lead-management" element={<LeadManagement />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/bookkeeper-reports" element={<BookKeeperReports />} />
                <Route path="/banking" element={<Banking />} />
                <Route path="/tax-gst" element={<TaxGst />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;