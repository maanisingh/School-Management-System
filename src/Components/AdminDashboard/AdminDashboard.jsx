import React from "react";
import { Row, Col, Card, ProgressBar, Table } from "react-bootstrap";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBookOpen,
  FaUserTie,
  FaBell,
  FaChartLine,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardSummary = () => {
  const stats = [
    {
      title: "Total Classes",
      value: 42,
      icon: <FaChalkboardTeacher />,
      color: "#4f46e5",
    },
    {
      title: "Total Learners",
      value: 980,
      icon: <FaUsers />,
      color: "#25D366",
    },
    {
      title: "Total Subjects",
      value: 18,
      icon: <FaBookOpen />,
      color: "#7e3af2",
    },
    {
      title: "Total Teachers",
      value: 25,
      icon: <FaUserTie />,
      color: "#ef4444",
    },
  ];

  const activities = [
    { id: 1, msg: "New student 'Aarav Patel' enrolled in Class 8.", time: "5 mins ago" },
    { id: 2, msg: "Science quiz results published for Class 10.", time: "20 mins ago" },
    { id: 3, msg: "Math assignment added for Class 6.", time: "1 hour ago" },
    { id: 4, msg: "Weekly staff meeting scheduled.", time: "2 hours ago" },
  ];

  const performance = [
    { subject: "Mathematics", progress: 85 },
    { subject: "Science", progress: 78 },
    { subject: "English", progress: 92 },
    { subject: "History", progress: 66 },
  ];

  // Helper to determine progress bar color
  const getProgressColor = (progress) => {
    if (progress > 80) return "#25D366";
    if (progress > 70) return "#4f46e5";
    return "#ef4444";
  };

  return (
    <div
     style={{
        // backgroundColor: "#1e2a38",
        minHeight: "100vh",
        color: "#e2e8f0",
        padding: "40px 20px",
      }} 
    >
      {/* ================= Header ================= */}
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#a5b4fc" }}>
          🎓 School Management Dashboard
        </h1>
        <p style={{ color: "#94a3b8" }}>Overall System Summary & Insights</p>
      </div>

      {/* ================= Summary Cards ================= */}
      <Row className="g-4 mb-5">
        {stats.map((item, i) => (
          <Col md={3} sm={6} xs={12} key={i}>
            <Card
              className="shadow-lg border-0 text-center"
              style={{
                background: "#1e2a38",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
            >
              <Card.Body>
                <div
                  style={{
                    fontSize: "2rem",
                    color: item.color,
                    background: "rgba(255,255,255,0.1)",
                    width: "70px",
                    height: "70px",
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </div>
                <h5 style={{ color: "#cbd5e1" }}>{item.title}</h5>
                <h3 style={{ color: "#a5b4fc" }}>{item.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ================= Chart / Progress Overview ================= */}
      <Row className="g-4">
        <Col lg={8}>
          <Card
            className="border-0 shadow-lg"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              color: "#e2e8f0",
            }}
          >
            <Card.Body>
              <h5 className="mb-4">
                <FaChartLine className="me-2" />
                Subject Performance Overview
              </h5>
              {performance.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>{item.subject}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      height: "10px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginTop: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.progress}%`,
                        height: "100%",
                        backgroundColor: getProgressColor(item.progress),
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* ================== Recent Activities ================== */}
        <Col lg={4}>
          <Card
            className="border-0 shadow-lg"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              color: "#e2e8f0",
            }}
          >
            <Card.Body>
              <h5 className="mb-4">
                <FaBell className="me-2" />
                Recent Activity
              </h5>
              <ul className="list-unstyled">
                {activities.map((act) => (
                  <li
                    key={act.id}
                    className="mb-3 p-3 rounded"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <p className="mb-1">{act.msg}</p>
                    <small style={{ color: "#94a3b8" }}>{act.time}</small>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ================== Class Summary Table ================== */}
      <div className="mt-5">
        <Card
          className="border-0 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "20px",
            color: "#e2e8f0",
          }}
        >
          <Card.Body>
            <h5 className="mb-4">
              <FaChalkboardTeacher className="me-2" />
              Class Summary
            </h5>
            <Table hover responsive bordered style={{ color: "#cbd5e1" }}>
              <thead style={{ background: "rgba(255,255,255,0.15)" }}>
                <tr>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Students</th>
                  <th>Class Teacher</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10</td>
                  <td>A</td>
                  <td>45</td>
                  <td>Mr. Sharma</td>
                  <td style={{ color: "#25D366" }}>Active</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>B</td>
                  <td>42</td>
                  <td>Mrs. Rao</td>
                  <td style={{ color: "#4f46e5" }}>Active</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>A</td>
                  <td>50</td>
                  <td>Mr. Singh</td>
                  <td style={{ color: "#ef4444" }}>Inactive</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSummary;