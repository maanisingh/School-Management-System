import React from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Alert, Table, Form } from 'react-bootstrap';
import {
  FaChevronLeft, FaChevronRight,
FaExclamationTriangle, FaDollarSign, FaFileAlt,
  FaUserTie, FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaPhone, FaClock, FaEye, FaEnvelope, FaInfoCircle, FaArrowUp, FaShoppingCart, FaCalendarPlus, FaCheck
} from 'react-icons/fa';
import { useState } from "react";
const SubContractorDashboard = () => {

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





  const [hover, setHover] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = endOfMonth.getDate();

  const firstDayIndex = startOfMonth.getDay(); // 0=Sun, 1=Mon...
  const weeks = [];
  let day = 1;

  for (let i = 0; i < 6; i++) { // max 6 rows
    const days = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayIndex) {
        days.push(null);
      } else if (day > daysInMonth) {
        days.push(null);
      } else {
        days.push(day);
        day++;
      }
    }
    weeks.push(days);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();
  return (
    <div className="">
      {/* Top Header */}
      <Card className="mb-4" style={{ backgroundColor: '#FFF8E1', border: 'none' }}>
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className=" text-white rounded-3 p-2 me-3" style={{ backgroundColor: '#ea580c' }}>
              <FaUserTie />
            </div>
            <span className="fw-bold">Subcontractor</span>
          </div>
          <select className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300">
            <option>Filter</option>
            <option>All Projects</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </Card.Body>
      </Card>

      {/* Stats Cards Row */}
      <Row className="g-3 mb-4">
        {[
          { title: 'Assigned Jobs', value: '3', icon: FaUserTie, color: '#4F46E5', change: '+11.01%' },
          { title: 'Active To-Dos', value: '8', icon: FaCheckCircle, color: '#10B981', change: '+11.01%' },
          { title: 'Pending RFIs', value: '2', icon: FaExclamationCircle, color: '#F59E0B', change: '+11.01%' },
          { title: 'Upcoming', value: '5', icon: FaCalendarAlt, color: '#6B7280', change: '+11.01%' },
          { title: 'Pending POs', value: '1', icon: FaShoppingCart, color: '#EF4444', change: '+11.01%' },
          { title: 'Completed', value: '12', icon: FaCheck, color: '#10B981', change: '+11.01%' }
        ].map((stat, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <Card className="border-0 h-100 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="bg-light p-2 me-3 d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: "50%",
                      width: "40px",   // aap apni zarurat ke hisaab se size change kar sakte ho
                      height: "40px"
                    }}
                  >
                    <stat.icon color={stat.color} />
                  </div>
                  <div className="flex-grow-1">
                    <Card.Title className="mb-0 fs-6">{stat.title}</Card.Title>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="mb-0 fw-bold">{stat.value}</h4>
                  <div className="d-flex align-items-center">
                    <span className="text-success small">{stat.change}</span>
                    <FaArrowUp className="ms-1 text-success" size={12} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content */}
      <Row className="g-4">
        {/* My Assigned Jobs */}
        <Col lg={7}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white border-0 pb-0">
              <h5 className="mb-0">My Assigned Jobs</h5>
            </Card.Header>
            <Card.Body>
              {[
                {
                  project: 'South Shore Estates - Phase 2',
                  address: '123 Lakefront Dr, Chestermere',
                  progress: 65,
                  tasks: 4,
                  pm: 'Sarah Johnson',
                  phone: '(403) 555-0123',
                  deadline: '1/18/2024'
                },
                {
                  project: 'South Shore Estates - Phase 2',
                  address: '123 Lakefront Dr, Chestermere',
                  progress: 65,
                  tasks: 4,
                  pm: 'Sarah Johnson',
                  phone: '(403) 555-0123',
                  deadline: '1/18/2024'
                }
              ].map((job, index) => (
                <Card className="mb-4" key={index} style={{ borderRadius: '12px' }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h6 className="mb-1 fw-bold">{job.project}</h6>
                        <small className="text-muted">{job.address}</small>
                      </div>
                      <Badge bg="light" text="dark" className="ms-2">4 tasks</Badge>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="small">Progress</span>
                        <span className="small fw-bold">{job.progress}%</span>
                      </div>

                      <div
                        className="progress mb-2"
                        style={{
                          backgroundColor: "#9810fa",  // baki ka color
                          height: "10px",               // height adjust kar sakte ho
                          borderRadius: "8px",          // rounded corners optional
                          overflow: "hidden"
                        }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${job.progress}%`,
                            backgroundColor: "orange"  // fill color
                          }}
                        />
                      </div>
                    </div>


                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaUserTie className="me-2 text-muted" />
                        <span className="small">PM: {job.pm}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaPhone className="me-2 text-muted" />
                        <span className="small">{job.phone}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaClock className="me-2 text-muted" />
                        <span className="small">Next deadline: {job.deadline}</span>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button variant="outline-dark" size="sm" className="d-flex align-items-center">
                        <FaEye className="me-1" /> View details
                      </Button>
                      <Button
                        size="sm"
                        className="d-flex align-items-center"

                        style={{
                          border: "1px solid #9810fa",
                          color: hover ? "white" : "#9810fa",
                          backgroundColor: hover ? "#9810fa" : "transparent",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <FaEnvelope className="me-1" /> Message PM
                      </Button>

                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col lg={5}>
          {/* Urgent Items */}
          <Card className="shadow-sm mb-4" style={{ borderRadius: '12px' }}>
            <Card.Header className="bg-white border-0 pb-0">
              <h5 className="mb-0">Urgent Items</h5>
            </Card.Header>
            <Card.Body>
              {[
                {
                  type: 'High Priority RFI',
                  description: 'Panel location conflict needs response',
                  action: 'Respond',
                  variant: 'danger',
                  icon: FaExclamationCircle
                },
                {
                  type: 'Schedule Confirmation',
                  description: 'Final inspection needs confirmation',
                  action: 'Confirm',
                  variant: 'warning',
                  icon: FaCalendarPlus
                },
                {
                  type: 'Payment Request',
                  description: 'PO-2024-0156 ready for payment request',
                  action: 'Request',
                  variant: 'info',
                  icon: FaInfoCircle
                }
              ].map((item, index) => (
                <Alert
                  key={index}
                  variant={item.variant}
                  className="d-flex align-items-center justify-content-between mb-3"
                  style={{ borderRadius: '12px' }}
                >
                  <div className="d-flex align-items-center">
                    <item.icon className={`me-3 ${item.variant === 'danger' ? 'text-danger' : item.variant === 'warning' ? 'text-warning' : 'text-info'}`} />
                    <div>
                      <strong>{item.type}</strong>
                      <div className="small mt-1">{item.description}</div>
                    </div>
                  </div>
                  <Button variant={item.variant === 'danger' ? 'dark' : item.variant === 'warning' ? 'warning' : 'info'} size="sm">
                    {item.action}
                  </Button>
                </Alert>
              ))}
            </Card.Body>
          </Card>

          {/* Calendar */}
          <div style={{
            width: "auto",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white"
          }}>
            {/* Header */}
            <span className="flex items-center justify-between mb-3">
              {/* Left Section: Calendar Icon + Subtitle */}
              <span className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center p-2 bg-white rounded-5 border border-gray-200 shadow-sm">
                  <FaCalendarAlt className="h-6 w-6 text-primary" />
                </span>
              </span>

              {/* Middle Section: Month/Year */}
              <span>
                <span className="text-2xl ms-3 fw-bold">September 2025</span>
                <div className="text-sm ms-5 text-gray-600">Project schedule overview</div>

                  {/* Right Section: Icons + Navigation Arrows */}
              <span className="flex items-center gap-2">
                <img
                  src="https://placehold.co/24x24"
                  alt="Google Calendar icon"
                  className="h-6 w-6"
                />
                <button
                  onClick={prevMonth}
                  className="btn btn-light hover:text-gray-600 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextMonth}
                  className="btn btn-light hover:text-gray-600 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </span>
              </span>

            
            </span>

            {/* Weekdays */}
            <div className="d-flex justify-content-between text-center mb-2" style={{ fontSize: "12px", color: "#555" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div style={{ width: "40px" }} key={d}>{d}</div>
              ))}
            </div>

            {/* Dates */}
            {weeks.map((week, i) => (
              <div className="d-flex justify-content-between mb-1" key={i}>
                {week.map((dayNum, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      backgroundColor: dayNum === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() ? "#9810fa" : "transparent",
                      color: dayNum === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() ? "white" : "#000"
                    }}
                  >
                    {dayNum}
                  </div>
                ))}
              </div>
            ))}
          </div>


        </Col>
      </Row>

      {/* AI Insights & Recommendations */}
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
  );
};

export default SubContractorDashboard;