import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faBriefcase,
  faExclamationCircle,
  faUserGear,
  faUserTie,
  faUsers,
  faUserTag,
  faHandshake,
  faChevronDown,
  faLock,
  faCog,
  faTachometerAlt,
  faFileInvoice,
  faFileInvoiceDollar,
  faCreditCard,
  faChartBar,
  faBuildingColumns,
  faPercent,
  faPlay,
  faCheckCircle,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("admin");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin";
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
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
      { name: "Dashboard", icon: faChartPie, path: "/bookkeeper-dashboard" },
      { name: "Invoices", icon: faFileInvoice, path: "/invoices" },
      { name: "Bills", icon: faFileInvoiceDollar, path: "/bills" },
      { name: "Payments", icon: faCreditCard, path: "/payments" },
      { name: "Reports", icon: faChartBar, path: "/reports" },
      { name: "Banking", icon: faBuildingColumns, path: "/banking" },
      { name: "Tax/GST", icon: faPercent, path: "/tax-gst" },
    ],
    ceo: [
      { name: "Overview", icon: faUserTie, path: "/ceo-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Manage Users", icon: faUsers, path: "/manage-users", hasDropdown: true },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    client: [
      { name: "Overview", icon: faUsers, path: "/client-dashboard" },
      { name: "Selections", icon: faBriefcase, path: "/client-selections" },
      { name: "Schedules", icon: faUsers, path: "/client-schedules" },
      { name: "Calendar", icon: faUserGear, path: "/client-calendar" },
      { name: "Payments", icon: faUserGear, path: "/client-payments" },
    ],
    owner: [
      { name: "Overview", icon: faUserTag, path: "/owner-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
        submenus: [
          { name: "List", icon: faPlay, path: "/manage-users/list" },
          { name: "Permissions", icon: faCheckCircle, path: "/manage-users/permissions" },
        ],
      },
      { name: "Settings", icon: faUserGear, path: "/owner/settings" },
    ],
    projectmanager: [
      { name: "Dashboard", icon: faTachometerAlt, path: "/project-manager" },
      { name: "Daily Logs", icon: faBriefcase, path: "/daily-logs" },
      { name: "Alerts", icon: faExclamationCircle, path: "/alerts" },
      { name: "RFIs", icon: faExclamationCircle, path: "/rfis" },
      { name: "Change Orders", icon: faLock, path: "/change-orders" },
      { name: "Selection", icon: faCog, path: "/selection" },
      { name: "Schedule", icon: faCog, path: "/schedule" },
    ],
    salesmanager: [
      { name: "Overview", icon: faChartPie, path: "/sales-manager-overview" },
      { name: "Lead Management", icon: faBriefcase, path: "/lead-management" },
      { name: "Proposals", icon: faUsers, path: "/proposals", hasDropdown: true },
      { name: "Activities", icon: faUserGear, path: "/activities" },
      { name: "Reports", icon: faUserGear, path: "/reports" },
    ],
    subcontractor: [
      { name: "Overview", icon: faHandshake, path: "/subcontractor-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      { name: "Schedule RFIs", icon: faUsers, path: "/schedule-rfis", hasDropdown: true },
      { name: "To Do", icon: faUserGear, path: "/to-do" },
    ],
  };

  const userMenus = allMenus[userRole.toLowerCase()] || allMenus.admin;

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {userMenus.map((menu, index) => (
            <React.Fragment key={index}>
              <li className="menu-item">
                <div
                  className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                  onClick={() => {
                    menu.hasDropdown ? toggleSubmenu(menu.name) : handleNavigate(menu.path);
                  }}
                  style={{ cursor: "pointer", position: "relative" }}
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
                      style={{ paddingLeft: "36px", cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={sub.icon}
                        className={`menu-icon ${isActive(sub.path) ? "active-icon" : ""}`}
                        style={{ fontSize: "0.85em" }}
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
