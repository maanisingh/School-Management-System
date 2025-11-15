import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Spinner, Alert } from "react-bootstrap";
import { FaArrowLeft, FaFilePdf, FaFileCsv } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- MOCK DATA GENERATOR ---
const generateMockTaskAnalysis = (taskId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                taskName: "June Examination Paper 1",
                term: "Term 2",
                subject: "Mathematics",
                grade: "12",
                totalLearners: 24,
                totalMarks: 1628,
                averagePercentage: 68.75,
                passCount: 19,
                passRate: 79.17,
                passCriteria: 30, // FET
                levelDistribution: {
                    "1 (0-29%)": 5,
                    "2 (30-39%)": 3,
                    "3 (40-49%)": 2,
                    "4 (50-59%)": 4,
                    "5 (60-69%)": 5,
                    "6 (70-79%)": 3,
                    "7 (80-100%)": 2
                },
                markRangeDistribution: {
                    "0-9": 1, "10-19": 2, "20-29": 2, "30-39": 3, "40-49": 2,
                    "50-59": 4, "60-69": 5, "70-79": 3, "80-89": 1, "90-100": 1
                }
            });
        }, 700);
    });
};

const SingleTaskAnalysisPage = () => {
    const { taskType, subjectId, taskId } = useParams();
    const navigate = useNavigate();
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await generateMockTaskAnalysis(taskId);
                setAnalysisData(data);
            } catch (err) {
                setError("Failed to load analysis data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [taskId]);

    const handleGoBack = () => {
        // More reliable navigation back to the selection page
        console.log("Navigating back to selection page");
        navigate(`/analysis/${taskType}/${subjectId}/select`);
    };

    const handleExport = (format) => {
        alert(`Exporting report as ${format.toUpperCase()}...`);
    };

    // Chart data for Levels (Bar Chart)
    const levelChartData = {
        labels: Object.keys(analysisData?.levelDistribution || {}),
        datasets: [
            {
                label: 'Number of Learners',
                data: Object.values(analysisData?.levelDistribution || {}),
                backgroundColor: 'rgba(126, 58, 242, 0.8)',
            },
        ],
    };
    const levelChartOptions = { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: { 
            legend: { position: 'top' }, 
            title: { display: true, text: 'Performance by CAPS Level' } 
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

    // Chart data for Mark Ranges (Histogram)
    const markRangeChartData = {
        labels: Object.keys(analysisData?.markRangeDistribution || {}),
        datasets: [
            {
                label: 'Number of Learners',
                data: Object.values(analysisData?.markRangeDistribution || {}),
                backgroundColor: Object.keys(analysisData?.markRangeDistribution || {}).map(range => {
                    const val = parseInt(range.split('-')[0]);
                    if (val < 40) return 'rgba(220, 53, 69, 0.8)'; // Red
                    if (val < 50) return 'rgba(255, 193, 7, 0.8)'; // Orange
                    return 'rgba(40, 167, 69, 0.8)'; // Green
                }),
            },
        ],
    };
    const markRangeChartOptions = { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: { 
            legend: { position: 'top' }, 
            title: { display: true, text: 'Mark Range Distribution' } 
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

    if (loading) return <Container className="text-center p-5"><Spinner animation="border" /> <p>Loading Analysis...</p></Container>;
    if (error) return <Container className="p-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!analysisData) return null;

    return (
        <Container fluid style={{ minHeight: "100vh", padding: "10px", backgroundColor: "#e2e8f0" }}>
            {/* Header */}
            <Row className="mb-3 align-items-center">
                <Col xs={12} sm={8} md={8}>
                    <Button variant="link" onClick={handleGoBack} className="p-0 me-3" style={{ color: "#7e3af2" }}>
                        <FaArrowLeft /> Back
                    </Button>
                    <h2 style={{ color: "#1e2a38", display: "inline-block", fontSize: "1.5rem" }}>
                        {analysisData.subject} Grade {analysisData.grade} - {analysisData.term}
                    </h2>
                    <p style={{ color: "#64748b", marginTop: "5px", fontSize: "0.9rem" }}>
                        Analysis for: <strong>{analysisData.taskName}</strong>
                    </p>
                </Col>
                <Col xs={12} sm={4} md={4} className="text-end mt-2 mt-sm-0">
                    <div className="d-flex flex-sm-row flex-column gap-2 justify-content-sm-end">
                        <Button variant="outline-secondary" onClick={() => handleExport('pdf')} style={{ border: "#7e3af2", color: "#7e3af2" }} className="flex-grow-1 flex-sm-grow-0">
                            <FaFilePdf /> Export PDF
                        </Button>
                        <Button variant="outline-secondary" onClick={() => handleExport('csv')} style={{ border: "#7e3af2", color: "#7e3af2" }} className="flex-grow-1 flex-sm-grow-0">
                            <FaFileCsv /> Export CSV
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Overall Stats - Now with 5 cards and better alignment */}
            <Row className="mb-4 justify-content-between">
                <Col xs={6} sm={4} md className="mb-3">
                    <Card className="text-center p-3 h-100">
                        <h5>{analysisData.totalLearners}</h5>
                        <p className="mb-0">Learners</p>
                    </Card>
                </Col>
                <Col xs={6} sm={4} md className="mb-3">
                    <Card className="text-center p-3 h-100">
                        <h5>{analysisData.totalMarks}</h5>
                        <p className="mb-0">Total Sum of Marks</p>
                    </Card>
                </Col>
                <Col xs={6} sm={4} md className="mb-3">
                    <Card className="text-center p-3 h-100">
                        <h5>{analysisData.averagePercentage}%</h5>
                        <p className="mb-0">Average Mark</p>
                    </Card>
                </Col>
                <Col xs={6} sm={4} md className="mb-3">
                    <Card className="text-center p-3 h-100">
                        <h5>{analysisData.passCount}</h5>
                        <p className="mb-0">Passed (≥{analysisData.passCriteria}%)</p>
                    </Card>
                </Col>
                <Col xs={6} sm={4} md className="mb-3">
                    <Card className="text-center p-3 h-100">
                        <h5>{analysisData.passRate}%</h5>
                        <p className="mb-0">Pass Rate</p>
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Card className="mb-4 p-3 p-md-4">
                <h5 style={{ color: "#1e2a38", marginBottom: "20px" }}>Performance Visualisation</h5>
                <Row>
                    <Col xs={12} md={6} className="mb-4 mb-md-0">
                        <div style={{ height: "300px" }}>
                            <Bar data={levelChartData} options={levelChartOptions} />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div style={{ height: "300px" }}>
                            <Bar data={markRangeChartData} options={markRangeChartOptions} />
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Detailed Tables */}
            <Row>
                <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                    <Card className="p-3 p-md-4 h-100">
                        <h5 style={{ color: "#1e2a38", marginBottom: "15px" }}>Level Distribution</h5>
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>Learners</th>
                                        <th>Class %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(analysisData.levelDistribution).map(([level, count]) => (
                                        <tr key={level}>
                                            <td>{level}</td>
                                            <td>{count}</td>
                                            <td>{((count / analysisData.totalLearners) * 100).toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </Col>
                <Col xs={12} lg={6}>
                    <Card className="p-3 p-md-4 h-100">
                        <h5 style={{ color: "#1e2a38", marginBottom: "15px" }}>Mark Range Distribution</h5>
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Mark Range</th>
                                        <th>Learners</th>
                                        <th>Class %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(analysisData.markRangeDistribution).map(([range, count]) => (
                                        <tr key={range}>
                                            <td>{range}%</td>
                                            <td>{count}</td>
                                            <td>{((count / analysisData.totalLearners) * 100).toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SingleTaskAnalysisPage;