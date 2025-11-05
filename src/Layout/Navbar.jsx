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
    <>
      <nav className="navbar navbar-expand px-3 py-2 d-flex justify-content-between align-items-center fixed-top navbar-custom">
        {/* Left: Menu + Logo */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="menu-btn"
            onClick={handleToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FaBars size={20} />
          </button>
          <span className="navbar-logo d-none d-md-block">Sunbuild</span>
          <span className="navbar-logo-mobile d-md-none">Sunbuild</span>
        </div>

        {/* Center: Search (Desktop) + Search Icon (Mobile) */}
        <div className="d-flex align-items-center gap-3">
          {/* Desktop Search */}
          <div className="search-container d-none d-md-flex align-items-center">
            <FaSearch color="#888" size={14} />
            <input type="text" placeholder="Search" className="search-input" />
          </div>

          {/* Icons */}
          <div className="d-flex align-items-center gap-2">
            {/* Moon Icon - Visible on all */}
            <button className="icon-btn">
              <FaMoon size={16} color="#333" />
            </button>

            {/* Bell Icon */}
            <div className="icon-btn position-relative">
              <FaBell size={16} color="#333" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                3
              </span>
            </div>

            {/* WhatsApp — Text only on desktop */}
            <button className="whatsapp-btn d-none d-md-flex align-items-center">
              <FaWhatsapp size={14} />
              <span className="ms-1 d-none d-lg-inline">WhatsApp</span>
            </button>

            {/* WhatsApp — Icon only on mobile */}
            <button className="icon-btn d-md-none">
              <FaWhatsapp size={16} color="#25D366" />
            </button>
          </div>
        </div>

        {/* Right: User Profile */}
        <div className="dropdown" ref={dropdownRef}>
          <div
            className="user-profile d-flex align-items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle size={20} color="#333" />
            {/* User details only on desktop */}
            <div className="user-details ms-2 d-none d-md-block">
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
                <a
                  className="dropdown-item dropdown-item-custom text-danger"
                  href="/"
                >
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
