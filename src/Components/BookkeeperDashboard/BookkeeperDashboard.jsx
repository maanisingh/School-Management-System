import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookkeeperDashboard.css';

const BookkeeperDashboard = () => {
  return (
    <div className="bookkeeper-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-title">Bookkeeper Dashboard</div>
        
        {/* Financial Metrics */}
        <div className="metrics-container">
          <div className="metric-box ar-box">
            <div className="metric-label">Outstanding AR</div>
            <div className="metric-value">$72,250</div>
          </div>
          <div className="metric-box overdue-box">
            <div className="metric-label">Overdue Invoices</div>
            <div className="metric-value">8</div>
          </div>
          <div className="metric-box pending-box">
            <div className="metric-label">Pending Bills</div>
            <div className="metric-value">15</div>
          </div>
          <div className="metric-box cash-box">
            <div className="metric-label">Cash on Hand</div>
            <div className="metric-value">$158,750</div>
          </div>
          <div className="metric-box revenue-box">
            <div className="metric-label">Monthly Revenue</div>
            <div className="metric-value">$420,000</div>
          </div>
          <div className="metric-box expenses-box">
            <div className="metric-label">Monthly Expenses</div>
            <div className="metric-value">$185,000</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="content-row">
          {/* Left Section - Priority Items */}
          <div className="priority-section">
            <div className="section-header">Priority Items</div>
            <div className="priority-list">
              <div className="priority-item">
                <div className="priority-icon overdue-icon">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <div className="priority-content">
                  <div className="priority-title">Overdue Invoices</div>
                  <div className="priority-desc">8 invoices overdue</div>
                </div>
              </div>
              <div className="priority-item">
                <div className="priority-icon bills-icon">
                  <i className="fas fa-file-invoice-dollar"></i>
                </div>
                <div className="priority-content">
                  <div className="priority-title">Bills Due This Week</div>
                  <div className="priority-desc">5 bills need payment</div>
                </div>
              </div>
              <div className="priority-item">
                <div className="priority-icon bank-icon">
                  <i className="fas fa-university"></i>
                </div>
                <div className="priority-content">
                  <div className="priority-title">Bank Reconciliation</div>
                  <div className="priority-desc">2 accounts pending</div>
                </div>
              </div>
              <div className="priority-item">
                <div className="priority-icon clients-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="priority-content">
                  <div className="priority-title">Follow-up with Clients</div>
                  <div className="priority-desc">12 clients need contact</div>
                </div>
              </div>
              <div className="priority-item">
                <div className="priority-icon tax-icon">
                  <i className="fas fa-receipt"></i>
                </div>
                <div className="priority-content">
                  <div className="priority-title">Tax Payments Due</div>
                  <div className="priority-desc">3 payments this month</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="actions-section">
            <div className="action-button create-invoice">
              <i className="fas fa-plus-circle"></i>
              <span>Create Invoice</span>
            </div>
            <div className="action-button record-payment">
              <i className="fas fa-money-check-alt"></i>
              <span>Record Payment</span>
            </div>
            <div className="action-button add-expense">
              <i className="fas fa-receipt"></i>
              <span>Add Expense</span>
            </div>
            <div className="action-button generate-report">
              <i className="fas fa-chart-bar"></i>
              <span>Generate Report</span>
            </div>
            <div className="action-button manage-clients">
              <i className="fas fa-user-friends"></i>
              <span>Manage Clients</span>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="bottom-sections">
          {/* Client Information */}
          <div className="client-section">
            <div className="section-header">Client Information</div>
            <div className="client-list">
              <div className="client-item">
                <div className="client-avatar">AB</div>
                <div className="client-details">
                  <div className="client-name">ABC Company</div>
                  <div className="client-email">contact@abccompany.com</div>
                </div>
                <div className="client-balance">$12,500</div>
              </div>
              <div className="client-item">
                <div className="client-avatar">XY</div>
                <div className="client-details">
                  <div className="client-name">XYZ Corp</div>
                  <div className="client-email">info@xyzcorp.com</div>
                </div>
                <div className="client-balance">$8,300</div>
              </div>
              <div className="client-item">
                <div className="client-avatar">GT</div>
                <div className="client-details">
                  <div className="client-name">Global Tech</div>
                  <div className="client-email">hello@globaltech.com</div>
                </div>
                <div className="client-balance">$15,750</div>
              </div>
            </div>
          </div>

          {/* AI Insights & Recommendations */}
          <div className="ai-section">
            <div className="section-header">AI Insights & Recommendations</div>
            <div className="ai-content">
              <div className="ai-item">
                <div className="ai-icon alert-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="ai-details">
                  <div className="ai-title">Cash Flow Alert</div>
                  <div className="ai-desc">Your cash flow projection shows a potential shortfall in the next 30 days. Consider following up with clients who have overdue invoices.</div>
                </div>
              </div>
              <div className="ai-item">
                <div className="ai-icon opportunity-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="ai-details">
                  <div className="ai-title">Revenue Opportunity</div>
                  <div className="ai-desc">Based on historical data, Q3 is typically your strongest quarter. Consider increasing marketing efforts to maximize revenue.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookkeeperDashboard;