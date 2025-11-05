import React, { useState } from "react";

const ListOwer = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      name: "Sarah Johnson",
      email: "sarah@sunview.com",
      status: "Active",
      role: "Project Manager",
      projects: 4,
      last: "2 hours ago",
    },
    {
      name: "Michael Lee",
      email: "michael@sunview.com",
      status: "Active",
      role: "Project Manager",
      projects: 3,
      last: "3 hours ago",
    },
  ];

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        .org-page {
          padding: 20px;
          background: #fff;
          color: #222;
          max-width: 1100px;
          margin: auto;
        }

        /* Header */
        .org-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fffbeb;
          border-radius: 10px;
          padding: 15px 20px;
          border: 1px solid #f3e8c9;
          margin-bottom: 20px;
        }
        .org-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .org-icon {
          background: #a020f0;
          color: #fff;
          padding: 8px;
          border-radius: 8px;
        }
        .org-header span {
          font-weight: 600;
        }
        .org-dropdown {
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          cursor: pointer;
        }

        /* Stats */
        .org-stats {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
        }
        .org-stats h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .org-stats-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #555;
        }
        .org-stats-item {
          display: flex;
          justify-content: space-between;
        }

        /* Internal Users */
        .org-users-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .org-user-search {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .org-search-box {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 8px 12px;
          outline: none;
          width: 180px;
        }
        .org-add-btn {
          background: #ffc107;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* User Card */
        .org-user-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 18px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .org-user-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .org-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #a020f0;
        }
        .org-user-info h4 {
          font-size: 1rem;
          font-weight: 600;
        }
        .org-user-info p {
          font-size: 0.9rem;
          color: #666;
        }

        .org-user-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .org-badge {
          padding: 5px 10px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .org-active {
          background: #ffc107;
          color: #222;
        }
        .org-role {
          border: 2px solid #a020f0;
          color: #a020f0;
          background: #fff;
        }
        .org-projects {
          font-weight: 500;
        }
        .org-last {
          font-size: 0.9rem;
          color: #555;
        }
        .org-actions {
          display: flex;
          gap: 6px;
        }
        .org-icon-btn {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 6px 8px;
          cursor: pointer;
        }

        /* Quick Actions */
        .org-actions-section h3 {
          font-size: 1.1rem;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .org-quick-card {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 15px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .org-quick-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
       .org-plus-btn {
    background: #589be2;
    color: #fff;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .org-plus-btn:hover {
    background: #4a8ad0;
    transform: scale(1.05);
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  }

  .org-plus-btn:active {
    transform: scale(0.95);
  }

  .org-plus-btn:focus {
    outline: 2px solid #a3d0ff;
    outline-offset: 2px;
  }

        /* Insights */
        .org-insights-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          margin-bottom: 12px;
        }
        .org-insight-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }
        .org-insight-card {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .org-insight-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .org-insight-level {
          font-size: 0.75rem;
          background: #f1f1f1;
          padding: 3px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .org-insight-action {
          color: #007bff;
          font-weight: 600;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .org-users-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .org-user-search {
            width: 100%;
            flex-direction: column;
          }
          .org-search-box {
            width: 100%;
          }
          .org-user-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>

      <div className="org-page">
        {/* Header */}
        <div className="org-header">
          <div className="org-header-left">
            <div className="org-icon">🏢</div>
            <span>Organization Management</span>
          </div>
          <div className="org-dropdown">⌄</div>
        </div>

        {/* User Statistics */}
        <div className="org-stats">
          <h3>User Statistics</h3>
          <div className="org-stats-list">
            <div className="org-stats-item">
              <span>Active Users</span>
              <span>15</span>
            </div>
            <div className="org-stats-item">
              <span>Inactive Users</span>
              <span>3</span>
            </div>
            <div className="org-stats-item">
              <span>Project Managers</span>
              <span>4</span>
            </div>
            <div className="org-stats-item">
              <span>Subcontractors</span>
              <span>8</span>
            </div>
          </div>
        </div>

        {/* Internal Users */}
        <div className="org-users-header">
          <h3>Internal Users and Roles</h3>
          <div className="org-user-search">
            <input
              type="text"
              placeholder="Search..."
              className="org-search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="org-add-btn">➕ Add User</button>
          </div>
        </div>

        {filteredUsers.map((u, i) => (
          <div key={i} className="org-user-card">
            <div className="org-user-left">
              <div className="org-avatar"></div>
              <div className="org-user-info">
                <h4>{u.name}</h4>
                <p>{u.email}</p>
              </div>
            </div>
            <div className="org-user-right">
              <span className="org-badge org-active">{u.status}</span>
              <span className="org-badge org-role">{u.role}</span>
              <span className="org-projects">{u.projects} Projects</span>
              <span className="org-last">Last: {u.last}</span>
              <div className="org-actions">
                <button className="org-icon-btn">👁</button>
                <button className="org-icon-btn">✏</button>
              </div>
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="org-actions-section">
          <h3>Quick Actions</h3>
          {["Add Users", "Bulk Edit", "Import Users", "Export Report"].map(
            (item, i) => (
              <div key={i} className="org-quick-card">
                <div className="org-quick-left">
                  <span>⚙</span>
                  <strong>{item}</strong>
                </div>
                <button className="org-plus-btn">+</button>
              </div>
            )
          )}
        </div>

        {/* Insights */}
        <div className="org-insights-header">
          <h3>AI Insights & Recommendations</h3>
          <a href="#" className="org-insight-action">
            View All
          </a>
        </div>
        <div className="org-insight-list">
          <div className="org-insight-card">
            <div className="org-insight-left">
              <span>⚠</span>
              <strong>Quality Risk</strong>
              <span className="org-insight-level">HIGH</span>
            </div>
            <span className="org-insight-action">View</span>
          </div>
          <div className="org-insight-card">
            <div className="org-insight-left">
              <span>💰</span>
              <strong>Deposits</strong>
              <span className="org-insight-level">MEDIUM</span>
            </div>
            <span className="org-insight-action">Process</span>
          </div>
          <div className="org-insight-card">
            <div className="org-insight-left">
              <span>📄</span>
              <strong>Documents</strong>
              <span className="org-insight-level">NEW</span>
            </div>
            <span className="org-insight-action">Review</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOwer;