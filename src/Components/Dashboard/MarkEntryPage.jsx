// src/components/MarkEntryPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, FormControl, Modal, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const MarkEntryPage = () => {
    const { classId, subjectId, taskName } = useParams();
    const navigate = useNavigate();

    // Get class and subject data from localStorage
    const storageKey = `fundisa_class_${classId}`;
    const [store, setStore] = useState(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) return JSON.parse(raw);
        } catch { }
        
        // Return dummy data if no data in localStorage
        return { 
            id: classId, 
            grade: "12", 
            section: "A", 
            learners: [
                { id: "learner1", name: "Nqobile", surname: "Njoko" },
                { id: "learner2", name: "Ziyanda", surname: "Ndlovu" }
            ], 
            subjects: [
                {
                    id: subjectId,
                    name: "Mathematics",
                    enrolledLearnerIds: ["learner1", "learner2"]
                }
            ] 
        };
    });

    const [subject, setSubject] = useState(null);
    const [task, setTask] = useState(null);
    const [learnerMarks, setLearnerMarks] = useState([]);
    const [totalMark, setTotalMark] = useState(100); // Default, will be updated
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorLearnerId, setErrorLearnerId] = useState(null);

    // Find the subject and initialize learner marks
    useEffect(() => {
        if (store.subjects && subjectId) {
            const foundSubject = store.subjects.find(s => s.id === subjectId);
            setSubject(foundSubject || null);

            if (foundSubject) {
                // Get enrolled learners for this subject
                const enrolledLearners = store.learners.filter(learner =>
                    foundSubject.enrolledLearnerIds.includes(learner.id)
                );

                // Initialize learner marks with default values
                const initialMarks = enrolledLearners.map(learner => ({
                    learnerId: learner.id,
                    learnerName: `${learner.name} ${learner.surname}`,
                    mark: -1, // -1 indicates not entered/absent
                    percentage: 0,
                    level: 0,
                    passed: false
                }));

                setLearnerMarks(initialMarks);

                // Set task details and total mark based on task name
                const decodedTaskName = decodeURIComponent(taskName);
                
                // Determine term based on task name
                let term = "Not specified";
                if (decodedTaskName.includes("Term 1")) term = "Term 1";
                else if (decodedTaskName.includes("Term 2")) term = "Term 2";
                else if (decodedTaskName.includes("Term 3")) term = "Term 3";
                else if (decodedTaskName.includes("Term 4")) term = "Term 4";
                
                setTask({ name: decodedTaskName, term });

                // Determine total mark based on task name and grade
                if (decodedTaskName.includes("Investigation")) setTotalMark(50);
                else if (decodedTaskName.includes("Test") && !decodedTaskName.includes("Exam")) {
                    setTotalMark(decodedTaskName.includes("Test 2") ? 75 : 100);
                }
                else if (decodedTaskName.includes("Assignment")) setTotalMark(50);
                else if (decodedTaskName.includes("June") || decodedTaskName.includes("Trial") || decodedTaskName.includes("Final")) {
                    setTotalMark(store.grade === "12" ? 150 : 100);
                }
            }
        }
    }, [store.subjects, subjectId, taskName, store.learners, store.grade]);

    // Update percentage and level when a mark changes
    const updateMark = (learnerId, newMark) => {
        const markValue = parseInt(newMark) || -1;
        
        // Validate mark
        if (markValue > totalMark) {
            setErrorMessage(`Mark cannot be bigger than task total (${totalMark})`);
            setErrorLearnerId(learnerId);
            setShowErrorModal(true);
            return;
        }

        setLearnerMarks(prev => prev.map(item => {
            if (item.learnerId === learnerId) {
                let percentage = 0;
                let level = 0;
                let passed = false;

                if (markValue >= 0) {
                    percentage = Math.round((markValue / totalMark) * 100);

                    // Determine level based on CAPS scale (1-7)
                    if (percentage >= 80) level = 7;
                    else if (percentage >= 70) level = 6;
                    else if (percentage >= 60) level = 5;
                    else if (percentage >= 50) level = 4;
                    else if (percentage >= 40) level = 3;
                    else if (percentage >= 30) level = 2;
                    else level = 1;

                    // Determine pass status - FIXED LOGIC
                    // Pass is 30% or higher (Level 2 and above)
                    passed = percentage >= 30;
                }

                return { ...item, mark: markValue, percentage, level, passed };
            }
            return item;
        }));
    };

    // Calculate statistics for the footer
    const calculateStats = () => {
        const validMarks = learnerMarks.filter(item => item.mark >= 0);
        if (validMarks.length === 0) {
            return { sum: 0, average: "0.00", passCount: 0, totalLearners: learnerMarks.length, markedCount: 0 };
        }

        const sum = validMarks.reduce((acc, item) => acc + item.mark, 0);
        const averagePercentage = (sum / (validMarks.length * totalMark)) * 100;
        const passCount = validMarks.filter(item => item.passed).length;

        return {
            sum,
            average: averagePercentage.toFixed(2),
            passCount,
            totalLearners: learnerMarks.length,
            markedCount: validMarks.length
        };
    };

    const stats = calculateStats();

    // Get color based on percentage for visual indicators
    const getColorForPercentage = (percentage) => {
        if (percentage >= 80) return "#10b981"; // green
        if (percentage >= 70) return "#3b82f6"; // blue
        if (percentage >= 60) return "#6366f1"; // indigo
        if (percentage >= 50) return "#8b5cf6"; // violet
        if (percentage >= 40) return "#f59e0b"; // amber
        return "#ef4444"; // red
    };

    // Handle button actions
    const handleSaveMarks = () => {
        // Validate all marks before saving
        const invalidMark = learnerMarks.find(item => item.mark > totalMark);
        if (invalidMark) {
            setErrorMessage(`Mark cannot be bigger than task total (${totalMark})`);
            setErrorLearnerId(invalidMark.learnerId);
            setShowErrorModal(true);
            return;
        }

        // In a real app, this would save to a backend
        alert("Marks saved successfully!");
    };

    const handleAnalyseTask = () => {
        // Navigate to analysis page or show analysis modal
        alert("Task analysis feature would be implemented here");
    };

    const handleExportCSV = () => {
        // Create CSV content
        let csvContent = "Learner Name,Mark,Percentage,Level,Status\n";
        learnerMarks.forEach(item => {
            csvContent += `${item.learnerName},${item.mark === -1 ? "Absent" : item.mark},${item.mark === -1 ? "Absent" : item.percentage + "%"},${item.mark === -1 ? "-" : item.level},${item.mark === -1 ? "Absent" : (item.passed ? "Passed" : "Failed")}\n`;
        });

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${task.name.replace(/\s+/g, '_')}_Marks.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            navigate(-1);
        }
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setErrorMessage("");
        setErrorLearnerId(null);
    };

    if (!subject || !task) {
        return (
            <Container fluid style={{ minHeight: "100vh", padding: "10px", backgroundColor: "#e2e8f0" }}>
                <Row className="mb-3 align-items-center">
                    <Col xs={10}>
                        <h2 style={{ color: "#1e2a38", fontSize: "1.5rem" }}>Task not found</h2>
                    </Col>
                    <Col xs={2} className="text-end">
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

    return (
        <Container fluid style={{ minHeight: "100vh", padding: "10px", backgroundColor: "#e2e8f0" }}>
            {/* Header */}
            <Row className="mb-3 align-items-center">
                <Col xs={12} md={8}>
                    <h2 style={{ color: "#1e2a38", fontSize: "1.5rem" }}>
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
                    <p style={{ color: "#64748b", fontSize: "0.9rem" }}>{task.name} • Mark Entry</p>
                </Col>
            </Row>

            {/* Task Info Card */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Row>
                    <Col xs={12} md={6}>
                        <h5 style={{ color: "#1e2a38" }}>Task Details</h5>
                        <p><strong>Task:</strong> {task.name}</p>
                        <p><strong>Term:</strong> {task.term}</p>
                        <p><strong>Total Mark:</strong> {totalMark}</p>
                        <Alert variant="info" className="mt-2">
                            <small>Total: {totalMark} — Pass mark = 30% (&gt;={Math.round(totalMark * 0.3)} marks)</small>
                        </Alert>
                    </Col>
                    <Col xs={12} md={6}>
                        <h5 style={{ color: "#1e2a38" }}>Instructions</h5>
                        <p>Enter marks for each learner. Use -1 or leave blank to indicate absence.</p>
                        <p>Percentages and levels are calculated automatically.</p>
                        <p>Pass is 30% or higher. Fail is a mark less than 30%.</p>
                    </Col>
                </Row>
            </Card>

            {/* Learner Marks Table - Responsive */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <div className="table-responsive">
                    <Table bordered hover>
                        <thead style={{ backgroundColor: "#1e2a38", color: "white" }}>
                            <tr>
                                <th>Learner Name</th>
                                <th>Mark</th>
                                <th>Percentage</th>
                                <th>Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {learnerMarks.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.learnerName}</td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            min="-1"
                                            max={totalMark}
                                            value={item.mark === -1 ? "" : item.mark}
                                            onChange={(e) => updateMark(item.learnerId, e.target.value)}
                                            style={{ 
                                                width: "80px",
                                                borderColor: errorLearnerId === item.learnerId ? "#ef4444" : undefined,
                                                borderWidth: errorLearnerId === item.learnerId ? "2px" : "1px"
                                            }}
                                        />
                                        {errorLearnerId === item.learnerId && (
                                            <div style={{ color: "#ef4444", fontSize: "0.8rem" }}>
                                                Mark cannot exceed {totalMark}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                display: "inline-block",
                                                padding: "4px 10px",
                                                borderRadius: "4px",
                                                backgroundColor: item.mark === -1 ? "#e5e7eb" : getColorForPercentage(item.percentage),
                                                color: item.mark === -1 ? "#6b7280" : "white",
                                                fontWeight: "500"
                                            }}
                                        >
                                            {item.mark === -1 ? "Absent" : `${item.percentage}%`}
                                        </div>
                                    </td>
                                    <td>
                                        {item.mark === -1 ? "-" : item.level}
                                    </td>
                                    <td>
                                        {item.mark === -1 ? (
                                            <span style={{ color: "#6b7280" }}>Absent</span>
                                        ) : item.passed ? (
                                            <span style={{ color: "#10b981", fontWeight: "bold" }}>Passed</span>
                                        ) : (
                                            <span style={{ color: "#ef4444", fontWeight: "bold" }}>Failed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {/* Statistics Card */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Row className="mb-3">
                    <Col xs={6} sm={4} md={2} className="mb-2">
                        <strong style={{ color: "#1e2a38", fontSize: "0.9rem" }}>Sum:</strong> {stats.sum}
                    </Col>
                    <Col xs={6} sm={4} md={2} className="mb-2">
                        <strong style={{ color: "#1e2a38", fontSize: "0.9rem" }}>Average:</strong> {stats.average}%
                    </Col>
                    <Col xs={6} sm={4} md={2} className="mb-2">
                        <strong style={{ color: "#1e2a38", fontSize: "0.9rem" }}>Pass:</strong> {stats.passCount}
                    </Col>
                    <Col xs={6} sm={4} md={2} className="mb-2">
                        <strong style={{ color: "#1e2a38", fontSize: "0.9rem" }}>Fail:</strong> {stats.markedCount - stats.passCount}
                    </Col>
                    <Col xs={6} sm={4} md={2} className="mb-2">
                        <strong style={{ color: "#1e2a38", fontSize: "0.9rem" }}>Marked:</strong> {stats.markedCount} / {stats.totalLearners}
                    </Col>
                </Row>

                {/* Action Buttons Card */}
                <Card className="mb-3" style={{ padding: "12px", border: "none" }}>
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">
                            <Button
                                style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                                onClick={handleSaveMarks}
                                className="flex-grow-1 flex-sm-grow-0"
                            >
                                Save Marks
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAnalyseTask}
                                className="flex-grow-1 flex-sm-grow-0"
                            >
                                Analyse Task
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleExportCSV}
                                className="flex-grow-1 flex-sm-grow-0"
                            >
                                Export CSV
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleCancel}
                                className="flex-grow-1 flex-sm-grow-0"
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Row>
                    <Col xs={12}>
                        <h6 style={{ color: "#1e2a38", fontSize: "0.9rem" }}>Color Key (Performance Levels):</h6>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#ef4444", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>&lt;30% (Fail)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#f59e0b", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>30-39% (Level 2 - Pass)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#10b981", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>40-49% (Level 3 - Pass)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#3b82f6", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>50-59% (Level 4 - Pass)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#6366f1", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>60-69% (Level 5 - Pass)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#8b5cf6", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>70-79% (Level 6 - Pass)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#8b5cf6", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>≥80% (Level 7 - Pass)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#e5e7eb", marginRight: "5px" }}></div>
                                <span style={{ fontSize: "0.8rem" }}>Absent (-1)</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Error Modal - Responsive */}
            <Modal show={showErrorModal} onHide={handleErrorModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Invalid Mark</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger">{errorMessage}</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleErrorModalClose} block>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MarkEntryPage;