import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaSearch,
  FaMoon,
  FaWhatsapp,
  FaSignOutAlt, // Added for logout icon
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Image } from 'react-bootstrap';
import logo from '../assets/logo (2).png';

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
    // Clear all authentication data
    localStorage.clear();
    sessionStorage.clear();
    
    // Close dropdown
    setDropdownOpen(false);
    
    // Force navigate to login page
    navigate("/", { replace: true });
    
    // If navigate doesn't work, use window.location
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
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
        <span className="navbar-logo">
          <img src={logo} alt="Logo" style={{ width: '170px', height: '120px' }} />
        </span>
      </div>

     

      <div className="navbar-right">
        <div className="nav-icons">
        
          <div className="nav-icon-btn position-relative" title="Notifications">
            <FaBell size={16} />
            <span className="notification-badge">3</span>
          </div>

          

          {/* ✅ ADDED: Visible Logout Button */}
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
          >
            <FaSignOutAlt size={16} />
            <span className="btn-text">Logout</span>
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
                {/* ✅ Ensured logout button is visible and clickable */}
                <button
                  className="dropdown-item text-danger d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt size={14} style={{ marginRight: '8px' }} />
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