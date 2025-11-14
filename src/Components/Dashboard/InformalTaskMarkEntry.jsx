// src/Components/Dashboard/InformalTaskMarkEntry.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Tab,
  Modal,
  Form,
} from "react-bootstrap";
import { FaArrowLeft, FaPlus, FaTrashAlt } from "react-icons/fa";

const InformalTaskMarkEntry = () => {
  const { classId, subjectId } = useParams();
  const navigate = useNavigate();

  // Load class data
  const storageKey = `fundisa_class_${classId}`;
  const [store, setStore] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { id: classId, grade: "12", section: "", learners: [], subjects: [] };
  });

  // Find subject
  const [subject, setSubject] = useState(null);
  useEffect(() => {
    if (store.subjects && subjectId) {
      const found = store.subjects.find((s) => s.id === subjectId);
      setSubject(found || null);
    }
  }, [store.subjects, subjectId]);

  // Manage informal tasks per term
  const tasksStorageKey = `fundisa_informal_tasks_${classId}_${subjectId}`;
  const [informalTasks, setInformalTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(tasksStorageKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { "1": [], "2": [], "3": [], "4": [] };
  });

  useEffect(() => {
    localStorage.setItem(tasksStorageKey, JSON.stringify(informalTasks));
  }, [informalTasks, tasksStorageKey]);

  const [activeTerm, setActiveTerm] = useState("1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskTotal, setNewTaskTotal] = useState("");

  const activeTasks = informalTasks[activeTerm] || [];

  // Back to Class Workspace
  const handleBack = () => {
    navigate(`/class/${classId}`);
  };

  // Add new task
  const handleAddTask = () => {
    if (!newTaskName.trim() || !newTaskTotal || isNaN(Number(newTaskTotal)) || Number(newTaskTotal) <= 0) {
      alert("Please enter a valid task name and a positive total mark.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: newTaskName.trim(),
      total: parseInt(newTaskTotal, 10),
    };

    setInformalTasks((prev) => {
      const updated = { ...prev };
      updated[activeTerm] = [...(updated[activeTerm] || []), newTask];
      return updated;
    });

    setNewTaskName("");
    setNewTaskTotal("");
    setShowAddModal(false);
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    if (!window.confirm("Delete this task? All its marks will be permanently lost.")) return;
    setInformalTasks((prev) => {
      const updated = { ...prev };
      updated[activeTerm] = updated[activeTerm].filter((t) => t.id !== taskId);
      return updated;
    });
  };

  // Navigate to Mark Entry Page
  const handleEnterMarks = (taskName) => {
    const encoded = encodeURIComponent(taskName);
    navigate(`/class/${classId}/subject/${subjectId}/task/${encoded}/marks`);
  };

  // Navigate to Analysis Page
  const handleAnalyseTask = (taskName) => {
    const encoded = encodeURIComponent(taskName);
    navigate(`/class/${classId}/subject/${subjectId}/task/${encoded}/analysis`);
  };

  if (!subject) {
    return (
      <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
        <Row className="mb-3 align-items-center">
          <Col>
            <h2 style={{ color: "#1e2a38" }}>Subject Not Found</h2>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" onClick={handleBack} style={{ border: "#7e3af2", color: "#7e3af2", backgroundColor: "transparent" }}>
              <FaArrowLeft className="me-1" /> Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
      {/* === Header Section === */}
      <Row className="mb-3">
        <Col>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="link"
              onClick={handleBack}
              style={{ color: "#7e3af2", textDecoration: "none", padding: 0 }}
            >
              <FaArrowLeft />
            </Button>
            <h2 style={{ color: "#1e2a38", margin: 0 }}>{subject.name} • Grade {store.grade}{store.section ? ` ${store.section}` : ""}</h2>
          </div>
          <p style={{ color: "#64748b", marginTop: "5px" }}>Informal Task Mark Entry</p>
        </Col>
      </Row>

      {/* === Main Content Card === */}
      <Card style={{ padding: "20px", border: "1px solid #cbd5e1" }}>
        {/* Term Tabs */}
        <Nav variant="tabs" activeKey={activeTerm} onSelect={setActiveTerm} className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="1">Term 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Term 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3">Term 3</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4">Term 4</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Add Task Button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Tasks for Term {activeTerm}</h5>
          <Button
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: "#7e3af2",
              border: "none",
              color: "white",
              borderRadius: "4px",
              padding: "8px 16px",
            }}
          >
            <FaPlus className="me-1" /> Add Task
          </Button>
        </div>

        {/* Tasks List (Dynamic) */}
        {activeTasks.length === 0 ? (
          <div className="text-center py-4">
            <p>No tasks added for Term {activeTerm}.</p>
            <Button
              onClick={() => setShowAddModal(true)}
              style={{
                backgroundColor: "#7e3af2",
                border: "none",
                color: "white",
                borderRadius: "4px",
                padding: "8px 16px",
              }}
            >
              <FaPlus className="me-1" /> Add Your First Task
            </Button>
          </div>
        ) : (
          <div>
            {activeTasks.map((task, index) => (
              <div key={task.id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "3px",
                      backgroundColor: index % 2 === 0 ? "#3b82f6" : "#10b981",
                    }}
                  ></div>
                  <span style={{ fontWeight: "bold", color: "#1e2a38" }}>
                    {task.name} (Total: {task.total})
                  </span>
                </div>
                <div style={{ marginTop: "10px", display: "flex", gap: "10px", fontSize: "0.9rem" }}>
                  <Button
                    variant="link"
                    style={{ color: "#7e3af2", textDecoration: "none", padding: "0 5px" }}
                    onClick={() => handleEnterMarks(task.name)}
                  >
                    [ Enter Marks ]
                  </Button>
                  <Button
                    variant="link"
                    style={{ color: "#7e3af2", textDecoration: "none", padding: "0 5px" }}
                    onClick={() => handleAnalyseTask(task.name)}
                  >
                    [ Analyse Task ]
                  </Button>
                  <Button
                    variant="link"
                    style={{ color: "#dc3545", textDecoration: "none", padding: "0 5px" }}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    [ <FaTrashAlt /> Delete Task ]
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* === Add Task Modal === */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="e.g., Quiz 1, Practical Demo, Weekly Test 3"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Mark</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={newTaskTotal}
                onChange={(e) => setNewTaskTotal(e.target.value)}
                placeholder="e.g., 50, 20, 100"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddModal(false)}
            style={{ border: "#7e3af2", color: "#7e3af2", backgroundColor: "transparent" }}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
            onClick={handleAddTask}
          >
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InformalTaskMarkEntry;