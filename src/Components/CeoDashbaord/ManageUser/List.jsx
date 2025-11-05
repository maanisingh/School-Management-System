import React, { useState } from 'react';

import { Building2, Search, Plus, Edit2, Eye, Download, Upload, FileText, AlertTriangle, CircleDot, FileCheck, Lightbulb } from 'lucide-react';

const List = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      name: 'Sarah Johnson',
      email: 'sarah@sunview.com',
      status: 'Active',
      role: 'Project Manger',
      projects: 4,
      lastActive: '2 hours ago'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah@sunview.com',
      status: 'Active',
      role: 'Project Manger',
      projects: 4,
      lastActive: '2 hours ago'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <style>{`
        .page-header {
          background: white;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          background-color: #FFF8E6;
          border: 1px solid #FFE4B5;
        }

        .header-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stats-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .stats-row:last-child {
          border-bottom: none;
        }

        .stats-label {
          color: #6B7280;
          font-size: 14px;
        }

        .stats-value {
          color: #111827;
          font-weight: 600;
          font-size: 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .search-box {
          position: relative;
          width: 280px;
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 14px;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #8B5CF6;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
        }

        .add-user-btn {
          background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
          color: #000;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(251, 191, 36, 0.2);
          cursor: pointer;
          transition: transform 0.2s;
        }

        .add-user-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
        }

        .user-card {
          background: white;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 20px;
        }

        .user-details h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .user-details p {
          margin: 4px 0 0 0;
          font-size: 14px;
          color: #6B7280;
        }

        .user-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .status-badge {
          padding: 6px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
          color: #000;
        }

        .role-badge {
          padding: 6px 16px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 13px;
          background: white;
          color: #8B5CF6;
          border: 1.5px solid #8B5CF6;
        }

        .meta-text {
          font-size: 14px;
          color: #6B7280;
          font-weight: 500;
        }

        .action-icons {
          display: flex;
          gap: 12px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #F9FAFB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #F3F4F6;
        }

        .icon-btn.purple {
          color: #8B5CF6;
        }

        .quick-actions-section {
          margin-top: 40px;
        }

        .quick-action-card {
          background: white;
          border-radius: 12px;
          padding: 18px 24px;
          margin-bottom: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .quick-action-card:hover {
          border-color: #8B5CF6;
          box-shadow: 0 4px 8px rgba(139, 92, 246, 0.1);
        }

        .action-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #F9FAFB;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-title {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .insights-section {
          margin-top: 32px;
        }

        .insights-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .insights-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .view-all-link {
          color: #3B82F6;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }

        .insights-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 12px;
        }

        .insight-card {
          background: white;
          border-radius: 12px;
          padding: 18px 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .insight-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .insight-icon-wrapper.red {
          background: #FEF2F2;
          color: #EF4444;
        }

        .insight-icon-wrapper.green {
          background: #F0FDF4;
          color: #10B981;
        }

        .insight-icon-wrapper.blue {
          background: #EFF6FF;
          color: #3B82F6;
        }

        .insight-content {
          flex: 1;
        }

        .insight-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .insight-label {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }

        .severity-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .severity-badge.high {
          background: #FEF2F2;
          color: #EF4444;
        }

        .severity-badge.medium {
          background: #F0FDF4;
          color: #10B981;
        }

        .severity-badge.new {
          background: #EFF6FF;
          color: #3B82F6;
        }

        .insight-text {
          font-size: 13px;
          color: #6B7280;
          margin-bottom: 4px;
        }

        .insight-action {
          font-size: 13px;
          color: #3B82F6;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>

      <div className="container-fluid">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="header-icon">
              <Building2 size={22} />
            </div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827' }}>
              Organization Management
            </h1>
          </div>
        </div>

        {/* User Statistics */}
        <div className="stats-card">
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
            User Statistics
          </h2>
          <div className="stats-row">
            <span className="stats-label">Active Users</span>
            <span className="stats-value">15</span>
          </div>
          <div className="stats-row">
            <span className="stats-label">Inactive Users</span>
            <span className="stats-value">3</span>
          </div>
          <div className="stats-row">
            <span className="stats-label">Project Managers</span>
            <span className="stats-value">4</span>
          </div>
          <div className="stats-row">
            <span className="stats-label">Subcontractors</span>
            <span className="stats-value">8</span>
          </div>
        </div>

        {/* Internal Users Section */}
        <div className="section-header">
          <h2 className="section-title">Internal Users and Roles</h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-user-btn">
              <Plus size={18} />
              Add User
            </button>
          </div>
        </div>

        {/* User Cards */}
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-info">
              <div className="user-avatar">SJ</div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="user-meta">
              <span className="status-badge">{user.status}</span>
              <span className="role-badge">{user.role}</span>
              <span className="meta-text">{user.projects} Projects</span>
              <span className="meta-text">Last: {user.lastActive}</span>
              <div className="action-icons">
                <button className="icon-btn purple">
                  <Eye size={18} />
                </button>
                <button className="icon-btn">
                  <Edit2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Quick Actions Section */}
        <div className="quick-actions-section">
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
            Quick Actions
          </h2>
          
          <div className="quick-action-card">
            <div className="action-icon">
              <Plus size={20} />
            </div>
            <h3 className="action-title">Add Users</h3>
          </div>

          <div className="quick-action-card">
            <div className="action-icon">
              <Edit2 size={20} />
            </div>
            <h3 className="action-title">Bulk Edit</h3>
          </div>

          <div className="quick-action-card">
            <div className="action-icon">
              <Download size={20} />
            </div>
            <h3 className="action-title">Import Users</h3>
          </div>

          <div className="quick-action-card">
            <div className="action-icon">
              <FileText size={20} />
            </div>
            <h3 className="action-title">Export Report</h3>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="insights-section">
          <div className="insights-header">
            <div className="insights-title">
              <Lightbulb size={20} style={{ color: '#3B82F6' }} />
              AI Insights & Recommendations
            </div>
            <a className="view-all-link">View All</a>
          </div>

          <div className="insights-cards">
            <div className="insight-card">
              <div className="insight-icon-wrapper red">
                <AlertTriangle size={20} />
              </div>
              <div className="insight-content">
                <div className="insight-header-row">
                  <span className="insight-label">Quality Risk</span>
                  <span className="severity-badge high">HIGH</span>
                </div>
                <p className="insight-text">Weather conditions may impact concrete</p>
                <a className="insight-action">View Details</a>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon-wrapper green">
                <CircleDot size={20} />
              </div>
              <div className="insight-content">
                <div className="insight-header-row">
                  <span className="insight-label">Deposits</span>
                  <span className="severity-badge medium">MEDIUM</span>
                </div>
                <p className="insight-text">$245k in client deposits expected</p>
                <a className="insight-action">Process</a>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon-wrapper blue">
                <FileCheck size={20} />
              </div>
              <div className="insight-content">
                <div className="insight-header-row">
                  <span className="insight-label">Documents</span>
                  <span className="severity-badge new">NEW</span>
                </div>
                <p className="insight-text">3 permit applications require</p>
                <a className="insight-action">Review</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;