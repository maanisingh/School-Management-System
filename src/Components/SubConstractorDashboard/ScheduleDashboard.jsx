import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Navbar, Nav } from 'react-bootstrap';
import { FaExclamationTriangle, FaDollarSign, FaFileAlt, FaUserTie, FaCalendarAlt, FaEdit, FaCommentAlt, FaInfoCircle } from 'react-icons/fa';

const ScheduleDashboard = () => {

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



    const scheduleData = [
        {
            id: 1,
            title: "Electrical Rough-in - Units 12-14",
            location: "South Shore Estates",
            date: "1/18/2024",
            time: "8:00 AM - 4:00 PM",
            status: "CONFIRMED",
            statusVariant: "success"
        },
        {
            id: 2,
            title: "Electrical Rough-in - Units 12-14",
            location: "South Shore Estates",
            date: "1/18/2024",
            time: "8:00 AM - 4:00 PM",
            status: "PENDING CONFIRMATION",
            statusVariant: "secondary"
        }
    ];

    const aiInsights = [
        {
            type: "Quality Risk",
            level: "HIGH",
            message: "Weather conditions may impact concrete",
            action: "View Details",
            variant: "danger"
        },
        {
            type: "Deposits",
            level: "MEDIUM",
            message: "$24K in client deposits expected",
            action: "Process",
            variant: "warning"
        },
        {
            type: "Documents",
            level: "NEW",
            message: "3 permit applications require",
            action: "Review",
            variant: "info"
        }
    ];

    return (
        <div className="">
            {/* My Schedule Header */}
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
            <h5 className="mb-4">My Schedule</h5>

            {/* Schedule Cards */}
            {scheduleData.map((item) => (
                <Card key={item.id} className="mb-4 shadow-sm border rounded">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h6 className="mb-1">{item.title}</h6>
                                <small className="text-muted">{item.location}</small>
                            </div>
                            <Badge bg={item.statusVariant} className="px-3 py-1">
                                {item.status}
                            </Badge>
                        </div>

                        {/* Date & Time */}
                        <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                                <FaCalendarAlt className="me-2 text-muted" />
                                <span><strong>Date:</strong> {item.date}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <FaCalendarAlt className="me-2 text-muted" />
                                <span><strong>Time:</strong> {item.time}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" size="sm">
                                <FaEdit className="me-1" /> Request change
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                                <FaCommentAlt className="me-1" /> Add comment
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}

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

export default ScheduleDashboard;