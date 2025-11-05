import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Inline SVG Icons (No Font Awesome Needed!)
const Icons = {
  exclamation: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  invoice: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  bank: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1l10 6v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"/>
      <polyline points="12,1 12,12 22,6 12,1"/>
    </svg>
  ),
  plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  money: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8M12 16V8"/>
    </svg>
  ),
  receipt: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
    </svg>
  ),
  chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="3" x2="21" y2="21"/>
      <polyline points="12 3 12 15 18 15"/>
      <polyline points="12 6 12 12 15 12"/>
      <polyline points="12 9 12 11 13 11"/>
    </svg>
  ),
  users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M23 21v-2a4 4 0 0 0-4-4"/>
      <circle cx="16.5" cy="7" r="4"/>
    </svg>
  ),
  alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  trend: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
};

const BookkeeperDashboard = () => {
  return (
    <>
      <style>{`
        /* Global Styles & Resets */
        .bookkeeper-dashboard {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8fafc;
          color: #334155;
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
        }

        .dashboard-header,
        .dashboard-content,
        .content-row,
        .bottom-sections {
          width: 100%;
          box-sizing: border-box;
        }

        /* Header & Metrics */
        .dashboard-header {
          margin-bottom: 30px;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 25px;
        }

        .metrics-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .metric-box {
          padding: 20px;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .metric-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .metric-label {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-top: 5px;
        }

        /* Main Content Layout */
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .content-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* Section Headers */
        .section-header {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }

        /* Priority Items */
        .priority-section {
          background-color: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .priority-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .priority-item {
          display: flex;
          align-items: center;
          padding: 15px;
          border-radius: 8px;
          background-color: #f8fafc;
          transition: background-color 0.2s ease;
        }

        .priority-item:hover {
          background-color: #f1f5f9;
        }

        .priority-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
          color: white;
          flex-shrink: 0;
        }

        .priority-content {
          flex-grow: 1;
        }

        .priority-title {
          font-weight: 600;
          color: #1e293b;
        }

        .priority-desc {
          font-size: 14px;
          color: #64748b;
        }

        .priority-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
          background-color: white;
          color: #334155;
          border: 1px solid #cbd5e1;
        }

        .priority-btn:hover {
          background-color: #f97316;
          color: white;
          border-color: #f97316;
        }

        /* Quick Actions */
        .actions-section {
          background-color: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .action-button {
          display: flex;
          align-items: center;
          padding: 15px;
          margin-bottom: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-weight: 600;
        }

        .action-button:hover {
          transform: translateX(5px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .action-button svg {
          margin-right: 12px;
          flex-shrink: 0;
        }

        /* Bottom Sections */
        .bottom-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* Client Information - New Style */
        .client-section {
          background-color: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .client-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .client-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .client-header h2 svg {
          width: 20px;
          height: 20px;
          fill: #3b82f6;
        }

        .client-header .view-all {
          color: #3b82f6;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .client-header .view-all:hover {
          text-decoration: underline;
        }

        .client-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .client-card {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #fff;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .client-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .client-card span {
          font-weight: 600;
          color: #334155;
        }

        /* AI Insights - New Style */
        .ai-section {
          background-color: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .ai-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ai-header h2 svg {
          width: 20px;
          height: 20px;
          fill: #3b82f6;
        }

        .ai-header .view-all {
          color: #3b82f6;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .ai-header .view-all:hover {
          text-decoration: underline;
        }

        .ai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
        }

        .ai-card {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #fff;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ai-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .ai-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .ai-content {
          flex-grow: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ai-category {
          font-size: 13px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ai-category.high {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .ai-category.medium {
          background-color: #dcfce7;
          color: #166534;
        }

        .ai-category.new {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .ai-text {
          font-size: 14px;
          color: #334155;
          flex-grow: 1;
        }

        .ai-action {
          font-size: 14px;
          font-weight: 600;
          color: #3b82f6;
          text-decoration: none;
          cursor: pointer;
        }

        .ai-action:hover {
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .bookkeeper-dashboard {
            padding: 15px;
          }
          .header-title {
            font-size: 24px;
          }
          .metrics-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .content-row {
            grid-template-columns: 1fr;
          }
          .bottom-sections {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .bookkeeper-dashboard {
            padding: 10px;
          }
          .header-title {
            font-size: 22px;
          }
          .metrics-container {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .metric-box {
            padding: 15px;
          }
          .metric-value {
            font-size: 20px;
          }
          .section-header {
            font-size: 18px;
          }
          .priority-item, .client-item, .ai-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .priority-icon, .client-avatar, .ai-icon {
            margin-right: 0;
            margin-bottom: 10px;
          }
          .priority-btn {
            width: 100%;
            margin-top: 10px;
          }
          .client-balance {
            margin-top: 10px;
          }
          .client-grid,
          .ai-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .bookkeeper-dashboard {
            padding: 5px;
          }
          .header-title {
            font-size: 20px;
          }
          .metric-value {
            font-size: 18px;
          }
          .priority-section, .actions-section, .client-section, .ai-section {
            padding: 15px;
          }
          .action-button {
            padding: 12px;
          }
          .action-button svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
      
      <div className="bookkeeper-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="header-title">Bookkeeper Dashboard</h1>
          <div className="metrics-container">
            {[
              { label: 'Outstanding AR', value: '$72,250', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H9"/></svg> },
              { label: 'Overdue Invoices', value: '8', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
              { label: 'Pending Bills', value: '15', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
              { label: 'Cash on Hand', value: '$158,750', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H9"/></svg> },
              { label: 'Monthly Revenue', value: '$420,000', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H9"/></svg> },
              { label: 'Monthly Expenses', value: '$185,000', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H9"/></svg> },
            ].map((m, i) => (
              <div key={i} className="metric-box" style={{ backgroundColor: '#fff', borderLeft: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  {m.icon()}
                </div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-value">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="content-row">
            {/* Priority Items */}
            <div className="priority-section">
              <h2 className="section-header">Priority Items</h2>
              <div className="priority-list">
                <div className="priority-item" style={{ borderLeft: '4px solid #ef4444' }}>
                  <div className="priority-icon" style={{ backgroundColor: '#ef4444' }}>
                    <Icons.exclamation />
                  </div>
                  <div className="priority-content">
                    <div className="priority-title">8 Overdue Invoices, Total: $72,250</div>
                    <div className="priority-desc">Action needed</div>
                  </div>
                  <button className="priority-btn">Review</button>
                </div>
                <div className="priority-item" style={{ borderLeft: '4px solid #f97316' }}>
                  <div className="priority-icon" style={{ backgroundColor: '#f97316' }}>
                    <Icons.invoice />
                  </div>
                  <div className="priority-content">
                    <div className="priority-title">Bills Due This Week</div>
                    <div className="priority-desc">4 bills totaling $36,250</div>
                  </div>
                  <button className="priority-btn">View</button>
                </div>
                <div className="priority-item" style={{ borderLeft: '4px solid #3b82f6' }}>
                  <div className="priority-icon" style={{ backgroundColor: '#3b82f6' }}>
                    <Icons.bank />
                  </div>
                  <div className="priority-content">
                    <div className="priority-title">Bank Reconciliation</div>
                    <div className="priority-desc">Payroll account needs reconciliation</div>
                  </div>
                  <button className="priority-btn">Reconcile</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="actions-section">
              <h2 className="section-header">Quick Actions</h2>
              {[
                { icon: Icons.plus, label: 'Create Invoice', bg: '#dbeafe', color: '#1d4ed8' },
                { icon: Icons.money, label: 'Record Payment', bg: '#dcfce7', color: '#166534' },
                { icon: Icons.receipt, label: 'Add Expense', bg: '#ffedd5', color: '#c2410c' },
                { icon: Icons.chart, label: 'Generate Report', bg: '#ede9fe', color: '#4c1d95' },
                { icon: Icons.users, label: 'Manage Clients', bg: '#fce7f3', color: '#be185d' },
              ].map((a, i) => (
                <div key={i} className="action-button" style={{ backgroundColor: a.bg, color: a.color }}>
                  {a.icon()}
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="bottom-sections">
            {/* Client Information - New Layout */}
            <div className="client-section">
              <div className="client-header">
                <h2>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 2-2 2 2-2 2zm2-8c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Client Information
                </h2>
                <a href="#" className="view-all">View All</a>
              </div>
              <div className="client-grid">
                {[
                  { title: 'Sales Deposit' },
                  { title: 'Client Name' },
                  { title: 'Procurement' },
                  { title: 'Title 4' },
                  { title: 'Title 5' },
                  { title: 'Title 6' },
                ].map((item, i) => (
                  <div key={i} className="client-card">
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights - New Layout */}
            <div className="ai-section">
              <div className="ai-header">
                <h2>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.669 11.669L12 14l2.331-2.331M12 22c6.627 0 12-5.373 12-12S18.627 2 12 2s-12 5.373-12 12 5.373 12 12 12z"/>
                  </svg>
                  AI Insights & Recommendations
                </h2>
                <a href="#" className="view-all">View All</a>
              </div>
              <div className="ai-grid">
                {[
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
                    category: 'HIGH',
                    text: 'Weather conditions may impact concrete',
                    action: 'View Details'
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 16V8"/></svg>,
                    category: 'MEDIUM',
                    text: '$245k in client deposits expected',
                    action: 'Process'
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2"><path d="M14 5H4v14h10V5z"/><path d="M14 5v14h10V5h-10z"/></svg>,
                    category: 'NEW',
                    text: '3 permit applications require',
                    action: 'Review'
                  },
                ].map((item, i) => (
                  <div key={i} className="ai-card">
                    <div className="ai-icon" style={{ backgroundColor: item.category === 'HIGH' ? '#fee2e2' : item.category === 'MEDIUM' ? '#dcfce7' : '#dbeafe' }}>
                      {item.icon}
                    </div>
                    <div className="ai-content">
                      <span className={`ai-category ${item.category.toLowerCase()}`}>{item.category}</span>
                      <span className="ai-text">{item.text}</span>
                      <a href="#" className="ai-action">{item.action}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookkeeperDashboard;