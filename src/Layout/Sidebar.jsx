import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCalculator,
  faUserGear,
  faUserTie,
  faUsers,
  faUserTag,
  faBriefcase,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("admin");

  // Load user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin";
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  // ✅ Only 8 dashboards (clean version)
  const allMenus = {
    admin: [
      {
        name: "Admin Dashboard",
        icon: faUserGear,
        path: "/admin-dashboard",
      },
    ],
    bookkeeper: [
      {
        name: "Bookkeeper Dashboard",
        icon: faCalculator,
        path: "/bookkeeper-dashboard",
      },
    ],
    ceo: [
      {
        name: "CEO Dashboard",
        icon: faUserTie,
        path: "/ceo-dashboard",
      },
    ],
    client: [
      {
        name: "Client Dashboard",
        icon: faUsers,
        path: "/client-dashboard",
      },
    ],
    owner: [
      {
        name: "Owner Dashboard",
        icon: faUserTag,
        path: "/owner-dashboard",
      },
    ],
    projectmanager: [
      {
        name: "Project Manager Dashboard",
        icon: faBriefcase,
        path: "/project-manager-dashboard",
      },
    ],
    salesmanager: [
      {
        name: "Sales Manager Dashboard",
        icon: faChartBar,
        path: "/sales-manager-dashboard",
      },
    ],
    subcontractor: [
      {
        name: "Sub Contractor Dashboard",
        icon: faHandshake,
        path: "/subcontractor-dashboard",
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
                <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                {!collapsed && <span className="menu-text">{menu.name}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
