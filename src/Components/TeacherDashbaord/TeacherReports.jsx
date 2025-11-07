import React, { useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaFilePdf, FaFileExcel, FaChartBar, FaFileAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const TeacherReports = () => {
  const reportRef = useRef();

  // ✅ Inline Styles
  const styles = {
    page: {
      backgroundColor: "#e2e8f0",
      minHeight: "100vh",
      padding: "20px",
    },
    heading: {
      color: "#1e2a38",
      fontWeight: "bold",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    iconActive: {
      color: "#7e3af2",
      fontSize: "28px",
    },
    card: {
      border: "1px solid #cbd5e1",
      borderRadius: "16px",
      backgroundColor: "white",
      padding: "20px",
      transition: "all 0.3s ease",
    },
    cardHover: {
      backgroundColor: "rgba(126, 58, 242, 0.05)",
      transform: "translateY(-4px)",
    },
    primaryButton: {
      backgroundColor: "#7e3af2",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "8px 16px",
      marginRight: "10px",
    },
    secondaryButton: {
      border: "1px solid #7e3af2",
      color: "#7e3af2",
      backgroundColor: "transparent",
      borderRadius: "8px",
      padding: "8px 16px",
    },
    cardTitle: {
      color: "#1e2a38",
      fontWeight: "600",
      marginBottom: "5px",
    },
    cardText: {
      color: "#1e2a38",
      fontSize: "14px",
    },
  };

  // ✅ Dummy data for the report
  const reportData = [
    { class: "Grade 10A", subject: "Math", learners: 28, average: "76%" },
    { class: "Grade 11B", subject: "Science", learners: 30, average: "82%" },
    { class: "Grade 12C", subject: "English", learners: 32, average: "79%" },
  ];

  // ✅ Export to PDF
  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ClassReport.pdf");
  };

  // ✅ Export to Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Class Reports");
    XLSX.writeFile(workbook, "ClassReport.xlsx");
  };

  return (
    <div style={styles.page}>
      <Container fluid>
        {/* ===== Heading ===== */}
        <h2 style={styles.heading}>
          <FaChartBar style={styles.iconActive} /> Reports
        </h2>

        {/* ===== Cards Section ===== */}
        <Row xs={1} sm={2} md={3} className="g-4 mb-4">
          {reportData.map((item, index) => (
            <Col key={index}>
              <Card
                style={styles.card}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.cardHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, styles.card)
                }
              >
                <Card.Body>
                  <FaFileAlt style={styles.iconActive} />
                  <h5 style={styles.cardTitle}>{item.class}</h5>
                  <p style={styles.cardText}>
                    Subject: {item.subject}
                    <br />
                    Learners: {item.learners}
                    <br />
                    Average: {item.average}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ===== Download Buttons ===== */}
        <div
          className="d-flex flex-wrap"
          style={{ gap: "10px", marginBottom: "20px" }}
        >
          <Button style={styles.primaryButton} onClick={handleDownloadPDF}>
            <FaFilePdf style={{ marginRight: "8px" }} />
            Download PDF
          </Button>
          <Button style={styles.secondaryButton} onClick={handleDownloadExcel}>
            <FaFileExcel style={{ marginRight: "8px" }} />
            Download Excel
          </Button>
        </div>

        {/* ===== Report Table ===== */}
        <div ref={reportRef}>
          <Card style={{ ...styles.card, padding: "10px" }}>
            <Card.Body>
              <h5 style={{ ...styles.cardTitle, marginBottom: "10px" }}>
                Class Report Summary
              </h5>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "#1e2a38",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f1f5f9" }}>
                      <th style={{ border: "1px solid #cbd5e1", padding: "8px" }}>Class</th>
                      <th style={{ border: "1px solid #cbd5e1", padding: "8px" }}>Subject</th>
                      <th style={{ border: "1px solid #cbd5e1", padding: "8px" }}>Learners</th>
                      <th style={{ border: "1px solid #cbd5e1", padding: "8px" }}>Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0
                              ? "white"
                              : "rgba(126, 58, 242, 0.05)",
                        }}
                      >
                        <td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>
                          {item.class}
                        </td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>
                          {item.subject}
                        </td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>
                          {item.learners}
                        </td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>
                          {item.average}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TeacherReports;
