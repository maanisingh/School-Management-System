import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaUserCog, FaSignOutAlt, FaUser } from "react-icons/fa";

const TeacherSettings = () => {
  const [formData, setFormData] = useState({
    name: "Mr. Mokoena",
    email: "mokoena@example.com",
    password: "",
  });

  const styles = {
    page: { minHeight: "100vh", padding: "20px" },
    heading: { color: "#1e2a38", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
    iconActive: { color: "#7e3af2", fontSize: "28px" },
    card: { border: "1px solid #cbd5e1", borderRadius: "16px", backgroundColor: "white", padding: "20px", transition: "all 0.3s ease" },
    cardHover: { backgroundColor: "rgba(126, 58, 242, 0.05)", transform: "translateY(-4px)" },
    label: { color: "#1e2a38", fontWeight: 500 },
    formControl: { borderRadius: "8px", border: "1px solid #cbd5e1", padding: "10px" },
    primaryButton: { backgroundColor: "#7e3af2", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", marginRight: "10px" },
    secondaryButton: { border: "1px solid #7e3af2", color: "#7e3af2", backgroundColor: "transparent", borderRadius: "8px", padding: "10px 20px" },
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = (e) => { e.preventDefault(); alert("Profile details saved successfully!"); };
  const handleLogout = () => { alert("You have been logged out."); /* add logout */ };

  return (
    <div style={styles.page}>
      <Container fluid>
        <h2 style={styles.heading}><FaUserCog style={styles.iconActive} /> Settings</h2>

        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card style={styles.card} onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)} onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}>
              <Card.Body>
                <h5 style={{ color: "#1e2a38", marginBottom: "15px" }}><FaUser style={{ color: "#7e3af2", marginRight: "8px" }} /> Edit Profile</h5>
                <Form onSubmit={handleSave}>
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.label}>Full Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} style={styles.formControl} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.label}>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} style={styles.formControl} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} style={styles.formControl} placeholder="Enter new password" />
                  </Form.Group>
                  <div className="d-flex flex-wrap mt-3">
                    <Button type="submit" style={styles.primaryButton}>Save Changes</Button>
                    <Button type="button" style={styles.secondaryButton}>Cancel</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={styles.card} onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)} onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
                <FaSignOutAlt style={{ color: "#7e3af2", fontSize: "40px", marginBottom: "10px" }} />
                <h5 style={{ color: "#1e2a38", marginBottom: "10px" }}>Logout</h5>
                <p style={{ color: "#1e2a38", fontSize: "14px" }}>Click below to securely log out of your account.</p>
                <Button style={styles.secondaryButton} onClick={handleLogout}><FaSignOutAlt style={{ marginRight: "8px" }} /> Logout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeacherSettings;
