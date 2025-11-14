import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap"; // FIXED: Added Spinner and Alert
import { FaArrowLeft, FaFilePdf, FaFileCsv } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- MOCK DATA GENERATOR ---
const generateMockTermAnalysis = (subjectId, termId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                termName: termId.replace('-', ' ').toUpperCase(),
                subject: "Mathematics",
                grade: "12",
                totalLearners: 24,
                averagePercentage: 72.5,
                passCount: 21,
                passRate: 87.5,
                passCriteria: 30,
                levelDistribution: {
                    "1 (0-29%)": 3,
                    "2 (30-39%)": 2,
                    "3 (40-49%)": 1,
                    "4 (50-59%)": 3,
                    "5 (60-69%)": 5,
                    "6 (70-79%)": 6,
                    "7 (80-100%)": 4
                },
                markRangeDistribution: {
                    "0-9": 0, "10-19": 1, "20-29": 2, "30-39": 2, "40-49": 1,
                    "50-59": 3, "60-69": 5, "70-79": 6, "80-89": 3, "90-100": 1
                },
                taskContributions: [
                    { name: "Assignment", weight: 25, classAvg: 75 },
                    { name: "June Exam P1", weight: 37.5, classAvg: 70 },
                    { name: "June Exam P2", weight: 37.5, classAvg: 72 },
                ]
            });
        }, 700);
    });
};

const TermAnalysisPage = () => {
    const { taskType, subjectId, termId } = useParams();
    const navigate = useNavigate();
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await generateMockTermAnalysis(subjectId, termId);
                setAnalysisData(data);
            } catch (err) {
                setError("Failed to load term analysis data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [subjectId, termId]);

    const handleGoBack = () => {
        // More reliable navigation back to the selection page
        console.log("Navigating back to selection page");
        navigate(`/analysis/${taskType}/${subjectId}/select`);
    };

    const handleExport = (format) => {
        alert(`Exporting term report as ${format.toUpperCase()}...`);
    };

    // Chart data for Levels
    const levelChartData = {
        labels: Object.keys(analysisData?.levelDistribution || {}),
        datasets: [{
            label: 'Number of Learners',
            data: Object.values(analysisData?.levelDistribution || {}),
            backgroundColor: 'rgba(126, 58, 242, 0.8)',
        }],
    };
    const levelChartOptions = { 
        responsive: true, 
        plugins: { 
            legend: { position: 'top' }, 
            title: { display: true, text: 'Combined Performance by CAPS Level' } 
        }, 
        scales: { 
            y: { 
                beginAtZero: true, 
                ticks: { 
                    stepSize: 1,
                    precision: 0 // Ensure integer values on y-axis
                } 
            } 
        } 
    };

    if (loading) return <Container className="text-center p-5"><Spinner animation="border" /> <p>Loading Term Analysis...</p></Container>;
    if (error) return <Container className="p-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!analysisData) return null;

    return (
        <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
            {/* Header */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <Button variant="link" onClick={handleGoBack} className="p-0 me-3" style={{ color: "#7e3af2" }}>
                        <FaArrowLeft /> Back
                    </Button>
                    <h2 style={{ color: "#1e2a38", display: "inline-block" }}>
                        {analysisData.subject} Grade {analysisData.grade}
                    </h2>
                    <p style={{ color: "#64748b", marginTop: "5px" }}>
                        Combined Analysis for: <strong>{analysisData.termName}</strong>
                    </p>
                </Col>
                <Col xs="auto">
                    <Button variant="outline-secondary" className="me-2" onClick={() => handleExport('pdf')} style={{ border: "#7e3af2", color: "#7e3af2" }}>
                        <FaFilePdf /> Export PDF
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleExport('csv')} style={{ border: "#7e3af2", color: "#7e3af2" }}>
                        <FaFileCsv /> Export CSV
                    </Button>
                </Col>
            </Row>

            {/* Overall Stats */}
            <Row className="mb-4">
                <Col md={3}><Card className="text-center p-3"><h5>{analysisData.totalLearners}</h5><p>Learners</p></Card></Col>
                <Col md={3}><Card className="text-center p-3"><h5>{analysisData.averagePercentage}%</h5><p>Weighted Average</p></Card></Col>
                <Col md={3}><Card className="text-center p-3"><h5>{analysisData.passCount}</h5><p>Passed (≥{analysisData.passCriteria}%)</p></Card></Col>
                <Col md={3}><Card className="text-center p-3"><h5>{analysisData.passRate}%</h5><p>Pass Rate</p></Card></Col>
            </Row>

            {/* Charts and Task Contributions */}
            <Row className="mb-4">
                <Col md={8}>
                    <Card className="p-4 h-100">
                        <h5 style={{ color: "#1e2a38", marginBottom: "20px" }}>Overall Performance Distribution</h5>
                        <Bar data={levelChartData} options={levelChartOptions} />
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-4 h-100">
                        <h5 style={{ color: "#1e2a38", marginBottom: "20px" }}>Task Contributions</h5>
                        {analysisData.taskContributions.map((task, index) => (
                            <div key={index} className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <span>{task.name}</span>
                                    <span>{task.classAvg}%</span>
                                </div>
                                <div className="progress" style={{ height: '10px' }}>
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${task.classAvg}%`, backgroundColor: '#7e3af2' }}
                                        aria-valuenow={task.classAvg}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                                <small className="text-muted">Weight: {task.weight}%</small>
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TermAnalysisPage;