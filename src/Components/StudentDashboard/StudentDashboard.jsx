import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Nav, ProgressBar, Table } from "react-bootstrap";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New assignment posted by Mr. Sharma", time: "2 hours ago", icon: "📝" },
    { id: 2, text: "Holiday declared on 12 Nov", time: "Yesterday", icon: "🎉" },
    { id: 3, text: "Result for Term 1 released", time: "3 days ago", icon: "📊" },
  ]);

  const subjects = ["Math", "Science", "English", "History", "Geography", "Computer Science"];
  const term1Scores = [85, 78, 92, 70, 88, 95];
  const term2Scores = [88, 82, 90, 75, 85, 92];

  const handleClearNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <Container fluid className="min-vh-100 py-4">
      {/* Header */}
      <Card className="p-4 mb-4 shadow-sm border-0">
        <Row className="align-items-center">
          <Col md={8}>
            <h2 className="fw-bold text-dark">Welcome, Ayanda 👋</h2>
            <p className="text-secondary mb-0">Here’s your learning summary for this term.</p>
          </Col>
          <Col md={4} className="text-md-end text-center mt-3 mt-md-0">
            <img
              src="https://picsum.photos/seed/student123/80/80.jpg"
              alt="Profile"
              className="rounded-circle border border-3 border-primary mb-2"
              width="80"
              height="80"
            />
            <h6 className="mb-0 fw-bold">Ayanda Nkosi</h6>
            <p className="text-muted small mb-0">Roll No: STU20231045</p>
            <p className="text-muted small">Grade 10 - Science Stream</p>
          </Col>
        </Row>
      </Card>

      {/* Tabs */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="overview">Overview</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="academics">Academics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="activities">Activities</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* === OVERVIEW TAB === */}
      {activeTab === "overview" && (
        <>
          <Row>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Class Information</Card.Title>
                  <Table striped hover size="sm" className="mt-3">
                    <tbody>
                      <tr><td>Class/Section</td><td>Grade 10 - A</td></tr>
                      <tr><td>Class Teacher</td><td>Mr. Rahul Verma</td></tr>
                      <tr><td>Total Subjects</td><td>8</td></tr>
                      <tr><td>Attendance</td><td>92%</td></tr>
                      <tr><td>Average Grade</td><td>A</td></tr>
                      <tr><td>Current Term</td><td>Term 2 / Semester 1</td></tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Academic Progress</Card.Title>
                  <Table bordered hover responsive className="mt-3 text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Subject</th>
                        <th>Term 1 (%)</th>
                        <th>Term 2 (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subj, i) => (
                        <tr key={subj}>
                          <td>{subj}</td>
                          <td>{term1Scores[i]}</td>
                          <td>{term2Scores[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Attendance Overview</Card.Title>
                  <ProgressBar now={92} label={`92%`} className="my-3" />
                  <p className="text-center text-muted mb-0">Excellent attendance record!</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Quick Actions</Card.Title>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button variant="primary">📄 View Report Card</Button>
                    <Button variant="outline-primary">📚 Study Materials</Button>
                    <Button variant="outline-primary">🧠 Start Quiz</Button>
                    <Button variant="outline-primary">💬 Contact Teacher</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* === ACADEMICS TAB === */}
      {activeTab === "academics" && (
        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Goals & Recommendations</Card.Title>
                <ul className="list-group list-group-flush mt-3">
                  <li className="list-group-item">🎯 Improve average by 5% this month</li>
                  <li className="list-group-item">📚 Focus on History and English</li>
                  <li className="list-group-item text-muted fst-italic">
                    💡 “Success is not final, failure is not fatal: It is the courage to continue that counts.”
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Subject Performance</Card.Title>
                <Table bordered hover responsive className="mt-3 text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Subject</th>
                      <th>Term 1</th>
                      <th>Term 2</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subj, i) => (
                      <tr key={subj}>
                        <td>{subj}</td>
                        <td>{term1Scores[i]}%</td>
                        <td>{term2Scores[i]}%</td>
                        <td>
                          {term2Scores[i] > term1Scores[i] ? (
                            <span className="text-success">📈</span>
                          ) : (
                            <span className="text-danger">📉</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* === ACTIVITIES TAB === */}
      {activeTab === "activities" && (
        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Upcoming Activities</Card.Title>
                <ul className="list-group list-group-flush mt-3">
                  <li className="list-group-item">📘 Math Unit Test — Nov 10, 2023</li>
                  <li className="list-group-item">🧪 Science Lab — Nov 15, 2023</li>
                  <li className="list-group-item">🗒 Essay Submission — Nov 18, 2023</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Notifications & Announcements</Card.Title>
                <ul className="list-group list-group-flush mt-3">
                  {notifications.map((note) => (
                    <li key={note.id} className="list-group-item d-flex justify-content-between align-items-start">
                      <div>
                        <span className="me-2">{note.icon}</span>
                        <strong>{note.text}</strong>
                        <div className="text-muted small">{note.time}</div>
                      </div>
                      <Button variant="link" className="text-danger p-0" onClick={() => handleClearNotification(note.id)}>
                        ✕
                      </Button>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default StudentDashboard;
