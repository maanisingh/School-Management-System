// src/components/Sidebar.js
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
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("admin");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin";
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const allMenus = {
    admin: [
      { name: "Analytics", icon: faChartPie, path: "/analytics" },
      { name: "Daily Logs", icon: faBriefcase, path: "/daily-logs" },
      { name: "Alerts", icon: faExclamationCircle, path: "/alerts" },
      { name: "RFIs", icon: faUsers, path: "/rfis", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/admin-settings" },
    ],
    bookkeeper: [
      { name: "Overview", icon: faCalculator, path: "/bookkeeper-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    ceo: [
      { name: "Overview", icon: faUserTie, path: "/ceo-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
        subMenu: [
          { name: "List", path: "/manage-users/list" },
          { name: "Permissions", path: "/manage-users/permissions" }
        ]
      },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    // ... other roles remain the same
    client: [
      { name: "Overview", icon: faUsers, path: "/client-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    owner: [
      { name: "Overview", icon: faUserTag, path: "/owner-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    projectmanager: [
      { name: "Overview", icon: faBriefcase, path: "/project-manager-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
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
                onClick={() => {
                  if (menu.hasDropdown) {
                    toggleDropdown(menu.name);
                  } else {
                    handleNavigate(menu.path);
                  }
                }}
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
                    className={`dropdown-arrow ${openDropdown === menu.name ? "open" : ""}`}
                  />
                )}
              </div>

              {/* ✅ MODIFIED: Submenu Container */}
              {menu.hasDropdown && !collapsed && openDropdown === menu.name && (
                <div className="submenu-container">
                  <ul className="submenu">
                    {menu.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex} className="submenu-item">
                        <div
                          className={`submenu-link ${isActive(subItem.path) ? "active" : ""}`}
                          onClick={() => {
                            handleNavigate(subItem.path);
                            setOpenDropdown(null);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="submenu-text">{subItem.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;