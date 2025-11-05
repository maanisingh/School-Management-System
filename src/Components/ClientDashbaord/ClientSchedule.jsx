import React, { useState } from "react";
import { Eye, Mail, Clock, User, Home } from "lucide-react";
import "./ClientSchedule.css";

const ClientSchedule = () => {
  const [scheduleItems] = useState([
    {
      id: 1,
      title: "Electrical Rough-In",
      description: "Install electrical wiring and outlets",
      contractor: "Lightning Electric",
      duration: "3 days",
      date: "2/20/2024",
      status: "starting soon",
    },
    {
      id: 2,
      title: "Electrical Rough-In",
      description: "Install electrical wiring and outlets",
      contractor: "Lightning Electric",
      duration: "3 days",
      date: "2/20/2024",
      status: "starting soon",
    },
    {
      id: 3,
      title: "Electrical Rough-In",
      description: "Install electrical wiring and outlets",
      contractor: "Lightning Electric",
      duration: "3 days",
      date: "2/20/2024",
      status: "starting soon",
    },
  ]);

  return (
    <div className="projsched-main-wrapper">
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

      <div className="projsched-container">
        <h1 className="projsched-header-title">Project Schedule</h1>

        {scheduleItems.map((item) => (
          <div key={item.id} className="projsched-card">
            {/* Card Header */}
            <div className="projsched-card-header">
              <div className="projsched-card-left">
                <h2 className="projsched-card-title">{item.title}</h2>
                <p className="projsched-card-description">{item.description}</p>
              </div>
              <div className="projsched-card-right">
                <span className="projsched-date">{item.date}</span>
                <span className="projsched-status-badge">{item.status}</span>
              </div>
            </div>

            {/* Card Info */}
            <div className="projsched-card-info">
              <div className="projsched-info-item">
                <User size={18} className="projsched-info-icon" />
                <span>Contractor: {item.contractor}</span>
              </div>
              <div className="projsched-info-item">
                <Clock size={18} className="projsched-info-icon" />
                <span>Duration: {item.duration}</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="projsched-card-actions">
              <button className="projsched-btn projsched-btn-view">
                <Eye size={18} />
                <span>View details</span>
              </button>
              <button className="projsched-btn projsched-btn-message">
                <Mail size={18} />
                <span>Message PM</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSchedule;
