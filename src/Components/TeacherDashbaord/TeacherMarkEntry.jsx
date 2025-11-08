import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FaBook, FaEdit, FaPlus, FaSave } from "react-icons/fa";

const TeacherMarkEntry = () => {
  // Dummy learners and tasks
  const [learners] = useState([
    { id: 1, name: "John Mokoena" },
    { id: 2, name: "Lerato Dlamini" },
    { id: 3, name: "Kabelo Ndlovu" },
    { id: 4, name: "Nomsa Khumalo" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Test 1", type: "Formal", maxMarks: 50 },
    { id: 2, title: "Homework 1", type: "Informal", maxMarks: 10 },
  ]);

  const [marks, setMarks] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", type: "Formal", maxMarks: "" });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (!formData.title || !formData.maxMarks) return;
    const newTask = {
      id: tasks.length + 1,
      title: formData.title,
      type: formData.type,
      maxMarks: parseInt(formData.maxMarks),
    };
    setTasks([...tasks, newTask]);
    setFormData({ title: "", type: "Formal", maxMarks: "" });
    handleCloseModal();
  };

  const handleMarkChange = (learnerId, taskId, value) => {
    setMarks((prev) => ({
      ...prev,
      [learnerId]: { ...prev[learnerId], [taskId]: value },
    }));
  };

  // Inline Styles
  const styles = {
    page: {
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
      backgroundColor: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      padding: "1rem",
      transition: "all 0.3s ease",
    },
    cardHover: {
      backgroundColor: "rgba(126, 58, 242, 0.1)",
      transform: "scale(1.02)",
    },
    btnPrimary: {
      backgroundColor: "#7e3af2",
      border: "none",
      color: "white",
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
    table: {
      marginTop: "1rem",
      textAlign: "center",
    },
    icon: {
      color: "#1e2a38",
      fontSize: "1.4rem",
      marginRight: "6px",
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
        <h2 style={styles.heading}>📝 Mark Entry</h2>

        <div className="d-flex justify-content-end mb-3">
          <Button style={styles.btnPrimary} onClick={handleOpenModal}>
            <FaPlus style={{ marginRight: "6px" }} /> Add New Task
          </Button>
        </div>

        <Card
          style={styles.card}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, styles.cardHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, styles.card)
          }
        >
          <Card.Body>
            <Tabs
              defaultActiveKey="Formal"
              id="mark-entry-tabs"
              className="mb-3"
              justify
              style={{ color: "#7e3af2" }}
            >
              {["Formal", "Informal"].map((type) => (
                <Tab
                  eventKey={type}
                  title={type}
                  key={type}
                  style={{ borderColor: "#7e3af2" }}
                >
                  <Table striped bordered hover responsive style={styles.table}>
                    <thead>
                      <tr>
                        <th>Learner Name</th>
                        {tasks
                          .filter((t) => t.type === type)
                          .map((task) => (
                            <th key={task.id}>
                              {task.title} ({task.maxMarks})
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {learners.map((learner) => (
                        <tr key={learner.id}>
                          <td>{learner.name}</td>
                          {tasks
                            .filter((t) => t.type === type)
                            .map((task) => (
                              <td key={task.id}>
                                <Form.Control
                                  type="number"
                                  value={
                                    marks[learner.id]?.[task.id] || ""
                                  }
                                  onChange={(e) =>
                                    handleMarkChange(
                                      learner.id,
                                      task.id,
                                      e.target.value
                                    )
                                  }
                                  min="0"
                                  max={task.maxMarks}
                                />
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab>
              ))}
            </Tabs>

            <div className="d-flex justify-content-end mt-3">
              <Button style={styles.btnSecondary} className="me-2">
                Cancel
              </Button>
              <Button style={styles.btnPrimary}>
                <FaSave style={{ marginRight: "6px" }} /> Save Marks
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* ===== ADD TASK MODAL ===== */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option>Formal</option>
                <option>Informal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Marks</Form.Label>
              <Form.Control
                type="number"
                name="maxMarks"
                value={formData.maxMarks}
                onChange={handleInputChange}
                placeholder="Enter max marks"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button style={styles.btnSecondary} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button style={styles.btnPrimary} onClick={handleAddTask}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherMarkEntry;
