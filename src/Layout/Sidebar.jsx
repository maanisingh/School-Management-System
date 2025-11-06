import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserTag,
  faUserTie,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed, onMobileToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("client");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "client").toLowerCase();
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setOpenSubmenu(null);
    if (window.innerWidth <= 768 && onMobileToggle) {
      onMobileToggle();
    }
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const allMenus = {
    admin: [
      { name: "Dashboard", icon: faUsers, path: "/admin-dashboard" },
      { name: "Classes", icon: faUsers, path: "/admin-classes" },
      { name: "Teachers", icon: faUsers, path: "/admin-teachers" },
      { name: "Learners", icon: faUsers, path: "/admin-learners" },
      { name: "Subjects", icon: faUsers, path: "/admin-subjects" },
       { name: "Mark Entry", icon: faUsers, path: "/admin-mark-entry" },
        { name: "Analysis", icon: faUsers, path: "/admin-analysis" },
         { name: "Settings", icon: faUsers, path: "/admin-settings" },
    ],
    teacher: [
      { name: "Dashboard", icon: faUserTag, path: "/teacher-dashboard" },
      { name: "Classes", icon: faUserTag, path: "/teacher-classes" },
      { name: "Learners", icon: faUserTag, path: "/teacher-learners" },
      { name: "Subjects", icon: faUserTag, path: "/teacher-subjects" },
      { name: "Mark Entry", icon: faUserTag, path: "/teacher-mark-entry" },
      { name: "analysis", icon: faUserTag, path: "/teacher-analysis" },
      { name: "Reports", icon: faUserTag, path: "/teacher-reports" },
      { name: "Settings", icon: faUserTag, path: "/teacher-settings" },
    ],
    student: [
      { name: "Dashboard", icon: faUserTie, path: "/student-dashboard" },
      { name: "My Subjects", icon: faUserTie, path: "/student-my-subjects" },
      { name: "My Results", icon: faUserTie, path: "/student-my-results" },
      { name: "Reports", icon: faUserTie, path: "/student-reports" },
    ],
  };

  const userMenus = allMenus[userRole] || allMenus["admin"];

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""} ${window.innerWidth <= 768 && !collapsed ? "active" : ""}`}>
      <div className="sidebar">
        <ul className="menu-list">
          {userMenus.map((menu, index) => (
            <React.Fragment key={index}>
              <li className="menu-item">
                <div
                  className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                  onClick={() => {
                    if (menu.hasDropdown) {
                      toggleSubmenu(menu.name);
                    } else {
                      handleNavigate(menu.path);
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={menu.icon}
                    className={`menu-icon ${isActive(menu.path) ? "active-icon" : ""}`}
                  />
                  {!collapsed && <span className="menu-text">{menu.name}</span>}
                  {menu.hasDropdown && !collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`dropdown-arrow ${openSubmenu === menu.name ? "rotate" : ""}`}
                    />
                  )}
                </div>
              </li>

              {!collapsed &&
                menu.submenus &&
                openSubmenu === menu.name &&
                menu.submenus.map((sub, subIndex) => (
                  <li key={`sub-${subIndex}`} className="menu-item submenu-item">
                    <div
                      className={`menu-link submenu-link ${isActive(sub.path) ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(sub.path);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={sub.icon}
                        className={`menu-icon ${isActive(sub.path) ? "active-icon" : ""}`}
                      />
                      <span className="menu-text">{sub.name}</span>
                    </div>
                  </li>
                ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;