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
  faFileInvoice,
  faFileInvoiceDollar,
  faCreditCard,
  faChartBar,
  faBuildingColumns,
  faLock,
  faCog,
  faTachometerAlt,
  faPercent,
  faPlay,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed, onMobileToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("admin");

  const [openSubmenu, setOpenSubmenu] = useState(null); // Track which menu is open

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "admin").toLowerCase();
    setUserRole(role);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setOpenSubmenu(null);
    if (window.innerWidth <= 768 && onMobileToggle) {
      onMobileToggle(); // Close sidebar after nav on mobile
    }
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  // ✅ Cleaned & deduplicated menus
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

    bookkeeper: [
      {
        name: "Dashboard",
        icon: faChartPie, // ya faHome / faTachometerAlt, dashboard ke liye common icons
        path: "/bookkeeper-dashboard",
      },
      {
        name: "Invoices",
        icon: faFileInvoice, // ya faFileInvoiceDollar
        path: "/invoices",
      },
      {
        name: "Bills", // spelling corrected
        icon: faFileInvoiceDollar, // ya faFileAlt / faReceipt
        path: "/bill",
      },
      {
        name: "Payments",
        icon: faCreditCard, // ya faMoneyCheck / faWallet
        path: "/payment",
      },
      {
        name: "Reports",
        icon: faChartBar, // ya faChartLine / faFileAlt
        path: "/reports",
      },
      {
        name: "Banking",
        icon: faBuildingColumns, // ya faLandmark / faPiggyBank
        path: "/banking",
      },
      {
        name: "Tax/GST",
        icon: faPercent, // ya faFileInvoiceDollar / faBalanceScale
        path: "/tax-gst",
      },
    ],
    ceo: [
      { name: "Overview", icon: faUserTie, path: "/ceo-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
        submenus: [
          { name: "List", icon: faPlay, path: "/manage-users/list" },
          {
            name: "Permissions",
            icon: faCheckCircle,
            path: "/manage-users/permissions",
          },
        ],
      },
      { name: "Settings", icon: faUserGear, path: "/settings" },
    ],
    client: [
      { name: "Overview", icon: faUsers, path: "/client-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      {
        name: "Manage Users",
        icon: faUsers,
        path: "/manage-users",
        hasDropdown: true,
        submenus: [
          { name: "List", icon: faPlay, path: "/manage-users/list" },
          {
            name: "Permissions",
            icon: faCheckCircle,
            path: "/manage-users/permissions",
          },
        ],
      },
      { name: "Settings", icon: faUserGear, path: "/settings" },
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
          {
            name: "Permissions",
            icon: faCheckCircle,
            path: "/manage-users/permissions",
          },
        ],
      },
      { name: "Settings", icon: faUserGear, path: "/owner/settings" },
    ],

    projectmanager: [
      { name: "Dashboard", icon: faTachometerAlt, path: "/project-manager" },
      // { name: "Daily Logs", icon: faBriefcase, path: "/daily-logs" },
      // { name: "Alerts", icon: faExclamationCircle, path: "/alerts" },
      { name: "RFIs", icon: faExclamationCircle, path: "/rfis" },
      { name: "Change Orders", icon: faLock, path: "/change-orders" },
      { name: "Selection", icon: faCog, path: "/selection" },
      // { name: "Schedule", icon: faCog, path: "/schedule" },
    ],
    salesmanager: [
      { name: "Overview", icon: faChartPie, path: "/sales-manager-overview" },
      { name: "Lead Management", icon: faBriefcase, path: "/lead-management" },
      {
        name: "Proposals",
        icon: faUsers,
        path: "/proposals",
        hasDropdown: true,
        submenus: [
          { name: "Drafts", icon: faPlay, path: "/proposals/drafts" },
          { name: "Sent", icon: faCheckCircle, path: "/proposals/sent" },
        ],
      },
      { name: "Proposals", icon: faUsers, path: "/proposals" },
      { name: "Activities", icon: faUserGear, path: "/activities" },
      { name: "Reports", icon: faChartBar, path: "/sales-reports" },
    ],
    subcontractor: [
      { name: "Overview", icon: faHandshake, path: "/subcontractor-dashboard" },
      { name: "Jobs Management", icon: faBriefcase, path: "/jobs-management" },
      {
        name: "Schedule RFIs",
        icon: faUsers,
        path: "/schedule-rfis",
        hasDropdown: true,
        submenus: [
          { name: "Pending", icon: faPlay, path: "/schedule-rfis/pending" },
          {
            name: "Completed",
            icon: faCheckCircle,
            path: "/schedule-rfis/completed",
          },
        ],
      },
      { name: "Schedule RFIs", icon: faUsers, path: "/schedule-rfis" },
      { name: "To Do", icon: faUserGear, path: "/to-do" },
    ],
  };

  const userMenus = allMenus[userRole] || allMenus.admin;

  return (
    <div
      className={`sidebar-container ${collapsed ? "collapsed" : ""} ${
        window.innerWidth <= 768 && !collapsed ? "active" : ""
      }`}
    >
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
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <FontAwesomeIcon
                    icon={menu.icon}
                    className={`menu-icon ${
                      isActive(menu.path) ? "active-icon" : ""
                    }`}
                  />
                  {!collapsed && <span className="menu-text">{menu.name}</span>}
                  {menu.hasDropdown && !collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`dropdown-arrow ${
                        openSubmenu === menu.name ? "rotate" : ""
                      }`}
                    />
                  )}
                </div>
              </li>

              {/* Render submenus if open and not collapsed */}
              {!collapsed &&
                menu.submenus &&
                openSubmenu === menu.name &&
                menu.submenus.map((sub, subIndex) => (
                  <li
                    key={`sub-${subIndex}`}
                    className="menu-item submenu-item"
                  >
                    <div
                      className={`menu-link submenu-link ${
                        isActive(sub.path) ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(sub.path);
                      }}
                      style={{ paddingLeft: "36px", cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={sub.icon}
                        className={`menu-icon ${
                          isActive(sub.path) ? "active-icon" : ""
                        }`}
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
