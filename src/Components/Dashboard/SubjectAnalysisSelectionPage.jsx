import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { FaArrowLeft, FaChartBar } from "react-icons/fa";

// --- MOCK DATA GENERATOR ---
const generateMockTasks = (subjectId, term) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (term === "Term 4") {
                resolve([]);
            } else {
                let tasks = [
                    { id: `task-${term}-1`, name: `${term} Assignment`, type: "Assignment" },
                    { id: `task-${term}-2`, name: `${term} Test`, type: "Test" },
                ];
                if (term === "Term 2") {
                    tasks = [
                        { id: "task-term2-assign", name: "Assignment", type: "Assignment" },
                        { id: "task-term2-exam1", name: "June Examination Paper 1", type: "Examination" },
                        { id: "task-term2-exam2", name: "June Examination Paper 2", type: "Examination" },
                    ];
                }
                resolve(tasks);
            }
        }, 500);
    });
};

const NoTasksPlaceholder = ({ term }) => (
    <Card className="text-center p-4" style={{ backgroundColor: "#f8f9fa", border: "1px dashed #dee2e6" }}>
        <p className="mb-0" style={{ color: "#6c757d" }}>(No formal tasks for this term)</p>
    </Card>
);

const SubjectAnalysisSelectionPage = () => {
    const { taskType, subjectId } = useParams();
    const navigate = useNavigate();
    const [selectedTerm, setSelectedTerm] = useState("");
    const [subjectData, setSubjectData] = useState({ name: "Mathematics", grade: "12B" });
    const [tasksForSelectedTerm, setTasksForSelectedTerm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const availableTerms = ["Term 1", "Term 2", "Term 3", "Term 4"];

    useEffect(() => {
        if (!selectedTerm) {
            setTasksForSelectedTerm([]);
            return;
        }
        const fetchTasks = async () => {
            setLoading(true);
            setError("");
            try {
                const tasks = await generateMockTasks(subjectId, selectedTerm);
                setTasksForSelectedTerm(tasks);
            } catch (err) {
                setError("Failed to load tasks. Please try again.");
                setTasksForSelectedTerm([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [selectedTerm, subjectId]);

    const handleAnalyseTask = (taskId) => {
        console.log("Navigating to task analysis for:", taskId);
        navigate(`/analysis/${taskType}/${subjectId}/task/${taskId}`);
    };

    const handleViewTermAnalysis = () => {
        const termSlug = selectedTerm.replace(" ", "-").toLowerCase();
        console.log("Navigating to term analysis for:", termSlug);
        navigate(`/analysis/${taskType}/${subjectId}/term/${termSlug}`);
    };

    const handleGoBack = () => {
        console.log("Navigating back");
        navigate(-1);
    };

    return (
        <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
            <Row className="mb-4 align-items-center">
                <Col>
                    <Button variant="link" onClick={handleGoBack} className="p-0 me-3" style={{ color: "#7e3af2" }}>
                        <FaArrowLeft /> Back to Class Workspace
                    </Button>
                    <h2 style={{ color: "#1e2a38", display: "inline-block" }}>
                        {subjectData.name} · Grade {subjectData.grade}
                    </h2>
                    <p style={{ color: "#64748b", marginTop: "5px" }}>Select a term and task to analyse</p>
                </Col>
            </Row>

            <Card className="mb-4" style={{ padding: "20px", border: "1px solid #cbd5e1" }}>
                <h5 style={{ color: "#1e2a38", marginBottom: "15px" }}>Term Selection</h5>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="termDropdown">
                            <Form.Label style={{ color: "#1e2a38" }}>Select Term</Form.Label>
                            <Form.Select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} style={{ borderColor: "#cbd5e1" }}>
                                <option value="" disabled>-- Select Term --</option>
                                {availableTerms.map((term) => (<option key={term} value={term}>{term}</option>))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Card>

            {selectedTerm && (
                <Card style={{ padding: "20px", border: "1px solid #cbd5e1" }}>
                    <h5 style={{ color: "#1e2a38", marginBottom: "20px" }}>{selectedTerm.toUpperCase()} TASKS</h5>
                    {loading && (<div className="text-center p-4"><Spinner animation="border" variant="primary" /><p className="mt-2" style={{ color: "#64748b" }}>Loading tasks...</p></div>)}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!loading && !error && (
                        <>
                            {tasksForSelectedTerm.length > 0 ? (
                                <>
                                    {tasksForSelectedTerm.map((task) => (
                                        <Row key={task.id} className="mb-3 align-items-center">
                                            <Col><p className="mb-0" style={{ color: "#1e2a38" }}>{task.name}</p></Col>
                                            <Col xs="auto">
                                                <Button variant="outline-primary" onClick={() => handleAnalyseTask(task.id)} style={{ border: "#7e3af2", color: "#7e3af2", backgroundColor: "transparent" }}>
                                                    <FaChartBar className="me-1" /> Analyse Task
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <hr className="my-4" />
                                    <Row className="align-items-center">
                                        <Col><p className="mb-0" style={{ color: "#1e2a38", fontWeight: "bold" }}>View combined analysis for {selectedTerm}</p></Col>
                                        <Col xs="auto">
                                            <Button onClick={handleViewTermAnalysis} style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}>
                                                View {selectedTerm} Analysis
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <NoTasksPlaceholder term={selectedTerm} />
                            )}
                        </>
                    )}
                </Card>
            )}
        </Container>
    );
};

export default SubjectAnalysisSelectionPage;