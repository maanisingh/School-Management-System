import React, { useMemo, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { FaChartBar, FaBookOpen, FaUserGraduate } from "react-icons/fa";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminAnalysis = () => {
  const reportRef = useRef(); // for PDF capture
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const subjectPerformance = useMemo(
    () => ({
      labels: ["Math", "Science", "English", "History", "Computer"],
      datasets: [
        {
          label: "Average Marks",
          data: [78, 82, 74, 69, 88],
          backgroundColor: "rgba(126, 58, 242, 0.7)",
          borderRadius: 6,
        },
      ],
    }),
    []
  );

  const classDistribution = useMemo(
    () => ({
      labels: ["Grade 10A", "Grade 11B", "Grade 12C"],
      datasets: [
        {
          data: [58, 52, 60],
          backgroundColor: [
            "rgba(126, 58, 242, 0.7)",
            "rgba(30, 42, 56, 0.7)",
            "rgba(203, 213, 225, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    []
  );

  const styles = {
    page: { minHeight: "100vh", padding: "20px" },
    heading: { color: "#1e2a38", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
    card: { border: "1px solid #cbd5e1", borderRadius: "16px", padding: "15px", backgroundColor: "white", transition: "all 0.3s ease" },
    iconActive: { color: "#7e3af2", fontSize: "24px", marginRight: "10px" },
    primaryButton: { backgroundColor: "#7e3af2", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", marginRight: "8px" },
    secondaryButton: { border: "1px solid #7e3af2", color: "#7e3af2", backgroundColor: "transparent", borderRadius: "8px", padding: "8px 16px" },
  };

  const getCardStyle = (index) => ({ ...styles.card, backgroundColor: hoveredCard === index ? "rgba(126, 58, 242, 0.05)" : "white" });

  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("TeacherAnalysisReport.pdf");
  };

  return (
    <div style={styles.page}>
      <Container fluid ref={reportRef}>
        <h2 style={styles.heading}>
          <FaChartBar style={styles.iconActive} />
          Analysis Dashboard
        </h2>

        <Row xs={1} sm={2} md={3} className="g-3 mb-4">
          {[
            { icon: <FaUserGraduate style={styles.iconActive} />, title: "Total Learners", value: "170" },
            { icon: <FaBookOpen style={styles.iconActive} />, title: "Subjects", value: "5" },
            { icon: <FaChartBar style={styles.iconActive} />, title: "Average Score", value: "78%" },
          ].map((item, index) => (
            <Col key={index}>
              <Card style={getCardStyle(index)} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)}>
                <Card.Body className="d-flex align-items-center">
                  {item.icon}
                  <div>
                    <h5 style={{ color: "#1e2a38", margin: 0 }}>{item.title}</h5>
                    <p style={{ margin: 0, fontWeight: "bold", color: "#7e3af2" }}>{item.value}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card style={styles.card}>
              <Card.Body>
                <h5 style={{ color: "#1e2a38", marginBottom: "10px" }}>Subject-wise Performance</h5>
                <div style={{ width: "100%", height: "300px" }}>
                  <Bar data={subjectPerformance} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: { ticks: { color: "#1e2a38" }, grid: { display: false } },
                      y: { ticks: { color: "#1e2a38" }, beginAtZero: true, grid: { color: "rgba(203,213,225,0.3)" } },
                    },
                    plugins: { legend: { display: true, labels: { color: "#1e2a38" } } },
                  }} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={styles.card}>
              <Card.Body>
                <h5 style={{ color: "#1e2a38", marginBottom: "10px" }}>Class Distribution</h5>
                <div style={{ width: "100%", height: "300px" }}>
                  <Pie data={classDistribution} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "bottom", labels: { color: "#1e2a38" } } },
                  }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-4 d-flex flex-wrap">
          <Button style={styles.primaryButton} onClick={() => setShowModal(true)}>View Detailed Report</Button>
          <Button style={styles.secondaryButton} onClick={handleDownloadPDF}>Download PDF</Button>
        </div>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton><Modal.Title>Detailed Report</Modal.Title></Modal.Header>
        <Modal.Body>
          <h5 style={{ color: "#1e2a38" }}>Class 12C - Performance Overview</h5>
          <p style={{ color: "#1e2a38" }}>
            The average performance across all subjects shows consistent improvement.
            Math and Computer Science remain the strongest areas.
          </p>
          <ul style={{ color: "#1e2a38" }}>
            <li>Top Performer: Learner A (92%)</li>
            <li>Most Improved Subject: English (+8%)</li>
            <li>Lowest Average: History (69%)</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAnalysis;
