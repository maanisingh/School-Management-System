import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaUsers, FaBookOpen, FaChartBar } from "react-icons/fa";

const TeacherDashboard = () => {
  // Inline styles (following your palette)
  const styles = {
    page: {
      backgroundColor: "#e2e8f0",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Segoe UI, sans-serif",
    },
    heading: {
      color: "#1e2a38",
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "10px",
    },
    subheading: {
      color: "#1e2a38",
      fontSize: "1rem",
      marginBottom: "30px",
    },
    card: {
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "white",
      textAlign: "center",
      transition: "all 0.3s ease",
    },
    cardHover: {
      backgroundColor: "rgba(126, 58, 242, 0.1)",
      cursor: "pointer",
    },
    primaryBtn: {
      backgroundColor: "#7e3af2",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      fontWeight: "500",
      transition: "0.3s",
    },
    secondaryBtn: {
      backgroundColor: "transparent",
      border: "1px solid #7e3af2",
      color: "#7e3af2",
      padding: "10px 20px",
      borderRadius: "6px",
      fontWeight: "500",
      transition: "0.3s",
    },
    icon: {
      fontSize: "2rem",
      color: "#1e2a38",
      marginBottom: "10px",
    },
    iconActive: {
      color: "#7e3af2",
    },
    quickLinkCard: {
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      padding: "15px",
      textAlign: "center",
      backgroundColor: "white",
    },
    quickLinkBtn: {
      margin: "5px",
      borderRadius: "6px",
    },
  };

  const classes = [
    { name: "Grade 12B", learners: 30 },
    { name: "Grade 10A", learners: 28 },
  ];

  return (
    <div style={styles.page}>
      <Container fluid>
        <h1 style={styles.heading}>Welcome, Mr. Mokoena 👋</h1>
        <p style={styles.subheading}>Classes: 2 | Learners: 58</p>

        {/* Summary Row */}
        <Row className="g-3 mb-4">
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaChalkboardTeacher style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>My Classes</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>2</p>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaUsers style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>Total Learners</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>58</p>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaBookOpen style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>Marks Entry</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>Active</p>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaChartBar style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>Analysis</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>Ready</p>
            </Card>
          </Col>
        </Row>

        {/* Classes Section */}
        <h4 style={{ color: "#1e2a38", marginBottom: "15px" }}>My Classes</h4>
        <Row className="g-3 mb-4">
          {classes.map((cls, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card
                style={{
                  ...styles.card,
                  transition: "0.3s",
                }}
                className="hover-card"
              >
                <h5 style={{ color: "#1e2a38" }}>{cls.name}</h5>
                <p style={{ color: "#555" }}>Learners: {cls.learners}</p>
                <Button
                  style={styles.primaryBtn}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#6931cc")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#7e3af2")
                  }
                >
                  Open
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Links Section */}
        <h4 style={{ color: "#1e2a38", marginBottom: "15px" }}>Quick Links</h4>
        <Row className="g-3">
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.quickLinkCard}>
              <Button
                style={{ ...styles.primaryBtn, ...styles.quickLinkBtn }}
              >
                Enter Marks
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.quickLinkCard}>
              <Button
                style={{ ...styles.secondaryBtn, ...styles.quickLinkBtn }}
              >
                View Analysis
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeacherDashboard;
