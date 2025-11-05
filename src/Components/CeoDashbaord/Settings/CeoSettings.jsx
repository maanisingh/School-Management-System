import React from "react";

import "./CeoSettings.css";

const CeoSettings = () => {
  return (
    <div className="container-fluid py-4 settings-dashboard">
      <div className="row">
        {/* Left Section - Internal Users and Roles */}
        <div className="col-lg-6 mb-4">
          <h5 className="fw-bold mb-3">Internal Users and Roles</h5>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">Email Notifications</h6>
              <p className="text-muted mb-0">System-wide email settings</p>
            </div>
            <button className="btn btn-warning fw-semibold">Configure</button>
          </div>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">WhatsApp Integration</h6>
              <p className="text-muted mb-0">Business messaging setup</p>
            </div>
            <button className="btn btn-warning fw-semibold">Setup</button>
          </div>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">QuickBooks Integration</h6>
              <p className="text-muted mb-0">Accounting system sync</p>
            </div>
            <button className="btn btn-warning fw-semibold">Setup</button>
          </div>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">File Storage</h6>
              <p className="text-muted mb-0">Documents and photo storage</p>
            </div>
            <button className="btn btn-warning fw-semibold">Manage</button>
          </div>
        </div>

        {/* Right Section - Security Settings */}
        <div className="col-lg-6 mb-4">
          <h5 className="fw-bold mb-3">Security Settings</h5>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">Two-Factor Authentication</h6>
              <p className="text-muted mb-0">Enhanced security for all users</p>
            </div>
            <span className="badge bg-purple px-3 py-2 fw-semibold">Enabled</span>
          </div>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">Password Policy</h6>
              <p className="text-muted mb-0">Minimum Requirements</p>
            </div>
            <button className="btn btn-warning fw-semibold">Edit</button>
          </div>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">Fiscal Year</h6>
              <p className="text-muted mb-0">Reports based on Fiscal Year</p>
            </div>
            <button className="btn btn-warning fw-semibold">Edit</button>
          </div>

          <div className="card-box p-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">Session Timeout</h6>
              <p className="text-muted mb-0">Auto-Logout settings</p>
            </div>
            <span className="fw-semibold">4 Hours</span>
          </div>
        </div>
      </div>

 {/* AI Insights & Recommendations */}
<div className="mt-4 insights-section">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h6 className="fw-bold mb-0">
      <i className="bi bi-lightbulb-fill text-primary me-2"></i>
      AI Insights & Recommendations
    </h6>
    <a href="#" className="text-primary fw-semibold small">View All</a>
  </div>

  <div className="row gy-3 gx-3">
    {/* Quality Risk */}
    <div className="col-md-4">
      <div className="insight-card d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="icon-circle bg-light-danger me-2">
            <i className="bi bi-exclamation-triangle text-danger"></i>
          </div>
          <div>
            <div className="d-flex align-items-center mb-1">
              <span className="fw-semibold me-2">Quality Risk</span>
              <span className="status-badge bg-light-danger text-danger fw-semibold">
                HIGH
              </span>
            </div>
            <small className="text-muted">
              Weather conditions may impact concrete
            </small>
          </div>
        </div>
        <a href="#" className="text-primary fw-semibold small">View Details</a>
      </div>
    </div>

    {/* Deposits */}
    <div className="col-md-4">
      <div className="insight-card d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="icon-circle bg-light-success me-2">
            <i className="bi bi-cash-stack text-success"></i>
          </div>
          <div>
            <div className="d-flex align-items-center mb-1">
              <span className="fw-semibold me-2">Deposits</span>
              <span className="status-badge bg-light-success text-success fw-semibold">
                MEDIUM
              </span>
            </div>
            <small className="text-muted">$245k in client deposits expected</small>
          </div>
        </div>
        <a href="#" className="text-primary fw-semibold small">Process</a>
      </div>
    </div>

    {/* Documents */}
    <div className="col-md-4">
      <div className="insight-card d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="icon-circle bg-light-primary me-2">
            <i className="bi bi-file-earmark-text text-primary"></i>
          </div>
          <div>
            <div className="d-flex align-items-center mb-1">
              <span className="fw-semibold me-2">Documents</span>
              <span className="status-badge bg-light-primary text-primary fw-semibold">
                NEW
              </span>
            </div>
            <small className="text-muted">3 permit applications require</small>
          </div>
        </div>
        <a href="#" className="text-primary fw-semibold small">Review</a>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default CeoSettings;
