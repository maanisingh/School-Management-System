import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Table } from "react-bootstrap";
import { FaUserGraduate, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const TeacherLearners = () => {
  // Sample learners data (replace with API later)
  const [learners, setLearners] = useState([
    { id: 1, name: "John Doe", grade: "Grade 10A", roll: "101" },
    { id: 2, name: "Sarah Khan", grade: "Grade 10A", roll: "102" },
    { id: 3, name: "Michael Lee", grade: "Grade 12B", roll: "201" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", grade: "", roll: "" });

  const handleClose = () => setShowModal(false);
  const handleShow = (learner = null) => {
    if (learner) setFormData(learner);
    else setFormData({ id: null, name: "", grade: "", roll: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (formData.id) {
      setLearners((prev) =>
        prev.map((l) => (l.id === formData.id ? formData : l))
      );
    } else {
      setLearners((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setLearners((prev) => prev.filter((l) => l.id !== id));
  };

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
    },
    cardHover: {
      boxShadow: "0 4px 12px rgba(126, 58, 242, 0.1)",
      transform: "translateY(-3px)",
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
    iconDefault: {
      color: "#1e2a38",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "color 0.3s ease",
    },
    iconActive: {
      color: "#7e3af2",
    },
  };

  return (
    <Container fluid style={styles.page}>
      <h1 style={styles.title}>
        <FaUserGraduate className="me-2" style={{ color: "#7e3af2" }} />
        Manage Learners
      </h1>
      <p style={styles.subtitle}>Add or edit your class learners below.</p>

      <Row>
        <Col xs="12">
          <Card
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(126, 58, 242, 0.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <h5 style={{ color: "#1e2a38", fontWeight: "600" }}>
                  Learner List
                </h5>
                <Button style={styles.primaryBtn} onClick={() => handleShow()}>
                  <FaPlus className="me-1" /> Add New
                </Button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <Table bordered hover responsive>
                  <thead style={{ backgroundColor: "#f8fafc", color: "#1e2a38" }}>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Grade</th>
                      <th>Roll No.</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {learners.map((learner, index) => (
                      <tr key={learner.id}>
                        <td>{index + 1}</td>
                        <td>{learner.name}</td>
                        <td>{learner.grade}</td>
                        <td>{learner.roll}</td>
                        <td>
                          <FaEdit
                            style={{ ...styles.iconDefault, marginRight: "12px" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#7e3af2")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "#1e2a38")
                            }
                            onClick={() => handleShow(learner)}
                          />
                          <FaTrash
                            style={styles.iconDefault}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#7e3af2")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "#1e2a38")
                            }
                            onClick={() => handleDelete(learner.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Learner Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1e2a38" }}>
            {formData.id ? "Edit Learner" : "Add Learner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter learner name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                placeholder="Enter grade"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Roll No.</Form.Label>
              <Form.Control
                type="text"
                value={formData.roll}
                onChange={(e) =>
                  setFormData({ ...formData, roll: e.target.value })
                }
                placeholder="Enter roll number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={styles.secondaryBtn} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={styles.primaryBtn} onClick={handleSave}>
            {formData.id ? "Save Changes" : "Add Learner"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TeacherLearners;
