// src/components/FormalTaskMarkEntry.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Tabs, Tab } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const TeacherFormalTaskMarkEntry = () => {
    const { classId, subjectId } = useParams();
    const navigate = useNavigate();
    
    // Get class and subject data from localStorage
    const storageKey = `fundisa_class_${classId}`;
    const [store, setStore] = useState(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) return JSON.parse(raw);
        } catch { }
        return { id: classId, grade: "12", section: "", learners: [], subjects: [] };
    });
    
    const [subject, setSubject] = useState(null);
    const [activeTerm, setActiveTerm] = useState("1");
    
    // Find the subject from the store
    useEffect(() => {
        if (store.subjects && subjectId) {
            const foundSubject = store.subjects.find(s => s.id === subjectId);
            setSubject(foundSubject || null);
        }
    }, [store.subjects, subjectId]);
    
    // Define formal tasks per term based on grade and CAPS requirements
    const getFormalTasks = () => {
        if (!subject) return [];
        
        const grade = store.grade;
        const tasks = {
            "1": [
                { name: "Investigation", total: 50 },
                { name: "Test", total: grade === "12" ? 100 : 75 }
            ],
            "2": [
                { name: "Assignment", total: 50 },
                { name: "June Examination P1", total: grade === "12" ? 150 : 50 },
                { name: "June Examination P2", total: grade === "12" ? 150 : 50 }
            ],
            "3": [
                { name: "Test 1", total: 50 },
                { name: "Test 2", total: 75 },
                ...(grade === "12" ? [
                    { name: "Trial Exam P1", total: 150 },
                    { name: "Trial Exam P2", total: 150 }
                ] : [])
            ],
            "4": grade === "12" ? [] : [ // Special case: No tasks for Grade 12, Term 4
                { name: "Test", total: 50 },
                { name: "Final Examination P1", total: 100 },
                { name: "Final Examination P2", total: 100 }
            ]
        };
        
        return tasks[activeTerm] || [];
    };
    
    // Navigation handlers
    const handleEnterMarks = (taskName) => {
        navigate(`/class/${classId}/subject/${subjectId}/task/${encodeURIComponent(taskName)}/marks`);
    };
    
    const handleAnalyse = (taskName) => {
        navigate(`/class/${classId}/subject/${subjectId}/task/${encodeURIComponent(taskName)}/analysis`);
    };
    
    if (!subject) {
        return (
            <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h2 style={{ color: "#1e2a38" }}>Subject not found</h2>
                    </Col>
                    <Col className="text-end">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            style={{
                                border: "#7e3af2",
                                color: "#7e3af2",
                                backgroundColor: "transparent"
                            }}
                        >
                            <FaArrowLeft className="me-1" /> Back
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
    
    const formalTasks = getFormalTasks();
    
    return (
        <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
            {/* Header */}
            <Row className="mb-3 align-items-center">
                <Col>
                    <h2 style={{ color: "#1e2a38" }}>
                        <Button
                            variant="link"
                            onClick={() => navigate(-1)}
                            style={{
                                color: "#7e3af2",
                                textDecoration: "none",
                                padding: "0",
                                marginRight: "10px"
                            }}
                        >
                            <FaArrowLeft />
                        </Button>
                        {subject.name} • Grade {store.grade}{store.section ? ` ${store.section}` : ""}
                    </h2>
                    <p style={{ color: "#64748b" }}>Formal Task Mark Entry</p>
                </Col>
            </Row>
            
            {/* Term Navigation */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Tabs
                    activeKey={activeTerm}
                    onSelect={(k) => setActiveTerm(k)}
                    className="mb-3"
                    style={{ color: "#7e3af2" }}
                >
                    <Tab eventKey="1" title="Term 1" />
                    <Tab eventKey="2" title="Term 2" />
                    <Tab eventKey="3" title="Term 3" />
                    {store.grade !== "12" && <Tab eventKey="4" title="Term 4" />}
                </Tabs>
                
                {/* Tasks Table */}
                <Table responsive bordered hover>
                    <thead style={{ backgroundColor: "#1e2a38", color: "white" }}>
                        <tr>
                            <th>Task Name</th>
                            <th>Total Mark (Editable)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formalTasks.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    {store.grade === "12" && activeTerm === "4" 
                                        ? "No formal tasks for Grade 12, Term 4." 
                                        : "No tasks for this term."}
                                </td>
                            </tr>
                        ) : (
                            formalTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.total}</td>
                                    <td>
                                        <Button
                                            variant="link"
                                            style={{ color: "#7e3af2", textDecoration: "none", marginRight: "10px" }}
                                            onClick={() => handleEnterMarks(task.name)}
                                        >
                                            Enter Marks
                                        </Button>
                                        <Button
                                            variant="link"
                                            style={{ color: "#7e3af2", textDecoration: "none" }}
                                            onClick={() => handleAnalyse(task.name)}
                                        >
                                            Analyse
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                
                {/* Term-specific notes */}
                {activeTerm === "4" && store.grade !== "12" && (
                    <div className="mt-3">
                        <p style={{ color: "#64748b" }}>
                            According to CAPS requirements, Term 4 must include a Test and two Final Examination papers. 
                            The "View Term 4 Analysis" button will calculate the final mark based on these three tasks.
                        </p>
                        <Button
                            variant="primary"
                            style={{ backgroundColor: "#7e3af2", border: "none" }}
                            onClick={() => handleAnalyse("Term 4")}
                        >
                            View Term 4 Analysis
                        </Button>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default TeacherFormalTaskMarkEntry;