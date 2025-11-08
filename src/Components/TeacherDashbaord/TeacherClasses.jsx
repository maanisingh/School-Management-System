import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaUsers, FaEye } from "react-icons/fa";

const TeacherClasses = () => {
  // Example data (you can replace it with API data or props)
  const teacherName = "Mr. Mokoena";
  const classes = [
    { id: 1, name: "Grade 12B", learners: 32 },
    { id: 2, name: "Grade 10A", learners: 26 },
  ];

  // Inline styles
  const styles = {
    page: {
      minHeight: "100vh",
      padding: "2rem 1rem",
      color: "#1e2a38",
    },
    title: {
      color: "#1e2a38",
      fontWeight: "bold",
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#475569",
      marginBottom: "2rem",
    },
    card: {
      border: "1px solid #cbd5e1",
      borderRadius: "16px",
      padding: "1rem",
      backgroundColor: "#fff",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      boxShadow: "0 4px 12px rgba(126, 58, 242, 0.1)",
      transform: "translateY(-3px)",
    },
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#1e2a38",
    },
    iconDefault: {
      color: "#1e2a38",
      fontSize: "2rem",
    },
    iconActive: {
      color: "#7e3af2",
    },
    primaryBtn: {
      backgroundColor: "#7e3af2",
      border: "none",
      color: "white",
      borderRadius: "8px",
      padding: "0.5rem 1rem",
      fontWeight: "500",
    },
    secondaryBtn: {
      backgroundColor: "transparent",
      border: "1px solid #7e3af2",
      color: "#7e3af2",
      borderRadius: "8px",
      padding: "0.5rem 1rem",
      fontWeight: "500",
    },
  };

  return (
    <Container fluid style={styles.page}>
      <h1 style={styles.title}>Welcome, {teacherName}</h1>
      <p style={styles.subtitle}>
        Classes: {classes.length} | Learners:{" "}
        {classes.reduce((a, b) => a + b.learners, 0)}
      </p>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {classes.map((cls) => (
          <Col key={cls.id}>
            <Card
              style={styles.card}
              className="h-100"
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(126, 58, 242, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaChalkboardTeacher style={styles.iconDefault} />
                <Card.Title style={{ ...styles.cardTitle, marginTop: "1rem" }}>
                  {cls.name}
                </Card.Title>
                <p style={{ color: "#475569" }}>
                  Learners: {cls.learners}
                </p>
                <div className="d-flex gap-2 mt-2 flex-wrap justify-content-center">
                  <Button
                    style={styles.primaryBtn}
                    size="sm"
                  >
                    <FaUsers className="me-1" /> Enter Marks
                  </Button>
                  <Button
                    style={styles.secondaryBtn}
                    size="sm"
                  >
                    <FaEye className="me-1" /> View Analysis
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeacherClasses;
