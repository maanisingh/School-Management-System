import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Home } from 'lucide-react';
import './ClientSelections.css';

const ClientSelections = () => {
  const [selections] = useState([
    {
      id: 1,
      title: 'Kitchen Cabinets',
      description: 'Cabinet style, color, and hardware selection',
      allowanceUsed: 65,
      dueDate: '2/1/2024',
      priority: 'HIGH',
      status: 'DUE SOON'
    },
    {
      id: 2,
      title: 'Kitchen Cabinets',
      description: 'Cabinet style, color, and hardware selection',
      allowanceUsed: 65,
      dueDate: '2/1/2024',
      priority: 'HIGH',
      status: 'DUE SOON'
    },
    {
      id: 3,
      title: 'Kitchen Cabinets',
      description: 'Cabinet style, color, and hardware selection',
      allowanceUsed: 65,
      dueDate: '2/1/2024',
      priority: 'HIGH',
      status: 'DUE SOON'
    }
  ]);

  return (
    <div className="selections-dashboard-wrapper">

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

      <div className="selections-dashboard-container">
        {/* Header */}
        <div className="selections-dashboard-header">
          <h1 className="selections-dashboard-title">Your Selections</h1>
          <button className="selections-dashboard-filter-btn">
            <SlidersHorizontal size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* Selection Cards */}
        {selections.map((selection) => (
          <div key={selection.id} className="selections-dashboard-card">
            {/* Card Header */}
            <div className="selections-dashboard-card-header">
              <div className="selections-dashboard-card-left">
                <h2 className="selections-dashboard-card-title">
                  {selection.title}
                </h2>
                <p className="selections-dashboard-card-description">
                  {selection.description}
                </p>
              </div>
              <div className="selections-dashboard-badges">
                <span className="selections-dashboard-badge selections-dashboard-badge-high">
                  {selection.priority}
                </span>
                <span className="selections-dashboard-badge selections-dashboard-badge-due">
                  {selection.status}
                </span>
              </div>
            </div>

            {/* Allowance Progress */}
            <div className="selections-dashboard-allowance">
              <div className="selections-dashboard-allowance-header">
                <p className="selections-dashboard-allowance-label">
                  Allowance Used
                </p>
                <span className="selections-dashboard-allowance-value">
                  {selection.allowanceUsed}%
                </span>
              </div>
              <div className="selections-dashboard-progress-wrapper">
                <div
                  className="selections-dashboard-progress-bar selections-dashboard-progress-yellow"
                  style={{ width: '65%' }}
                />
                <div
                  className="selections-dashboard-progress-bar selections-dashboard-progress-purple"
                  style={{ width: '35%', left: '65%' }}
                />
              </div>
            </div>

            {/* Card Footer */}
            <div className="selections-dashboard-card-footer">
              <div className="selections-dashboard-due-date">
                Due: {selection.dueDate}
              </div>
              <div className="selections-dashboard-actions">
                <button className="selections-dashboard-btn selections-dashboard-btn-approve">
                  Approve
                </button>
                <button className="selections-dashboard-btn selections-dashboard-btn-question">
                  Ask Question
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSelections;