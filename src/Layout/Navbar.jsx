import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaBars, FaSearch, FaMoon, FaWhatsapp } from "react-icons/fa";
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

  return (
    <>
      <nav className="navbar navbar-expand px-3 py-2 d-flex justify-content-between align-items-center fixed-top navbar-custom">
        {/* Left Section - Menu Button and Logo */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="menu-btn"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>

          <span className="navbar-logo">
            Sunbuild
          </span>
        </div>

        {/* Center Section - Search and Icons */}
        <div className="d-flex align-items-center gap-3">
          {/* Search Box */}
          <div className="search-container d-flex align-items-center">
            <FaSearch color="#888" size={14} />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>

          {/* Icons Container */}
          <div className="d-flex align-items-center gap-2">
            {/* Moon Icon */}
            <button className="icon-btn">
              <FaMoon size={16} color="#333" />
            </button>

            {/* Bell Icon with Badge */}
            <div className="icon-btn position-relative">
              <FaBell size={16} color="#333" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                3
              </span>
            </div>

            {/* WhatsApp Button */}
            <button className="whatsapp-btn">
              <FaWhatsapp size={14} />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Right Section - User Profile */}
        <div className="dropdown" ref={dropdownRef}>
          <div
            className="user-profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle size={20} color="#333" />
            <div className="user-details">
              <div className="user-name">Owner</div>
              <div className="user-projects">105 project</div>
            </div>
          </div>

          {dropdownOpen && (
            <ul className="dropdown-menu show mt-1 dropdown-menu-custom">
              <li>
                <button className="dropdown-item dropdown-item-custom">
                  Profile
                </button>
              </li>
              <li>
                <hr className="dropdown-divider my-1" />
              </li>
              <li>
                <a className="dropdown-item dropdown-item-custom text-danger" href="/">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;