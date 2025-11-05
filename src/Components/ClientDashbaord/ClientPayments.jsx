import React from 'react';
import { Home } from "lucide-react";
import './ClientPayments.css';

const ClientPayments = () => {
  const invoices = [
    {
      id: 1,
      title: "Phase 1 - Foundation & Framing",
      description: "Foundation complete, framing 80% complete",
      phase: "Foundation & framing",
      dueDate: "1/25/2024",
      amount: "$25,000",
      status: "due"
    },
    {
      id: 2,
      title: "Phase 1 - Foundation & Framing",
      description: "Foundation complete, framing 80% complete",
      phase: "Foundation & framing",
      dueDate: "1/25/2024",
      amount: "$25,000",
      status: "due"
    },
    {
      id: 3,
      title: "Phase 1 - Foundation & Framing",
      description: "Foundation complete, framing 80% complete",
      phase: "Foundation & framing",
      dueDate: "1/25/2024",
      amount: "$25,000",
      status: "due"
    }
  ];

  const changeOrders = [
    {
      id: 1,
      title: "Additional Electrical Outlet in Master Bedroom",
      description: "Add outlet for bedside lighting and charging station",
      phase: "Foundation & framing",
      dueDate: "1/25/2024",
      amount: "$25,000",
      status: "pending"
    },
    {
      id: 2,
      title: "Additional Electrical Outlet in Master Bedroom",
      description: "Add outlet for bedside lighting and charging station",
      phase: "Foundation & framing",
      dueDate: "1/25/2024",
      amount: "$25,000",
      status: "pending"
    }
  ];

  return (
    <div className="ipui-wrapper">

              {/* Header */}
              <div className="cdash-header-section">
                <div className="cdash-container">
                  <div className="cdash-brand-logo ms-4">
                    <Home
                      size={23}
                      style={{
                        backgroundColor: "#2cc9d7",
                        color: "white",
                        padding: "5px",
                        borderRadius: "7px",
                      }}
                    />
                    <span>Client Home owner</span>
                  </div>
                </div>
              </div>
      <div className="ipui-container">
        {/* Invoices Section */}
        <div className="ipui-section-header">
          <h2 className="ipui-section-title">Invoices & Payments</h2>
        </div>

        {invoices.map((invoice) => (
          <div key={invoice.id} className="ipui-card">
            <div className="ipui-card-content">
              <div className="ipui-left-section">
                <div className="ipui-header-row">
                  <h3 className="ipui-title">{invoice.title}</h3>
                  <div className="ipui-amount-mobile">{invoice.amount}</div>
                </div>
                <p className="ipui-description">{invoice.description}</p>
                <div className="ipui-meta">
                  <span className="ipui-meta-item">Phase: {invoice.phase}</span>
                  <span className="ipui-meta-item">Due: {invoice.dueDate}</span>
                </div>
              </div>
              <div className="ipui-right-section">
                <div className="ipui-amount-desktop">{invoice.amount}</div>
                <span className="ipui-badge ipui-badge-danger">Due now</span>
                <div className="ipui-actions">
                  <button className="ipui-btn ipui-btn-warning">
                    💳 Pay now
                  </button>
                  <button className="ipui-btn ipui-btn-outline">
                    ⬇ Download
                  </button>
                  <button className="ipui-btn ipui-btn-outline">
                    👁 View details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Change Orders Section */}
        <div className="ipui-section-header ipui-section-spacing">
          <h2 className="ipui-section-title">Change Orders</h2>
        </div>

        {changeOrders.map((order) => (
          <div key={order.id} className="ipui-card">
            <div className="ipui-card-content">
              <div className="ipui-left-section">
                <div className="ipui-header-row">
                  <h3 className="ipui-title">{order.title}</h3>
                  <div className="ipui-amount-mobile">{order.amount}</div>
                </div>
                <p className="ipui-description">{order.description}</p>
                <div className="ipui-meta">
                  <span className="ipui-meta-item">Phase: {order.phase}</span>
                  <span className="ipui-meta-item">Due: {order.dueDate}</span>
                </div>
              </div>
              <div className="ipui-right-section">
                <div className="ipui-amount-desktop">{order.amount}</div>
                <span className="ipui-badge ipui-badge-warning">Pending approval</span>
                <div className="ipui-actions">
                  <button className="ipui-btn ipui-btn-success">
                    ✓ Approve (e-sign)
                  </button>
                  <button className="ipui-btn ipui-btn-outline">
                    ⬇ Download PDF
                  </button>
                  <button className="ipui-btn ipui-btn-outline-danger">
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPayments;