import React, { useState } from "react";
import { Home, Search } from "lucide-react";
import { Card, Button, Badge, Image } from "react-bootstrap";
import {
  FaClock,
  FaUser,
  FaHome,
  FaWhatsapp,
  FaEye,
  FaDownload,
  FaComment,
  FaHeart,
  FaShare,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./ClientDashboard.css";

const ClientDashbaord = () => {
  const [activeTab, setActiveTab] = useState("Today");

  const projects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      title: "Modern Family Home",
      location: "San Francisco, CA",
      status: "In Progress",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
      title: "Victorian Renovation",
      location: "Boston, MA",
      status: "Planning",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
      title: "Coastal Dream Home",
      location: "Miami, FL",
      status: "Review",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
      title: "Roof Installation",
      location: "Seattle, WA",
      status: "Active",
    },
  ];

  const documents = [
    {
      id: 1,
      name: "Construction Contract",
      date: "Updated 2 days ago",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Selection Worksheet",
      date: "Selection • #781 / 03/08/25",
      size: "1.2 MB",
    },
    {
      id: 3,
      name: "Change Order #001",
      date: "Change Order | $2,784 | 03/08/25",
      size: "856 KB",
    },
  ];

  const buildFeed = [
    {
      id: 1,
      title: "Framing Complete",
      date: "1/08/2024",
      description:
        "All structural framing completed and inspected. Ready for electrical rough-in.",
      author: "Tom Chen – Site Foreman",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      ],
    },
    {
      id: 2,
      title: "Roofing Complete",
      date: "1/07/2024",
      description:
        "All roofing completed and inspected. Ready for electrical rough-in.",
      author: "Tom Chen – Site Foreman",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      ],
    },
  ];

  // ✅ Function to get milestones data
  const getMilestones = () => [
    {
      id: 1,
      name: "Electrical Rough-In",
      date: "2/20/2024",
      status: "coming soon",
    },
    {
      id: 2,
      name: "Plumbing Rough-In",
      date: "2/20/2024",
      status: "scheduled",
    },
    {
      id: 3,
      name: "Insulation & Drywall",
      date: "2/20/2024",
      status: "scheduled",
    },
    { id: 4, name: "Sound Proofing", date: "2/20/2024", status: "scheduled" },
    { id: 5, name: "Milestone Name", date: "2/20/2024", status: "scheduled" },
    { id: 6, name: "Milestone name", date: "2/20/2024", status: "scheduled" },
  ];

  // ✅ Function to get team contacts data
  const getTeamContacts = () => [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Manager",
      avatar: "https://i.ibb.co/xq1SgjKS/Ellipse-5-3.png",
    },
    {
      id: 2,
      name: "Samantha",
      role: "Sales Manager",
      avatar: "https://i.ibb.co/xq1SgjKS/Ellipse-5-3.png",
    },
    {
      id: 3,
      name: "Karen Davis",
      role: "Sub Contractor",
      avatar: "https://i.ibb.co/xq1SgjKS/Ellipse-5-3.png",
    },
    {
      id: 4,
      name: "Laura Miller",
      role: "Bookkeeper",
      avatar: "https://i.ibb.co/xq1SgjKS/Ellipse-5-3.png",
    },
  ];

  const milestonesData = getMilestones();
  const contactsData = getTeamContacts();

  return (
    <div className="cdash-main-wrapper">
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

      <div className="cdash-container">
        {/* Projects Grid */}
        <div className="cdash-projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="cdash-project-card">
              <img
                src={project.image}
                alt={project.title}
                className="cdash-project-img"
              />
              <div className="cdash-project-overlay">
                <div className="cdash-project-title">{project.title}</div>
                <div className="cdash-project-location">{project.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cdash-main-content">
          {/* Left Column - High Priority Tasks */}
          <div className="cdash-column border border-warning rounded-3 p-3">
            <div className="cdash-section-header">
              <h5 className="cdash-section-title text-warning">
                High Priority
              </h5>
            </div>

            <div className="cdash-search-wrapper">
              <Search size={18} className="cdash-search-icon" />
              <input
                type="text"
                className="cdash-search-input"
                placeholder="Search tasks, clients..."
              />
            </div>

            <Card className="shadow-sm border-0 rounded-4 p-3">
              <div className="cdash-tabs-wrapper">
                <button
                  className={`cdash-tab-btn ${
                    activeTab === "Today" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("Today")}
                >
                  Today
                </button>
                <button
                  className={`cdash-tab-btn ${
                    activeTab === "Week" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("Week")}
                >
                  Week
                </button>
              </div>

              <div className="border p-2 rounded-3">
                {/* Title + Urgent Badge */}
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <h6 className="fw-bold mb-0">Foundation Inspection</h6>
                    <small className="text-muted">
                      City inspector arrives at 10:30 AM
                    </small>
                  </div>
                  <Badge bg="danger" className="rounded-pill px-2 py-1">
                    URGENT
                  </Badge>
                </div>

                {/* Details Section */}
                <div className="mt-3">
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaClock className="me-2 text-dark" />
                    <small>10:30 AM</small>
                  </div>
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaUser className="me-2 text-dark" />
                    <small>Chen Family</small>
                  </div>
                  <div className="d-flex align-items-center mb-3 text-muted">
                    <FaHome className="me-2 text-dark" />
                    <small>Waterfront Custom</small>
                  </div>
                  <small className="text-muted">
                    Assigned by: <span className="fw-semibold">Mike Chen</span>
                  </small>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp
                  </Button>
                  <Button variant="dark" size="sm">
                    VIEW
                  </Button>
                </div>
              </div>

              <div className="border p-2 rounded-3 mt-3">
                {/* Title + Urgent Badge */}
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <h6 className="fw-bold mb-0">Foundation Inspection</h6>
                    <small className="text-muted">
                      City inspector arrives at 10:30 AM
                    </small>
                  </div>
                  <Badge bg="danger" className="rounded-pill px-2 py-1">
                    URGENT
                  </Badge>
                </div>

                {/* Details Section */}
                <div className="mt-3">
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaClock className="me-2 text-dark" />
                    <small>10:30 AM</small>
                  </div>
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaUser className="me-2 text-dark" />
                    <small>Chen Family</small>
                  </div>
                  <div className="d-flex align-items-center mb-3 text-muted">
                    <FaHome className="me-2 text-dark" />
                    <small>Waterfront Custom</small>
                  </div>
                  <small className="text-muted">
                    Assigned by: <span className="fw-semibold">Mike Chen</span>
                  </small>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp
                  </Button>
                  <Button variant="dark" size="sm">
                    VIEW
                  </Button>
                </div>
              </div>

              <div className="border p-2 rounded-3 mt-3">
                {/* Title + Urgent Badge */}
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <h6 className="fw-bold mb-0">Foundation Inspection</h6>
                    <small className="text-muted">
                      City inspector arrives at 10:30 AM
                    </small>
                  </div>
                  <Badge bg="danger" className="rounded-pill px-2 py-1">
                    URGENT
                  </Badge>
                </div>

                {/* Details Section */}
                <div className="mt-3">
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaClock className="me-2 text-dark" />
                    <small>10:30 AM</small>
                  </div>
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <FaUser className="me-2 text-dark" />
                    <small>Chen Family</small>
                  </div>
                  <div className="d-flex align-items-center mb-3 text-muted">
                    <FaHome className="me-2 text-dark" />
                    <small>Waterfront Custom</small>
                  </div>
                  <small className="text-muted">
                    Assigned by: <span className="fw-semibold">Mike Chen</span>
                  </small>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp
                  </Button>
                  <Button variant="dark" size="sm">
                    VIEW
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column - Project Documents */}
          <div className="p-3 bg-white rounded-4 shadow-sm">
            {/* Project Documents */}
            <h5 className="fw-bold mb-3">Project Documents</h5>

            {documents.map((doc) => (
              <div
                key={doc.id}
                className="d-flex justify-content-between align-items-center border rounded-3 p-2 mb-4"
              >
                <div className="d-flex align-items-center">
                  <div
                    className="me-2 d-flex justify-content-center align-items-center bg-light rounded"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <div>
                    <div className="fw-semibold small">{doc.name}</div>
                    <div className="text-muted small">
                      {doc.size} | {doc.date}
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-1 rounded-3"
                  >
                    <FaEye size={12} />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-3"
                  >
                    <FaDownload size={12} />
                  </Button>
                </div>
              </div>
            ))}

            {/* Build Feed */}
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Build Feed</h6>

              {buildFeed.map((feed) => (
                <Card
                  key={feed.id}
                  className="border-0 shadow-sm rounded-4 mb-3"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-semibold">{feed.title}</span>
                      <small className="text-muted">{feed.date}</small>
                    </div>
                    <p className="text-muted small mb-1">{feed.description}</p>
                    <small className="text-muted">{feed.author}</small>

                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {feed.images.map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          rounded
                          width="95"
                          height="75"
                          style={{ objectFit: "cover" }}
                        />
                      ))}
                    </div>

                    <div className="d-flex align-items-center mt-2 text-muted small gap-3">
                      <span className="d-flex align-items-center gap-1">
                        <FaComment size={12} /> 12
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaHeart size={12} /> 3
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaShare size={12} /> 6
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-4 shadow-sm">
            {/* Upcoming Milestones */}
            <h5 className="fw-bold mb-3">Upcoming Milestones</h5>

            {milestonesData.map((m) => (
              <div
                key={m.id}
                className="d-flex justify-content-between align-items-center border rounded-3 p-2 mb-4"
              >
                <div>
                  <div className="fw-semibold small">{m.name}</div>
                  <div className="text-muted small">{m.date}</div>
                </div>
                <Badge
                  bg={m.status === "coming soon" ? "warning" : "info"}
                  text={m.status === "coming soon" ? "dark" : "white"}
                  className="text-capitalize px-3 py-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  {m.status}
                </Badge>
              </div>
            ))}

            {/* Team Contacts */}
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Team Contacts</h6>

              {contactsData.map((c) => (
                <div
                  key={c.id}
                  className="d-flex justify-content-between align-items-center border rounded-3 p-2 mb-4"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={c.avatar}
                      roundedCircle
                      width={40}
                      height={40}
                      className="me-2"
                    />
                    <div>
                      <div className="fw-semibold small">{c.name}</div>
                      <div className="text-muted small">{c.role}</div>
                    </div>
                  </div>
                  <div className="d-flex gap-1">
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <FaPhoneAlt size={12} />
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <FaEnvelope size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashbaord;
