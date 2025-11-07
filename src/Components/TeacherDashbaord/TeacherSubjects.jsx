import React, { useState } from "react";
import { Card, Button, Row, Col, Container, Modal, Form } from "react-bootstrap";
import { FaBook, FaEdit, FaPlus, FaEye } from "react-icons/fa";

const TeacherSubjects = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", code: "MATH101", learners: 32 },
    { id: 2, name: "English Literature", code: "ENG201", learners: 28 },
    { id: 3, name: "Physics", code: "PHY301", learners: 30 },
    { id: 4, name: "Life Sciences", code: "BIO202", learners: 26 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" | "edit" | "view"
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({ name: "", code: "", learners: "" });

  const openModal = (type, subject = null) => {
    setModalType(type);
    setSelectedSubject(subject);
    if (subject) {
      setFormData(subject);
    } else {
      setFormData({ name: "", code: "", learners: "" });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (modalType === "add") {
      const newSubject = {
        ...formData,
        id: subjects.length + 1,
        learners: parseInt(formData.learners) || 0,
      };
      setSubjects([...subjects, newSubject]);
    } else if (modalType === "edit" && selectedSubject) {
      setSubjects(
        subjects.map((s) =>
          s.id === selectedSubject.id ? { ...formData, id: s.id } : s
        )
      );
    }
    handleClose();
  };

  // Inline styles
  const styles = {
    page: {
      backgroundColor: "#e2e8f0",
      minHeight: "100vh",
      padding: "2rem 1rem",
    },
    heading: {
      color: "#1e2a38",
      fontWeight: "700",
      fontSize: "1.8rem",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    card: {
      border: "1px solid #cbd5e1",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      backgroundColor: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      padding: "1rem",
      textAlign: "center",
      cursor: "pointer",
    },
    cardHover: {
      backgroundColor: "rgba(126, 58, 242, 0.1)",
      transform: "scale(1.02)",
    },
    icon: {
      fontSize: "2rem",
      color: "#1e2a38",
      marginBottom: "0.5rem",
    },
    subjectTitle: {
      color: "#1e2a38",
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "0.25rem",
    },
    subjectCode: {
      color: "#64748b",
      fontSize: "0.9rem",
      marginBottom: "0.75rem",
    },
    btnPrimary: {
      backgroundColor: "#7e3af2",
      border: "none",
      color: "#fff",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      fontWeight: "500",
    },
    btnSecondary: {
      backgroundColor: "transparent",
      border: "1px solid #7e3af2",
      color: "#7e3af2",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      fontWeight: "500",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    modalHeader: {
      backgroundColor: "#7e3af2",
      color: "#fff",
      borderBottom: "none",
    },
    modalFooter: {
      borderTop: "none",
    },
  };

  return (
    <div style={styles.page}>
      <Container>
        <h2 style={styles.heading}>📚 My Subjects</h2>

        <div className="d-flex justify-content-end mb-3">
          <Button style={styles.btnPrimary} onClick={() => openModal("add")}>
            <FaPlus style={{ marginRight: "6px" }} /> Add New
          </Button>
        </div>

        <Row>
          {subjects.map((subject) => (
            <Col key={subject.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                style={styles.card}
                className="subject-card"
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.cardHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, styles.card)
                }
              >
                <FaBook style={styles.icon} />
                <Card.Body>
                  <Card.Title style={styles.subjectTitle}>
                    {subject.name}
                  </Card.Title>
                  <Card.Text style={styles.subjectCode}>
                    Code: {subject.code}
                    <br />
                    Learners: {subject.learners}
                  </Card.Text>

                  <div style={styles.btnContainer}>
                    <Button
                      style={styles.btnPrimary}
                      onClick={() => openModal("edit", subject)}
                    >
                      <FaEdit style={{ marginRight: "5px" }} /> Edit
                    </Button>
                    <Button
                      style={styles.btnSecondary}
                      onClick={() => openModal("view", subject)}
                    >
                      <FaEye style={{ marginRight: "5px" }} /> View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== MODAL ===== */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>
            {modalType === "add"
              ? "Add New Subject"
              : modalType === "edit"
              ? "Edit Subject"
              : "Subject Details"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {modalType === "view" && selectedSubject ? (
            <div>
              <p>
                <strong>Subject Name:</strong> {selectedSubject.name}
              </p>
              <p>
                <strong>Subject Code:</strong> {selectedSubject.code}
              </p>
              <p>
                <strong>Learners:</strong> {selectedSubject.learners}
              </p>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter subject name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter subject code"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Learners Count</Form.Label>
                <Form.Control
                  type="number"
                  name="learners"
                  value={formData.learners}
                  onChange={handleInputChange}
                  placeholder="Enter number of learners"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer style={styles.modalFooter}>
          <Button style={styles.btnSecondary} onClick={handleClose}>
            Cancel
          </Button>
          {modalType !== "view" && (
            <Button style={styles.btnPrimary} onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherSubjects;
