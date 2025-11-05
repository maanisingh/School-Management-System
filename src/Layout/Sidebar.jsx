import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faBriefcase,
  faExclamationCircle,
  faUserGear,
  faCalculator,
  faUserTie,
  faUsers,
  faUserTag,
  faHandshake,
  faChevronDown,
  faLock,
  faCog,
  faTachometerAlt // Project Manager Dashboard icon
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("admin");

  useEffect(() => {
    // Get user role from localStorage
    // NOTE: For real-world apps, use a proper state management solution or Context for user roles.
    const role = localStorage.getItem("userRole") || "admin";
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    // On mobile screens, collapse the sidebar after navigation
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const allMenus = {
    admin: [
      { name: "Analytics", icon: faChartPie, path: "/analytics" },
      { name: "Daily Logs", icon: faBriefcase, path: "/daily-logs" },
      { name: "Alerts", icon: faExclamationCircle, path: "/alerts" },
      { name: "RFIs", icon: faUsers, path: "/rfis", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/admin-settings" },
    ],
    // ... other roles ...
    bookkeeper: [
      { name: "Overview", icon: faCalculator, path: "/bookkeeper-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    ceo: [
      { name: "Overview", icon: faUserTie, path: "/ceo-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    client: [
      { name: "Overview", icon: faUsers, path: "/client-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    owner: [
      { name: "Overview", icon: faUserTag, path: "/owner-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    // 🎯 Project Manager Menu: RFIs is correctly set to path: "/rfis"
    projectmanager: [
      {
        name: "Dashboard",
        icon: faTachometerAlt,
        path: "/project-manager",
      },
      {
        name: "Daily Logs",
        icon: faBriefcase,
        path: "/daily-logs",
      },
      {
        name: "RFIs",
        icon: faExclamationCircle,
        path: "/rfis", // 👈 This links to the route in App.jsx
      },
      {
        name: "Change Orders",
        icon: faLock,
        path: "/change-orders",
      },
      {
        name: "Selection",
        icon: faCog,
        path: "/selection",
      },
      {
        name: "Schedule",
        icon: faCog,
        path: "/schedule",
      },
    ],
    salesmanager: [
      { name: "Overview", icon: faChartPie, path: "/sales-manager-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    subcontractor: [
      { name: "Overview", icon: faHandshake, path: "/subcontractor-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
  };

  const userMenus = allMenus[userRole.toLowerCase()] || allMenus.admin;

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {userMenus.map((menu, index) => (
            <li key={index} className="menu-item">
              <div
                className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                onClick={() => handleNavigate(menu.path)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={menu.icon}
                  className={`menu-icon ${isActive(menu.path) ? "active-icon" : ""}`}
                />
                {!collapsed && <span className="menu-text">{menu.name}</span>}
                {menu.hasDropdown && !collapsed && (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="dropdown-arrow"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;