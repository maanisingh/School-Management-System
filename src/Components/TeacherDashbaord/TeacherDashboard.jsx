import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBookOpen,
  FaChartBar,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TeacherClassWorkspace from "./TeacherClassWorkspace";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // classes: each class has id, grade, section (optional), learners: []
  const [classes, setClasses] = useState([
    {
      id: uuidv4(),
      grade: "12",
      section: "B",
      learners: [
        /* learner objects */
      ],
    },
    { id: uuidv4(), grade: "10", section: "A", learners: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [newClass, setNewClass] = useState({ grade: "", section: "" });
  // const [showWorkspace, setShowWorkspace] = useState(false);
  const styles = {
    page: {
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
    subheading: { color: "#1e2a38", fontSize: "1rem", marginBottom: "30px" },
    card: {
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "white",
      textAlign: "center",
      transition: "all 0.3s ease",
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
    icon: { fontSize: "2rem", color: "#1e2a38", marginBottom: "10px" },
  };

  const totalLearners = classes.reduce(
    (sum, c) => sum + (c.learners?.length || 0),
    0
  );

  // Create class — per spec only Grade + optional Section in popup
  const handleCreateClass = () => {
    if (!newClass.grade) return alert("Please select a Grade.");
    const created = {
      id: uuidv4(),
      grade: newClass.grade,
      section: newClass.section?.trim() || "",
      learners: [], // empty initially — learners will be added inside class workspace
      subjects: [], // subjects linked to class
    };
    setClasses((prev) => [...prev, created]);
    setNewClass({ grade: "", section: "" });
    setShowModal(false);
  };

  // Delete class with confirmation modal
  const handleDeleteClick = (cls) => {
    setClassToDelete(cls);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (classToDelete) {
      setClasses((prev) => prev.filter((c) => c.id !== classToDelete.id));
      setShowDeleteModal(false);
      setClassToDelete(null);
    }
  };

  // Navigate to class workspace (open)
    const openClass = (cls) => {
      navigate(`/class/${cls.id}`);
    };

  // const openClass = () => {
  //   setShowWorkspace(true);
  // };

  return (
    <div style={styles.page}>
      <Container fluid>
        <h1 style={styles.heading}>Welcome, Mr. Mokoena 👋</h1>
        <p style={styles.subheading}>
          Classes: {classes.length} | Learners: {totalLearners}
        </p>

        {/* Summary Row */}
        <Row className="g-3 mb-4">
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaChalkboardTeacher style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>My Classes</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>
                {classes.length}
              </p>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaUsers style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>Total Learners</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>
                {totalLearners}
              </p>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Card style={styles.card}>
              <FaBookOpen style={styles.icon} />
              <h5 style={{ color: "#1e2a38" }}>Marks Entry</h5>
              <p style={{ color: "#7e3af2", fontWeight: "600" }}>
                Accessible inside class
              </p>
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 style={{ color: "#1e2a38", marginBottom: "0" }}>My Classes</h4>
          <Button style={styles.primaryBtn} onClick={() => setShowModal(true)}>
            + Add Class
          </Button>
        </div>

        <Row className="g-3">
          {classes.map((cls) => (
            <Col xs={12} md={6} lg={4} key={cls.id}>
              <Card style={styles.card}>
                <h5 style={{ color: "#1e2a38" }}>
                  Grade {cls.grade}
                  {cls.section ? ` ${cls.section}` : ""}
                </h5>
                <p style={{ color: "#555" }}>Learners: {cls.learners.length}</p>
                <div className="d-flex justify-content-center gap-2">

                  
                    <button
                      style={styles.primaryBtn}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#6931cc")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#7e3af2")
                      }
                      onClick={openClass}
                    >
                      Open
                    </button>
                

                  
                  <Button
                    style={styles.secondaryBtn}
                    onClick={() => handleDeleteClick(cls)}
                  >
                    <FaTrashAlt /> Delete
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
          {classes.length === 0 && (
            <Col>
              <Card style={styles.card}>
                <p>
                  No classes yet — click "+ Add Class" to create your first
                  class.
                </p>
              </Card>
            </Col>
          )}
        </Row>
      </Container>

      {/* Add Class Modal (Grade + optional Section) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGrade" className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Select
                value={newClass.grade}
                onChange={(e) =>
                  setNewClass({ ...newClass, grade: e.target.value })
                }
              >
                <option value="">Select Grade</option>
                {[7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formSection" className="mb-3">
              <Form.Label>Section (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. A, B"
                value={newClass.section}
                onChange={(e) =>
                  setNewClass({ ...newClass, section: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                Optional — e.g., A, B, C
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button style={styles.primaryBtn} onClick={handleCreateClass}>
            Create Class
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {classToDelete && (
            <p>
              Are you sure you want to delete Grade {classToDelete.grade}
              {classToDelete.section ? ` ${classToDelete.section}` : ""} class?
              This will remove all learners and subjects associated with this
              class.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            style={{ backgroundColor: "#7e3af2", borderColor: "#7e3af2" }}
          >
            Delete Class
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherDashboard;
