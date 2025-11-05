import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faClock,
  faSearch,
  faTasks,
  faEllipsisH,
  faFile,
  faBuilding,
  faDesktop,
  faLayerGroup,
  faFolder,
  faTruck,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { MdOutlineCalendarToday } from 'react-icons/md';

const OwnerDashboard = () => {
  // For calendar
  const now = new Date();
  const currentMonth = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  const month = now.getMonth();

  // Get number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Dummy data (not used in current UI but kept for reference)
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

  const todayDate = now.getDate(); // Highlight today

  return (
    <div className="">
      {/* HEADER */}
      <div
        className="d-flex align-items-center p-3 rounded mb-4"
        style={{
          backgroundColor: '#FFF8E1',
          borderRadius: '16px 16px 0 0',
          border: '1px solid #d6c99d',
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center text-white rounded me-3"
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#9C27B0',
            borderRadius: '10px',
          }}
        >
          <FontAwesomeIcon icon={faBriefcase} />
        </div>
        <div>
          <h6 className="mb-0 fw-semibold" style={{ color: '#333' }}>
            Organization Management
          </h6>
        </div>
      </div>

      <Row>
        {/* Recent Jobs */}
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

        {/* To Do List */}
        <Col md={4} className="mb-4">
          <Card
            className="h-100"
            style={{
              borderRadius: '16px',
              border: '1px solid #f0f0f0',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Card.Header
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: '16px 20px',
                borderRadius: '16px 16px 0 0',
                backgroundColor: '#fff',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{ width: '40px', height: '40px', backgroundColor: '#fff3e0' }}
                >
                  <FontAwesomeIcon icon={faTasks} className="text-orange" />
                </div>
                <div>
                  <Card.Title className="mb-0 fw-bold fs-5">To Do List</Card.Title>
                  <small className="text-muted d-block">Critical tasks requiring attention</small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary px-3">View All</button>
                <button className="btn btn-sm btn-warning px-3">Add New</button>
              </div>
            </Card.Header>

            <Card.Body style={{ padding: '20px' }}>
              {/* Search Bar */}
              <div
                className="input-group mb-3"
                style={{
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  overflow: 'hidden',
                  backgroundColor: '#fafafa',
                }}
              >
                <span className="input-group-text bg-transparent border-0">
                  <FontAwesomeIcon icon={faSearch} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-0 bg-transparent"
                  placeholder="Search"
                  style={{ boxShadow: 'none' }}
                />
                <span className="input-group-text bg-transparent border-0">
                  <FontAwesomeIcon icon={faEllipsisH} className="text-muted" />
                </span>
              </div>

              {/* Tabs */}
              <div
                className="d-flex mb-3"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff8e1',
                }}
              >
                <button
                  className="btn btn-sm flex-grow-1 text-dark fw-bold"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ffc107',
                    borderRadius: '12px',
                    color: '#ffc107',
                  }}
                >
                  Today
                </button>
                <button
                  className="btn btn-sm flex-grow-1 text-dark fw-bold"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#333',
                  }}
                >
                  Week
                </button>
              </div>

              {/* Task 1 */}
              <div
                className="d-flex align-items-start p-3 mb-3 rounded"
                style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderRadius: '12px',
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{ width: '32px', height: '32px', backgroundColor: '#ffebee' }}
                >
                  <FontAwesomeIcon icon={faBuilding} className="text-red" />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium mb-1">Foundation Inspection</div>
                  <small className="text-muted d-block mb-1">10:32 AM</small>
                  <div className="small text-muted mb-2">Scheduled inspection for Sunview project site A</div>
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle me-2"
                      style={{ width: '28px', height: '28px', backgroundColor: '#2196f3', color: 'white' }}
                    >
                      JD
                    </div>
                    <small>John Davis</small>
                  </div>
                </div>
                <span
                  className="badge bg-danger ms-2"
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    borderRadius: '8px',
                  }}
                >
                  HIGH
                </span>
              </div>

              {/* Task 2 */}
              <div
                className="d-flex align-items-start p-3 mb-3 rounded"
                style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderRadius: '12px',
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{ width: '32px', height: '32px', backgroundColor: '#fff3e0' }}
                >
                  <FontAwesomeIcon icon={faTruck} className="text-orange" />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium mb-1">Material Delivery</div>
                  <small className="text-muted d-block mb-1">9:15 AM</small>
                  <div className="small text-muted mb-2">Lumber shipment arrival for Aspen Living project</div>
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle me-2"
                      style={{ width: '28px', height: '28px', backgroundColor: '#4caf50', color: 'white' }}
                    >
                      SM
                    </div>
                    <small>Sarah Mitchell</small>
                  </div>
                </div>
                <span
                  className="badge bg-danger ms-2"
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    borderRadius: '8px',
                  }}
                >
                  HIGH
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Calendar */}
        <Col md={4} className="mb-4">
          <Card
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              height: 'fit-content',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: '#fff0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MdOutlineCalendarToday size={16} color="#e74c3c" />
                </div>
                <h5 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>
                  {currentMonth}
                </h5>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="xs" style={{ color: '#6c757d' }} />
                </div>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} size="xs" style={{ color: '#6c757d' }} />
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                marginBottom: '8px',
              }}
            >
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6c757d',
                    padding: '4px',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
              }}
            >
              {daysArray.map((day, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: day === todayDate ? '#6c5ce7' : 'transparent',
                    color: day === todayDate ? 'white' : '#2d3436',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OwnerDashboard;