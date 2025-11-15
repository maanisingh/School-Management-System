import React, { useState } from "react";
import { Card, Button, Row, Col, Container, Modal, Form } from "react-bootstrap";
import { FaBook, FaEdit, FaPlus, FaEye } from "react-icons/fa";

/**
 * TeacherSubjects for global subject view.
 * For MVP, only show CAPS subjects and disallow custom creation/renaming.
 */

const CAPS_SUBJECTS = [
  { id: "math", name: "Mathematics", code: "MATH" },
  { id: "phys", name: "Physical Sciences", code: "PHY" },
  { id: "life", name: "Life Sciences", code: "LIFE" },
];

const AdminSubjectList = () => {
  const [subjects] = useState(CAPS_SUBJECTS);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const openModal = (type, subject = null) => {
    setModalType(type);
    setSelectedSubject(subject);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const styles = {
    page: { minHeight: "100vh", padding: "2rem 1rem" },
    heading: { color: "#1e2a38", fontWeight: "700", fontSize: "1.8rem", marginBottom: "1.5rem", textAlign: "center" },
    card: { border: "1px solid #cbd5e1", borderRadius: "12px", backgroundColor: "white", padding: "1rem", textAlign: "center" },
    btnPrimary: { backgroundColor: "#7e3af2", border: "none", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "500" },
    btnSecondary: { backgroundColor: "transparent", border: "1px solid #7e3af2", color: "#7e3af2", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "500" },
  };

  return (
    <div style={styles.page}>
      <Container>
        <h2 style={styles.heading}>📚 CAPS Subjects (MVP)</h2>

        <Row>
          {subjects.map((subject) => (
            <Col key={subject.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={styles.card}>
                <FaBook style={{ fontSize: "2rem", color: "#1e2a38", marginBottom: 8 }} />
                <Card.Body>
                  <Card.Title style={{ color: "#1e2a38", fontSize: "1.1rem" }}>{subject.name}</Card.Title>
                  <Card.Text style={{ color: "#64748b" }}>Code: {subject.code}</Card.Text>

                  <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                    <Button style={styles.btnPrimary} onClick={() => openModal("view", subject)} className="d-flex justify-content-center align-items-center"><FaEye className="me-1" /> View</Button>
                    <Button style={styles.btnSecondary} onClick={() => openModal("edit", subject)} className="d-flex justify-content-center align-items-center"><FaEdit className="me-1" /> Edit</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "edit" ? "Edit Subject (Limited)" : "Subject Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubject && (
            <>
              <p><strong>Name:</strong> {selectedSubject.name}</p>
              <p><strong>Code:</strong> {selectedSubject.code}</p>
              <p>This list is managed by CAPS for the MVP. Teachers cannot create or rename subjects here — subjects are added to classes within the Class Workspace.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          {modalType === "edit" && <Button style={styles.btnPrimary} onClick={() => { alert("Edit is limited in MVP — subjects come from CAPS."); closeModal(); }}>Save</Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminSubjectList;
