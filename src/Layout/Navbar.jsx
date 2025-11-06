import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaSearch,
  FaMoon,
  FaWhatsapp,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleSidebar = () => {
    if (typeof toggleSidebar === "function") {
      toggleSidebar();
    }
  };

  return (
    <nav className="navbar-custom">
      {/* Left: Menu + Logo */}
      <div className="navbar-left">
        <button className="menu-btn" onClick={handleToggleSidebar} aria-label="Toggle sidebar">
          <FaBars size={20} />
        </button>
        <span className="navbar-logo">Sunbuild</span>
      </div>

      {/* Center: Search (desktop only) */}
      <div className="navbar-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      {/* Right: Icons + User Profile */}
      <div className="navbar-right">
        <div className="nav-icons">
          <button className="nav-icon-btn" title="Dark Mode">
            <FaMoon size={16} />
          </button>

          <div className="nav-icon-btn position-relative" title="Notifications">
            <FaBell size={16} />
            <span className="notification-badge">3</span>
          </div>

          <button className="whatsapp-btn" title="WhatsApp">
            <FaWhatsapp size={16} />
            <span className="whatsapp-text">WhatsApp</span>
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown" ref={dropdownRef}>
          <div
            className="user-profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle size={20} />
            <div className="user-details">
              <div className="user-name">Owner</div>
              <div className="user-projects">105 projects</div>
            </div>
          </div>

          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item">Profile</button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="/">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;