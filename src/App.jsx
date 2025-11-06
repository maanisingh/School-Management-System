import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

// ✅ 8 Clean Dashboards (only imports)


import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import TeacherDashboard from "./Components/TeacherDashbaord/TeacherDashboard";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AdminAnalysis from "./Components/AdminDashboard/AdminAnalysis";
import AdminClasses from "./Components/AdminDashboard/AdminClasses";
import AdminLearners from "./Components/AdminDashboard/AdminLearners";
import AdminReports from "./Components/AdminDashboard/AdminReports";
import AdminSettings from "./Components/AdminDashboard/AdminSettings";
import AdminSubjects from "./Components/AdminDashboard/AdminSubjects";
import AdminTeachers from "./Components/AdminDashboard/AdminTeachers";
import TeacherReports from "./Components/TeacherDashbaord/TeacherReports";
import TeacherAnalysis from "./Components/TeacherDashbaord/TeacherAnalysis";
import TeacherMarkEntry from "./Components/TeacherDashbaord/TeacherMarkEntry";
import TeacherSubjects from "./Components/TeacherDashbaord/TeacherSubjects";
import TeacherLearners from "./Components/TeacherDashbaord/TeacherLearners";
import TeacherClasses from "./Components/TeacherDashbaord/TeacherClasses";
import TeacherSettings from "./Components/TeacherDashbaord/TeacherSettings";
import AdminMarkEntry from "./Components/AdminDashboard/AdminMarkEntry";
import StudentSettings from "./Components/StudentDashboard/StudentSettings";
import StudentReports from "./Components/StudentDashboard/StudentReports";
import StudentMyResults from "./Components/StudentDashboard/StudentMyResults";
import StudentMySubjects from "./Components/StudentDashboard/StudentMySubjects";


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
                {/* Admin Dashboard */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                <Route path="/admin-analysis" element={<AdminAnalysis />} />
                <Route path="/admin-classes" element={<AdminClasses />} />
                <Route path="/admin-learners" element={<AdminLearners />} />
                <Route path="/admin-mark-entry" element={<AdminMarkEntry/> }/>
                <Route path="/admin-reports" element={<AdminReports />} />
                <Route path="/admin-settings" element={<AdminSettings />} />
                <Route path="/admin-subjects" element={<AdminSubjects />} />
                <Route path="/admin-teachers" element={<AdminTeachers />} />

                {/* Admin Dashboard  end */}
                {/* teacher Dashboard */}
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

                <Route path="/teacher-settings" element={<TeacherSettings/>} />
                <Route path="/teacher-reports" element={<TeacherReports/>} />
                <Route path="/teacher-analysis" element={<TeacherAnalysis/>} />
                <Route path="/teacher-mark-entry" element={<TeacherMarkEntry/>} />
                <Route path="/teacher-subjects" element={<TeacherSubjects/>} />
                <Route path="/teacher-learners" element={<TeacherLearners/>} />
                <Route path="/teacher-classes" element={<TeacherClasses/>} />

                {/* teacher Dashboard   end*/}
                {/* student Dashboard */}
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/student-settings" element={<StudentSettings/>} />
                <Route path="/student-reports" element={<StudentReports/>} />
                <Route path="/student-my-results" element={<StudentMyResults/>} />
                <Route path="/student-my-subjects" element={<StudentMySubjects/>} />
       
                {/* student Dashboard   end */}

              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
