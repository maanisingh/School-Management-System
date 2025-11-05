import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Form, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faClock,
  faUser,
  faCalendarAlt,
  faSearch,
  faTasks,
  faCheckCircle,
  faEllipsisH,
  faFile,
  faBuilding,
  // Header icon
  // Recent Jobs header icon
  // Project 1 icon
  faDesktop,          // Project 2 icon
  faLayerGroup,       // Project 3 icon
  faFolder,
  faTruck,          // Project 4 icon
  // To Do List search icon
  // To Do List task icon
  // Completed task icon
  // More options icon
  // Calendar header icon

} from '@fortawesome/free-solid-svg-icons';

const OwnerDashboard = () => {
  const recentJobs = [
    { id: 1, name: 'Website Redesign', progress: 75, color: '#9c27b0' },
    { id: 2, name: 'Mobile App Dev', progress: 40, color: '#2196f3' },
    { id: 3, name: 'Logo Design', progress: 100, color: '#4caf50' },
  ];

  const todos = [
    { id: 1, text: 'Review client proposal', completed: false },
    { id: 2, text: 'Schedule team meeting', completed: true },
    { id: 3, text: 'Finalize budget Q4', completed: false },
  ];

  return (
    <div className="">
      {/* HEADER - EXACT MATCH WITH YOUR IMAGE */}
      <div className="d-flex align-items-center p-3 rounded mb-4" style={{
        backgroundColor: '#FFF8E1',
        borderRadius: '16px 16px 0 0',
        border: '1px solid#d6c99d'
      }}>
        <div
          className="d-flex align-items-center justify-content-center text-white rounded me-3"
          style={{
            width: '30',
            height: '30px',
            backgroundColor: '#9C27B0',
            borderRadius: '10px'
          }}
        >
          <FontAwesomeIcon icon={faBriefcase} />
        </div>
        <div>
          <h6 className="mb-0 fw-semibold" style={{ color: '#333' }}>Organization Management</h6>
          f
        </div>
      </div>

      <Row>
        {/* Recent Jobs - EXACT MATCH WITH YOUR IMAGE */}
        <Col md={4} className="mb-4">
          <Card
            className="h-100 shadow-sm"
            style={{ borderRadius: '12px', border: '1px solid #eee' }}
          >
            <Card.Header
              className="d-flex justify-content-between align-items-center"
              style={{ borderRadius: '12px 12px 0 0', padding: '15px 20px' }}
            >
              <div>
                <div className="d-flex align-items-center mb-1">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                    style={{ width: '36px', height: '36px', backgroundColor: '#f0e6ff' }}
                  >
                    <FontAwesomeIcon icon={faClock} className="text-purple" />
                  </div>
                  <div>
                    <Card.Title className="mb-0 fw-bold">Recent Jobs</Card.Title>
                    <small className="text-muted">Track project progress</small>
                  </div>
                </div>
              </div>
              <small className="text-muted">Apr 25</small>
            </Card.Header>

            <Card.Body style={{ padding: '15px 20px' }}>
              {/* Project 1 */}
              <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '30px', height: '30px', backgroundColor: '#e8f5e9' }}
                >
                  <FontAwesomeIcon icon={faFile} className="text-green" />
                </div>
                <div className="flex-grow-1">
                  <span className="fw-medium">Project 1</span>
                </div>
                <span className="fw-bold text-green ms-2">87%</span>
              </div>
              <ProgressBar now={87} variant="success" className="mb-3" style={{ height: '6px' }} />

              {/* Project 2 */}
              <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '30px', height: '30px', backgroundColor: '#e3f2fd' }}
                >
                  <FontAwesomeIcon icon={faDesktop} className="text-blue" />
                </div>
                <div className="flex-grow-1">
                  <span className="fw-medium">Project 2</span>
                </div>
                <span className="fw-bold text-blue ms-2">100%</span>
              </div>
              <ProgressBar now={100} variant="primary" className="mb-3" style={{ height: '6px' }} />

              {/* Project 3 */}
              <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '30px', height: '30px', backgroundColor: '#f3e5f5' }}
                >
                  <FontAwesomeIcon icon={faLayerGroup} className="text-purple" />
                </div>
                <div className="flex-grow-1">
                  <span className="fw-medium">Project 3</span>
                </div>
                <span className="fw-bold text-purple ms-2">75%</span>
              </div>
              <ProgressBar now={75} variant="secondary" className="mb-3" style={{ height: '6px' }} />

              {/* Project 4 */}
              <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '30px', height: '30px', backgroundColor: '#fff3e0' }}
                >
                  <FontAwesomeIcon icon={faFolder} className="text-orange" />
                </div>
                <div className="flex-grow-1">
                  <span className="fw-medium">Project 4</span>
                </div>
                <span className="fw-bold text-orange ms-2">75%</span>
              </div>
              <ProgressBar now={75} variant="warning" className="mb-3" style={{ height: '6px' }} />
            </Card.Body>
          </Card>
        </Col>

        {/* TO DO LIST - EXACT MATCH WITH YOUR IMAGE */}
        <Col md={4} className="mb-4">
          <Card
            className="h-100 shadow-sm"
            style={{ borderRadius: '12px', border: '1px solid #eee' }}
          >
            <Card.Header
              className="d-flex justify-content-between align-items-center"
              style={{ borderRadius: '12px 12px 0 0', padding: '15px 20px' }}
            >
              <div>
                <div className="d-flex align-items-center mb-1">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                    style={{ width: '36px', height: '36px', backgroundColor: '#fff3e0' }}
                  >
                    <FontAwesomeIcon icon={faTasks} className="text-orange" />
                  </div>
                  <div>
                    <Card.Title className="mb-0 fw-bold">To Do List</Card.Title>
                    <small className="text-muted">Critical tasks requiring attention</small>
                  </div>
                </div>
              </div>
              <div>
                <button className="btn btn-sm btn-outline-secondary me-2">View All</button>
                <button className="btn btn-sm btn-warning">Add New</button>
              </div>
            </Card.Header>

            <Card.Body style={{ padding: '15px 20px' }}>
              {/* Search Bar */}
              <div className="input-group mb-3" style={{ borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
                <span className="input-group-text bg-white" style={{ border: 'none' }}>
                  <FontAwesomeIcon icon={faSearch} className="text-muted" />
                </span>
                <input type="text" className="form-control" placeholder="Search" style={{ border: 'none', boxShadow: 'none' }} />
                <span className="input-group-text bg-white" style={{ border: 'none' }}>
                  <FontAwesomeIcon icon={faEllipsisH} className="text-muted" />
                </span>
              </div>

              {/* Tabs */}
              <div className="d-flex mb-3" style={{ gap: '5px', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  className="btn btn-sm flex-grow-1"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ffc107',
                    color: '#ffc107',
                    fontWeight: 'bold',
                    borderRadius: '8px'
                  }}
                >
                  Today
                </button>
                <button
                  className="btn btn-sm flex-grow-1"
                  style={{
                    backgroundColor: '#fff8e1',
                    border: 'none',
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '8px'
                  }}
                >
                  Week
                </button>
              </div>

              {/* Task 1 */}
              <div className="d-flex align-items-start mb-3 p-2 bg-light rounded">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '30px', height: '30px', backgroundColor: '#ffebee' }}
                >
                  <FontAwesomeIcon icon={faBuilding} className="text-red" />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium">Foundation Inspection</div>
                  <small className="text-muted">10:32 AM</small>
                  <div className="mt-1 small text-muted">Scheduled inspection for Sunview project site A</div>
                  <div className="d-flex align-items-center mt-2">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle me-2"
                      style={{ width: '24px', height: '24px', backgroundColor: '#2196f3', color: 'white' }}
                    >
                      JD
                    </div>
                    <small>John Davis</small>
                  </div>
                </div>
                <span className="badge bg-danger ms-2" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>HIGH</span>
              </div>

              {/* Task 2 */}
              <div className="d-flex align-items-start mb-3 p-2 bg-light rounded">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                  style={{ width: '30px', height: '30px', backgroundColor: '#fff3e0' }}
                >
                  <FontAwesomeIcon icon={faTruck} className="text-orange" />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium">Material Delivery</div>
                  <small className="text-muted">9:15 AM</small>
                  <div className="mt-1 small text-muted">Lumber shipment arrival for Aspen Living project</div>
                  <div className="d-flex align-items-center mt-2">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle me-2"
                      style={{ width: '24px', height: '24px', backgroundColor: '#4caf50', color: 'white' }}
                    >
                      SM
                    </div>
                    <small>Sarah Mitchell</small>
                  </div>
                </div>
                <span className="badge bg-danger ms-2" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>HIGH</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Calendar */}
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm" style={{ borderRadius: '12px', border: '2px solid #eee' }}>
            <Card.Header className="d-flex justify-content-between align-items-center" style={{ borderRadius: '12px 12px 0 0' }}>
              <Card.Title className="mb-0">Calendar</Card.Title>
              <FontAwesomeIcon icon={faEllipsisH} className="text-muted" />
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <div className="text-center">
                <div className="fs-1 fw-bold text-primary">05</div>
                <div className="text-muted">Nov 2025</div>
              </div>
              <div className="mt-4 w-100">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Mon</span>
                  <span className="text-muted">Tue</span>
                  <span className="text-muted">Wed</span>
                  <span className="text-muted">Thu</span>
                  <span className="text-muted">Fri</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>03</span>
                  <span>04</span>
                  <span className="bg-primary text-white rounded-circle px-2">05</span>
                  <span>06</span>
                  <span>07</span>
                </div>
                <hr className="my-3" />
                <div className="text-start">
                  <div className="d-flex align-items-center mb-2">
                    <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
                    <small>Team Meeting - 11:00 AM</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBriefcase} className="text-success me-2" />
                    <small>Client Call - 03:00 PM</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OwnerDashboard;