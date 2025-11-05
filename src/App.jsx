import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import OwnerDashboard from "./Components/OwnerDashboard/OwerDashboard";
import { BiLogIn } from "react-icons/bi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ClientDashboard from "./Components/ClientDashbaord/ClientDashboard";
import ClientSelections from "./Components/ClientDashbaord/ClientSelections";
import ClientSchedule from "./Components/ClientDashbaord/ClientSchedule";
import ClientPayments from "./Components/ClientDashbaord/ClientPayments";
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
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              </Routes>

              {/* Client Dashboard Content Start Here */}
              <Routes>
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route
                  path="/client-selections"
                  element={<ClientSelections />}
                />
                <Route
                  path="/client-schedules"
                  element={<ClientSchedule />}
                />
                <Route
                  path="/client-payments"
                  element={<ClientPayments />}
                />
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
