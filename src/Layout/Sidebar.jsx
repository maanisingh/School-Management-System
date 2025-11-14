// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTachometerAlt,   // Dashboard
//   faChalkboardTeacher, // Classes
//   faUserGraduate,     // Learners
//   faBookOpen,         // Subjects
//   faPenNib,           // Mark Entry
//   faChartBar,         // Analysis
//   faCog,              // Settings
//   faUsers,            // Teachers / Users
//   faClipboardList,    // Reports
//   faFolderOpen,       // My Subjects
//   faFileAlt,          // My Results
//   faUserTag,          // Role generic
// } from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

// const Sidebar = ({ collapsed, setCollapsed, onMobileToggle }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userRole, setUserRole] = useState("client");
//   const [openSubmenu, setOpenSubmenu] = useState(null);

//   useEffect(() => {
//     const role = (localStorage.getItem("userRole") || "client").toLowerCase();
//     setUserRole(role);
//   }, []);

//   const isActive = (path) => location.pathname === path;

//   const handleNavigate = (path) => {
//     navigate(path);
//     setOpenSubmenu(null);
//     if (window.innerWidth <= 768 && onMobileToggle) {
//       onMobileToggle();
//     }
//     if (window.innerWidth <= 768) setCollapsed(true);
//   };

//   const toggleSubmenu = (menuName) => {
//     setOpenSubmenu(openSubmenu === menuName ? null : menuName);
//   };

// const allMenus = {
//   admin: [
//     { name: "Dashboard", icon: faTachometerAlt, path: "/admin-dashboard" },
//     { name: "Classes", icon: faChalkboardTeacher, path: "/admin-classes" },
//     { name: "Teachers", icon: faUsers, path: "/admin-teachers" },
//     // { name: "Learners", icon: faUserGraduate, path: "/admin-learners" },
//     { name: "Subjects", icon: faBookOpen, path: "/admin-subjects" },
//     // { name: "Mark Entry", icon: faPenNib, path: "/admin-mark-entry" },
//     { name: "Analysis", icon: faChartBar, path: "/admin-analysis" },
//     { name: "Settings", icon: faCog, path: "/admin-settings" },
//   ],
//   teacher: [
//     { name: "Dashboard", icon: faTachometerAlt, path: "/teacher-dashboard" },
//     // { name: "Classes", icon: faChalkboardTeacher, path: "/teacher-classes" },
//     // { name: "Learners", icon: faUserGraduate, path: "/teacher-learners" },
//     { name: "Subjects", icon: faBookOpen, path: "/teacher-subjects" },
//     // { name: "Mark Entry", icon: faPenNib, path: "/teacher-mark-entry" },
//     { name: "Analysis", icon: faChartBar, path: "/teacher-analysis" },
//     // { name: "Reports", icon: faClipboardList, path: "/teacher-reports" },
//     { name: "Settings", icon: faCog, path: "/teacher-settings" },
//   ],
//   student: [
//     { name: "Dashboard", icon: faTachometerAlt, path: "/student-dashboard" },
//     { name: "My Subjects", icon: faFolderOpen, path: "/student-my-subjects" },
//     { name: "My Results", icon: faFileAlt, path: "/student-my-results" },
//     { name: "Reports", icon: faClipboardList, path: "/student-reports" },
//     { name: "Settings", icon: faClipboardList, path: "/student-settings" },
//   ],
// };
//   const userMenus = allMenus[userRole] || allMenus["admin"];

//   return (
//     <div className={`sidebar-container ${collapsed ? "collapsed" : ""} ${window.innerWidth <= 768 && !collapsed ? "active" : ""}`}>
//       <div className="sidebar">
//         <ul className="menu-list">
//           {userMenus.map((menu, index) => (
//             <React.Fragment key={index}>
//               <li className="menu-item">
//                 <div
//                   className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
//                   onClick={() => {
//                     if (menu.hasDropdown) {
//                       toggleSubmenu(menu.name);
//                     } else {
//                       handleNavigate(menu.path);
//                     }
//                   }}
//                 >
//                   <FontAwesomeIcon
//                     icon={menu.icon}
//                     className={`menu-icon ${isActive(menu.path) ? "active-icon" : ""}`}
//                   />
//                   {!collapsed && <span className="menu-text">{menu.name}</span>}
//                   {menu.hasDropdown && !collapsed && (
//                     <FontAwesomeIcon
//                       icon={faChevronDown}
//                       className={`dropdown-arrow ${openSubmenu === menu.name ? "rotate" : ""}`}
//                     />
//                   )}
//                 </div>
//               </li>

//               {!collapsed &&
//                 menu.submenus &&
//                 openSubmenu === menu.name &&
//                 menu.submenus.map((sub, subIndex) => (
//                   <li key={`sub-${subIndex}`} className="menu-item submenu-item">
//                     <div
//                       className={`menu-link submenu-link ${isActive(sub.path) ? "active" : ""}`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleNavigate(sub.path);
//                       }}
//                     >
//                       <FontAwesomeIcon
//                         icon={sub.icon}
//                         className={`menu-icon ${isActive(sub.path) ? "active-icon" : ""}`}
//                       />
//                       <span className="menu-text">{sub.name}</span>
//                     </div>
//                   </li>
//                 ))}
//             </React.Fragment>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,   // Dashboard
  faBook,             // Subjects (changed to faBook for "Subject list")
  faChartLine,        // Analysis (more accurate than faChartBar)
  faUserGear,         // Settings (modern icon)
  faChalkboard,       // All Classes (admin)
  faUsers,            // Teachers (admin)
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed, onMobileToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("teacher"); // default role

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "teacher").toLowerCase();
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768 && onMobileToggle) {
      onMobileToggle();
    }
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  // ✅ Base menu for ALL users (teacher or admin)
  const baseMenu = [
    { name: "Dashboard", icon: faTachometerAlt, path: "/dashboard" },
    { name: "Subject list", icon: faBook, path: "/subjects" },
    { name: "Analysis", icon: faChartLine, path: "/analysis" },
    { name: "Settings", icon: faUserGear, path: "/settings" },
  ];

  // ✅ Admin-only extras
  const adminExtras = [
    // { name: "All Classes", icon: faChalkboard, path: "/admin/classes" },
    { name: "Teachers", icon: faUsers, path: "/admin/teachers" },
  ];

  // ✅ Final menu: base + (adminExtras if admin)
  // ✅ Final menu: base + (adminExtras inserted before Settings if admin)
  let menuItems = baseMenu;

  if (userRole === "admin") {
    // Find the index of "Settings"
    const settingsIndex = menuItems.findIndex(item => item.name === "Settings");

    // If Settings exists, insert adminExtras before it
    if (settingsIndex !== -1) {
      menuItems = [
        ...menuItems.slice(0, settingsIndex), // Everything before Settings
        ...adminExtras,                       // Admin items go here
        ...menuItems.slice(settingsIndex)     // Settings and everything after
      ];
    } else {
      // Fallback: append if Settings not found
      menuItems = [...menuItems, ...adminExtras];
    }
  }
  return (
    <div
      className={`sidebar-container ${collapsed ? "collapsed" : ""
        } ${window.innerWidth <= 768 && !collapsed ? "active" : ""}`}
    >
      <div className="sidebar">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <div
                className={`menu-link ${isActive(item.path) ? "active" : ""}`}
                onClick={() => handleNavigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`menu-icon ${isActive(item.path) ? "active-icon" : ""
                    }`}
                />
                {!collapsed && <span className="menu-text">{item.name}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;