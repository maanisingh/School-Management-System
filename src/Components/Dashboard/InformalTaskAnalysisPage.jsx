// src/Components/Dashboard/InformalTaskAnalysisPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const InformalTaskAnalysisPage = () => {
  const { classId, subjectId, taskName } = useParams();
  const navigate = useNavigate();

  // Decode task name
  const decodedTaskName = decodeURIComponent(taskName);

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

  // Load marks for this task
  const marksStorageKey = `fundisa_marks_${classId}_${subjectId}_${decodedTaskName}`;
  const [taskMarks, setTaskMarks] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(marksStorageKey);
      if (raw) setTaskMarks(JSON.parse(raw));
    } catch {}
  }, [marksStorageKey]);

  // Get task info (total mark) from informalTasks
  const tasksStorageKey = `fundisa_informal_tasks_${classId}_${subjectId}`;
  const [informalTasks, setInformalTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(tasksStorageKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { "1": [], "2": [], "3": [], "4": [] };
  });

  const findTask = () => {
    for (let term in informalTasks) {
      const task = informalTasks[term].find(t => t.name === decodedTaskName);
      if (task) return task;
    }
    return null;
  };

  const taskInfo = findTask();
  const totalMark = taskInfo?.total || 0;

  // Back to Task List
  const handleBack = () => {
  navigate(`/class/${classId}/subject/${subjectId}/informal-analysis`);

  };
  // Calculate stats
  const learnerIds = Object.keys(taskMarks);
  const totalLearners = learnerIds.length;
  const averageScore = totalLearners > 0
    ? learnerIds.reduce((sum, id) => sum + (taskMarks[id] || 0), 0) / totalLearners
    : 0;

  const passedCount = learnerIds.filter(id => (taskMarks[id] || 0) >= (totalMark * 0.5)).length;
  const passRate = totalLearners > 0 ? ((passedCount / totalLearners) * 100).toFixed(1) : 0;

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

  if (!taskInfo) {
    return (
      <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
        <Row className="mb-3 align-items-center">
          <Col>
            <h2 style={{ color: "#1e2a38" }}>Task Not Found</h2>
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
          <p style={{ color: "#64748b", marginTop: "5px" }}>Informal Task Analysis — {decodedTaskName}</p>
        </Col>
      </Row>

      {/* === Stats Card === */}
      <Card style={{ padding: "20px", border: "1px solid #cbd5e1", marginBottom: "20px" }}>
        <Row>
          <Col md={3}>
            <h6>Task Total Mark</h6>
            <Badge bg="primary">{totalMark}</Badge>
          </Col>
          <Col md={3}>
            <h6>Learners Attempted</h6>
            <Badge bg="info">{totalLearners}</Badge>
          </Col>
          <Col md={3}>
            <h6>Average Score</h6>
            <Badge bg="warning">{averageScore.toFixed(1)}</Badge>
          </Col>
          <Col md={3}>
            <h6>Pass Rate</h6>
            <Badge bg="success">{passRate}%</Badge>
          </Col>
        </Row>
      </Card>

      {/* === Marks Table === */}
      <Card style={{ padding: "20px", border: "1px solid #cbd5e1" }}>
        <h5>Marks for {decodedTaskName}</h5>
        <Table responsive bordered hover>
          <thead style={{ backgroundColor: "#1e2a38", color: "white" }}>
            <tr>
              <th>Learner Name</th>
              <th>Mark</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {learnerIds.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No marks recorded for this task.</td>
              </tr>
            ) : (
              learnerIds.map((id) => {
                const learner = store.learners.find(l => l.id === id);
                const mark = taskMarks[id] || 0;
                const percentage = totalMark > 0 ? ((mark / totalMark) * 100).toFixed(1) : 0;
                const status = mark >= (totalMark * 0.5) ? "Passed" : "Failed";

                return (
                  <tr key={id}>
                    <td>{learner ? `${learner.surname}, ${learner.name}` : "Unknown Learner"}</td>
                    <td>{mark}</td>
                    <td>
                      {percentage}% 
                      <Badge 
                        bg={status === "Passed" ? "success" : "danger"} 
                        style={{ marginLeft: "8px" }}
                      >
                        {status}
                      </Badge>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Card>

      {/* === Back Button === */}
      <div className="mt-3 text-center">
        <Button
          variant="outline-secondary"
          onClick={handleBack}
          style={{
            border: "#7e3af2",
            color: "#7e3af2",
            backgroundColor: "transparent"
          }}
        >
          ← Back to Task List
        </Button>
      </div>
    </Container>
  );
};

export default InformalTaskAnalysisPage;