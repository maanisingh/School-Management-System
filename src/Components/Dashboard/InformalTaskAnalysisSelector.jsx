// src/Components/Dashboard/InformalTaskAnalysisSelector.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert
} from "react-bootstrap";
import { FaArrowLeft, FaChartBar } from "react-icons/fa";

const NoTasksPlaceholder = ({ term }) => (
  <Card className="text-center p-4" style={{ backgroundColor: "#f8f9fa", border: "1px dashed #dee2e6" }}>
    <p className="mb-0" style={{ color: "#6c757d" }}>(No informal tasks for this term)</p>
  </Card>
);

const InformalTaskAnalysisSelector = () => {
  const { classId, subjectId } = useParams();
  const navigate = useNavigate();

  // load class
  const storageKey = `fundisa_class_${classId}`;
  const [store, setStore] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)); } catch {}
    return { grade: "", section: "", learners: [] };
  });

  // load tasks
  const tasksStorageKey = `fundisa_informal_tasks_${classId}_${subjectId}`;
  const [informalTasks, setInformalTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(tasksStorageKey)); } catch {}
    return { "1": [], "2": [], "3": [], "4": [] };
  });

  const availableTerms = ["1", "2", "3", "4"];
  const [selectedTerm, setSelectedTerm] = useState("");
  const [tasksForTerm, setTasksForTerm] = useState([]);

  useEffect(() => {
    if (!selectedTerm) {
      setTasksForTerm([]);
      return;
    }
    setTasksForTerm(informalTasks[selectedTerm] || []);
  }, [selectedTerm, informalTasks]);

  const handleAnalyseTask = (taskName) => {
    const encoded = encodeURIComponent(taskName);
   navigate(`/analysis/informal/${subjectId}/task/${encoded}`);

  };

  const handleViewTermAnalysis = () => {
    navigate(`/class/${classId}/subject/${subjectId}/analysis/term/${selectedTerm}`);
  };

  return (
    <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
      
      {/* HEADER */}
      <Row className="mb-3">
        <Col>
          <Button variant="link" onClick={() => navigate(-1)} className="p-0 me-3" style={{ color: "#7e3af2" }}>
            <FaArrowLeft /> Back
          </Button>
          <h2 style={{ color: "#1e2a38" }}>
            Informal Analysis · Grade {store.grade}{store.section}
          </h2>
          <p style={{ color: "#64748b" }}>Select Term & Task</p>
        </Col>
      </Row>

      {/* TERM SELECT */}
      <Card className="mb-4" style={{ padding: "20px" }}>
        <h5>Select Term</h5>
        <Row>
          <Col md={6}>
            <Form.Select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
              <option value="">-- Choose Term --</option>
              {availableTerms.map(t => (
                <option key={t} value={t}>Term {t}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card>

      {selectedTerm && (
        <Card className="p-3">
          <h5>Tasks for Term {selectedTerm}</h5>

          {tasksForTerm.length === 0 ? (
            <NoTasksPlaceholder term={selectedTerm} />
          ) : (
            <>
              {tasksForTerm.map(task => (
                <Row key={task.id} className="mb-3 align-items-center">
                  <Col>
                    <b>{task.name}</b> <span>(Total {task.total})</span>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-primary"
                      style={{ borderColor: "#7e3af2", color: "#7e3af2" }}
                      onClick={() => handleAnalyseTask(task.name)}
                    >
                      <FaChartBar className="me-1" /> Analyse
                    </Button>
                  </Col>
                </Row>
              ))}

              <hr />
              <Row className="align-items-center">
                <Col>
                  <b>Combined Term {selectedTerm} Analysis</b>
                </Col>
                <Col xs="auto">
                  <Button
                    style={{ backgroundColor: "#7e3af2", border: "none" }}
                    onClick={handleViewTermAnalysis}
                  >
                    View Analysis
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Card>
      )}

    </Container>
  );
};

export default InformalTaskAnalysisSelector;
