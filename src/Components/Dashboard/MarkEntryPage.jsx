// src/components/MarkEntryPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, FormControl } from "react-bootstrap";
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
        return { id: classId, grade: "12", section: "", learners: [], subjects: [] };
    });

    const [subject, setSubject] = useState(null);
    const [task, setTask] = useState(null);
    const [learnerMarks, setLearnerMarks] = useState([]);
    const [totalMark, setTotalMark] = useState(100); // Default, will be updated

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
                    level: 0
                }));

                setLearnerMarks(initialMarks);

                // Set task details and total mark based on task name
                const decodedTaskName = decodeURIComponent(taskName);
                setTask({ name: decodedTaskName });

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
        setLearnerMarks(prev => prev.map(item => {
            if (item.learnerId === learnerId) {
                const markValue = parseInt(newMark) || -1;
                let percentage = 0;
                let level = 0;

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
                }

                return { ...item, mark: markValue, percentage, level };
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
        const passCount = validMarks.filter(item => (item.mark / totalMark) >= 0.5).length;

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
        // In a real app, this would save to a backend
        alert("Marks saved successfully!");
    };

    const handleAnalyseTask = () => {
        // Navigate to analysis page or show analysis modal
        alert("Task analysis feature would be implemented here");
    };

    const handleExportCSV = () => {
        // Create CSV content
        let csvContent = "Learner Name,Mark,Percentage,Level\n";
        learnerMarks.forEach(item => {
            csvContent += `${item.learnerName},${item.mark === -1 ? "Absent" : item.mark},${item.mark === -1 ? "Absent" : item.percentage + "%"},${item.mark === -1 ? "-" : item.level}\n`;
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

    if (!subject || !task) {
        return (
            <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h2 style={{ color: "#1e2a38" }}>Task not found</h2>
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
                    <p style={{ color: "#64748b" }}>{task.name} • Mark Entry</p>
                </Col>
            </Row>

            {/* Task Info Card */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Row>
                    <Col md={6}>
                        <h5 style={{ color: "#1e2a38" }}>Task Details</h5>
                        <p><strong>Task:</strong> {task.name}</p>
                        <p><strong>Total Mark:</strong> {totalMark}</p>
                    </Col>
                    <Col md={6}>
                        <h5 style={{ color: "#1e2a38" }}>Instructions</h5>
                        <p>Enter marks for each learner. Use -1 or leave blank to indicate absence.</p>
                        <p>Percentages and levels are calculated automatically.</p>
                    </Col>
                </Row>
            </Card>

            {/* Learner Marks Table */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Table responsive bordered hover>
                    <thead style={{ backgroundColor: "#1e2a38", color: "white" }}>
                        <tr>
                            <th>Learner Name</th>
                            <th>Mark</th>
                            <th>Percentage</th>
                            <th>Level</th>
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
                                        style={{ width: "80px" }}
                                    />
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            {/* Statistics Card */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Row className="mb-3">
                    <Col xs={12} md={2}>
                        <strong style={{ color: "#1e2a38" }}>Sum:</strong> {stats.sum}
                    </Col>
                    <Col xs={12} md={2}>
                        <strong style={{ color: "#1e2a38" }}>Average:</strong> {stats.average}%
                    </Col>
                    <Col xs={12} md={2}>
                        <strong style={{ color: "#1e2a38" }}>Pass:</strong> {stats.passCount}
                    </Col>
                    <Col xs={12} md={2}>
                        <strong style={{ color: "#1e2a38" }}>Fail:</strong> {stats.markedCount - stats.passCount}
                    </Col>
                    <Col xs={12} md={2}>
                        <strong style={{ color: "#1e2a38" }}>Marked:</strong> {stats.markedCount} / {stats.totalLearners}
                    </Col>
                </Row>

                {/* Action Buttons Card */}
                <Card className="mb-3" style={{ padding: "12px", border: "none" }}>
                    <Row className="justify-content-center">
                        <Col className="d-flex justify-content-around gap-3">
                            <Button
                                style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                                onClick={handleSaveMarks}
                            >
                                Save Marks
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAnalyseTask}
                            >
                                Analyse Task
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleExportCSV}
                            >
                                Export CSV
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Row>
                    <Col>
                        <h6 style={{ color: "#1e2a38" }}>Color Key (Performance Levels):</h6>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#ef4444", marginRight: "5px" }}></div>
                                <span>&lt;40% (Fail)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#f59e0b", marginRight: "5px" }}></div>
                                <span>40-49% (Level 3)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#10b981", marginRight: "5px" }}></div>
                                <span>50-59% (Level 4)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#3b82f6", marginRight: "5px" }}></div>
                                <span>60-69% (Level 5)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#6366f1", marginRight: "5px" }}></div>
                                <span>70-79% (Level 6)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#8b5cf6", marginRight: "5px" }}></div>
                                <span>≥70% (Level 7)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "15px", height: "15px", backgroundColor: "#e5e7eb", marginRight: "5px" }}></div>
                                <span>Absent (-1)</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>


        </Container>
    );
};

export default MarkEntryPage;