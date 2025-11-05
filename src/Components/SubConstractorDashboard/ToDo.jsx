import React from 'react';
import './ToDo.css';
import { FaExclamationTriangle, FaDollarSign, FaFileAlt } from "react-icons/fa";

const ToDo = () => {
  const todos = [
    {
      id: 1,
      title: "Electrical Rough-in - Units 12-14",
      location: "South Shore Estates",
      assignedBy: "Sarah Johnson",
      dueDate: "1/18/2024",
      priority: "HIGH",
      status: "IN PROGRESS"
    },
    {
      id: 2,
      title: "Electrical Rough-in - Units 12-14",
      location: "South Shore Estates",
      assignedBy: "Sarah Johnson",
      dueDate: "1/18/2024",
      priority: "MEDIUM",
      status: "IN PROGRESS"
    },
    {
      id: 3,
      title: "Electrical Rough-in - Units 12-14",
      location: "South Shore Estates",
      assignedBy: "Sarah Johnson",
      dueDate: "1/18/2024",
      priority: "LOW",
      status: "IN PROGRESS"
    }
  ];

  const insights = [
    {
      id: 1,
      type: "Quality Risk",
      badge: "HIGH",
      badgeColor: "#ff4444",
      description: "Weather conditions may impact concrete...",
      action: "View Details",
      icon: "⚠️"
    },
    {
      id: 2,
      type: "Deposits",
      badge: "MEDIUM",
      badgeColor: "#4CAF50",
      description: "$224k in client deposits expected",
      action: "Process",
      icon: "✓"
    },
    {
      id: 3,
      type: "Documents",
      badge: "NEW",
      badgeColor: "#2196F3",
      description: "3 permit applications require",
      action: "Review",
      icon: "📄"
    }
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'tdui-priority-high';
      case 'MEDIUM':
        return 'tdui-priority-medium';
      case 'LOW':
        return 'tdui-priority-low';
      default:
        return '';
    }
  };

  const insightsData = [
    {
      id: 1,
      icon: <FaExclamationTriangle className="text-red-500" />,
      type: "Quality Risk",
      badge: "HIGH",
      badgeColor: "#FEE2E2",
      description: "Weather conditions may impact concrete",
      action: "View Details",
    },
    {
      id: 2,
      icon: <FaDollarSign className="text-green-500" />,
      type: "Deposits",
      badge: "MEDIUM",
      badgeColor: "#DCFCE7",
      description: "$245k in client deposits expected",
      action: "Process",
    },
    {
      id: 3,
      icon: <FaFileAlt className="text-blue-500" />,
      type: "Documents",
      badge: "NEW",
      badgeColor: "#DBEAFE",
      description: "3 permit applications require review",
      action: "Review",
    },
  ];


  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="tdui-header">
          <h1 className="tdui-main-title">My To-Dos</h1>
        </div>

        {/* Todo Cards */}
        <div className="tdui-cards-section">
          {todos.map((todo) => (
            <div key={todo.id} className="tdui-card">
              <div className="tdui-card-header">
                <div className="tdui-card-left">
                  <h3 className="tdui-card-title">{todo.title}</h3>
                  <p className="tdui-card-location">{todo.location}</p>
                  <p className="tdui-card-assigned">Assigned by: {todo.assignedBy}</p>
                </div>
                <div className="tdui-card-right">
                  <span className={`tdui-badge ${getPriorityClass(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  <span className="tdui-badge tdui-status-badge">
                    {todo.status}
                  </span>
                </div>
              </div>
              <div className="tdui-card-footer">
                <span className="tdui-due-date">Due: {todo.dueDate}</span>
                <div className="tdui-card-actions">
                  <button className="tdui-btn tdui-btn-complete">
                    <span className="tdui-checkmark">✓</span> Mark Complete
                  </button>
                  <button className="tdui-btn tdui-btn-edit">
                    ✎
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights Section */}
        <div className="ai-insights-section">
          <div className="ai-insights-header">
            <div className="ai-insights-title-wrapper">
              <span className="ai-bulb-icon">💡</span>
              <h2 className="ai-insights-title">AI Insights & Recommendations</h2>
            </div>
            <button className="ai-view-all-btn">View All</button>
          </div>

          <div className="ai-insights-cards">
            {insightsData.map((insight) => (
              <div key={insight.id} className="ai-insight-card">
                <div className="ai-insight-icon">{insight.icon}</div>
                <div className="ai-insight-content">
                  <div className="ai-insight-header-row">
                    <span className="ai-insight-type">{insight.type}</span>
                    <span
                      className="ai-insight-badge"
                      style={{ backgroundColor: insight.badgeColor }}
                    >
                      {insight.badge}
                    </span>
                  </div>
                  <p className="ai-insight-description">{insight.description}</p>
                </div>
                <button className="ai-insight-action">{insight.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;