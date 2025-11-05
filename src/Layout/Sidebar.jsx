// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,           // ✅ Pie Chart (Top icon from your image)
  faBriefcase,          // ✅ Briefcase (Middle icon)
  faExclamationCircle,  // ✅ Alert (Bottom icon)
  faUserGear,
  faCalculator,
  faUserTie,
  faUsers,
  faUserTag,
  faHandshake,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("admin");

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin";
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const allMenus = {
    admin: [
      // ✅ Yeh teeno icons aapki image ke exactly match karte hain
      {
        name: "Analytics",
        icon: faChartPie,
        path: "/analytics",
      },
      {
        name: "Daily Logs",
        icon: faBriefcase,
        path: "/daily-logs",
      },
      {
        name: "Alerts",
        icon: faExclamationCircle,
        path: "/alerts",
      },

      // Baki ke options (as per your original design)
      {
        name: "RFIs",
        icon: faUsers,
        path: "/rfis",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/admin-settings",
      },
    ],
    bookkeeper: [
      {
        name: "Overview",
        icon: faCalculator,
        path: "/bookkeeper-dashboard",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/settings",
      },
    ],
    ceo: [
      {
        name: "Overview",
        icon: faUserTie,
        path: "/ceo-dashboard",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/settings",
      },
    ],
    client: [
      {
        name: "Overview",
        icon: faUsers,
        path: "/client-dashboard",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/settings",
      },
    ],
    owner: [
      {
        name: "Overview",
        icon: faUserTag,
        path: "/owner-dashboard",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/settings",
      },
    ],
    projectmanager: [
      {
        name: "Overview",
        icon: faBriefcase,
        path: "/project-manager-dashboard",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/settings",
      },
    ],
    salesmanager: [
      {
        name: "Overview",
        icon: faChartPie,
        path: "/sales-manager-overview",
      },
      {
        name: "Lead Management",
        icon: faBriefcase,
        path: "/lead-management",
      },
      {
        name: "Proposals",
        icon: faUsers,
        path: "/proposals",
        hasDropdown: true,
      },
      {
        name: "Activities",
        icon: faUserGear,
        path: "/activities",
      },
      {
        name: "Reports",
        icon: faUserGear,
        path: "/reports",
      },
    ],
    subcontractor: [
      {
        name: "Overview",
        icon: faHandshake,
        path: "/subcontractor-dashboard",
      },
      {
        name: "Jobs Management",
        icon: faBriefcase,
        path: "/jobs-management",
      },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
      },
      {
        name: "Settings",
        icon: faUserGear,
        path: "/settings",
      },
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