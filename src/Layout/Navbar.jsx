import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaSearch,
  FaMoon,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setDropdownOpen(false);
    navigate("/"); // ya navigate("/login") agar login page alag route par hai
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    alert("Profile page coming soon!");
  };

  // ✅ Only toggle dropdown on user-profile click
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent interference
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-left">
        <button className="menu-btn" onClick={handleToggleSidebar} aria-label="Toggle sidebar">
          <FaBars size={20} />
        </button>
        <span className="navbar-logo">Sunbuild</span>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

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

        {/* ✅ Fixed: Full clickable area with proper event handling */}
        <div className="dropdown" ref={dropdownRef}>
          <div className="user-profile" onClick={toggleDropdown}>
            <FaUserCircle size={20} />
            <div className="user-details">
              <div className="user-name">Owner</div>
              <div className="user-projects">105 projects</div>
            </div>
          </div>

          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={handleProfile}>
                  Profile
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;