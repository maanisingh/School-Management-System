import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
  Badge,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Dropdown
} from "react-bootstrap";
import {
  FaFilter,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaTrophy,
  FaExclamationTriangle,
  FaUsers,
  FaPercentage,
  FaDownload,
  FaSearch,
  FaRedo,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFileExport,
  FaFilePdf,
  FaFileExcel,
  FaMedal,
  FaTimesCircle
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminAnalysis = () => {
  // State management
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const [analyticsData] = useState({
    totalLearners: 245,
    averageMarks: 78.5,
    topScorer: { name: "Priya Sharma", marks: 98 },
    lowestScorer: { name: "Rahul Verma", marks: 42 },
    passPercentage: 85.2,
    attendancePercentage: 92.3
  });

  const [gradePerformanceData] = useState([
    { grade: "Grade 9", marks: 75, students: 60 },
    { grade: "Grade 10", marks: 82, students: 65 },
    { grade: "Grade 11", marks: 78, students: 55 },
    { grade: "Grade 12", marks: 85, students: 65 }
  ]);

  const [termTrendData] = useState([
    { term: "Mid-term 1", marks: 72 },
    { term: "Mid-term 2", marks: 75 },
    { term: "Final", marks: 78 }
  ]);

  const [passFailData] = useState([
    { name: "Pass", value: 85, color: "#25D366" },
    { name: "Fail", value: 15, color: "#ef4444" }
  ]);

  const [topPerformers] = useState([
    { rank: 1, name: "Priya Sharma", grade: "12-A", marks: 98, subject: "Mathematics" },
    { rank: 2, name: "Amit Kumar", grade: "11-B", marks: 95, subject: "Physics" },
    { rank: 3, name: "Sneha Patel", grade: "12-A", marks: 94, subject: "Chemistry" },
    { rank: 4, name: "Vikram Singh", grade: "10-B", marks: 92, subject: "Biology" },
    { rank: 5, name: "Anjali Gupta", grade: "11-A", marks: 90, subject: "History" }
  ]);

  const [bottomPerformers] = useState([
    { rank: 1, name: "Rahul Verma", grade: "9-B", marks: 42, subject: "Mathematics" },
    { rank: 2, name: "Kavita Nair", grade: "10-A", marks: 45, subject: "Physics" },
    { rank: 3, name: "Rohit Sharma", grade: "11-B", marks: 48, subject: "Chemistry" },
    { rank: 4, name: "Meera Joshi", grade: "9-A", marks: 50, subject: "Biology" },
    { rank: 5, name: "Arjun Reddy", grade: "10-B", marks: 52, subject: "History" }
  ]);

  const [learnerData] = useState([
    { id: 1, name: "Priya Sharma", rollNo: "101", class: "12-A", subject: "Mathematics", term: "Final", marks: 98, grade: "A+", status: "Pass" },
    { id: 2, name: "Amit Kumar", rollNo: "102", class: "11-B", subject: "Physics", term: "Final", marks: 95, grade: "A+", status: "Pass" },
    { id: 3, name: "Sneha Patel", rollNo: "103", class: "12-A", subject: "Chemistry", term: "Final", marks: 94, grade: "A+", status: "Pass" },
    { id: 4, name: "Vikram Singh", rollNo: "104", class: "10-B", subject: "Biology", term: "Final", marks: 92, grade: "A+", status: "Pass" },
    { id: 5, name: "Anjali Gupta", rollNo: "105", class: "11-A", subject: "History", term: "Final", marks: 90, grade: "A+", status: "Pass" },
    { id: 6, name: "Rahul Verma", rollNo: "106", class: "9-B", subject: "Mathematics", term: "Final", marks: 42, grade: "F", status: "Fail" },
    { id: 7, name: "Kavita Nair", rollNo: "107", class: "10-A", subject: "Physics", term: "Final", marks: 45, grade: "F", status: "Fail" },
    { id: 8, name: "Rohit Sharma", rollNo: "108", class: "11-B", subject: "Chemistry", term: "Final", marks: 48, grade: "F", status: "Fail" }
  ]);

  const grades = ["all", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const sections = ["all", "A", "B", "C", "D"];
  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "English"];
  const terms = ["all", "Mid-term 1", "Mid-term 2", "Final", "Assignment 1", "Assignment 2"];
  const teachers = ["all", "Dr. R. Sharma", "Mrs. S. Patel", "Mr. A. Kumar", "Dr. P. Singh"];

  // Apply filters
  const applyFilters = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would fetch filtered data from the API
      alert("Filters applied successfully!");
    }, 1000);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedGrade("all");
    setSelectedSection("all");
    setSelectedSubject("all");
    setSelectedTerm("all");
    setSelectedTeacher("all");
    setDateRange({ start: "", end: "" });
    setSearchTerm("");
    alert("Filters reset successfully!");
  };

  // Export report
  const exportReport = (format) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Report exported as ${format} successfully!`);
    }, 1000);
  };

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  // Filter learner data
  const filteredLearnerData = learnerData.filter(learner => {
    const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sort learner data
  const sortedLearnerData = [...filteredLearnerData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div style={{ backgroundColor: "#e2e8f0", minHeight: "100vh", color: "#1e2a38", padding: "15px 0" }}>
      <Container fluid style={{ maxWidth: "98%", px: 2 }}>
        
        {/* Header */}
        <Row className="mb-4 mb-md-4 align-items-center">
          <Col xs={12} lg={8} className="mb-3 mb-lg-0">
            <h3 style={{ 
              color: "#1e2a38", 
              fontWeight: "600",
              fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
              marginBottom: "8px",
              lineHeight: "1.2"
            }}>
              <FaChartBar className="me-2" style={{ color: "#7e3af2" }} />
              Analytics Dashboard
            </h3>
            <p className="mb-0" style={{ 
              color: "#1e2a38", 
              opacity: "0.8",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: "1.4"
            }}>
              Comprehensive analysis of student performance across grades and subjects
            </p>
          </Col>
          <Col xs={12} lg={4}>
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-end gap-2 h-100 align-items-center align-items-lg-start">
              <Dropdown>
                <Dropdown.Toggle 
                  style={{ 
                    backgroundColor: "#7e3af2", 
                    border: "none", 
                    color: "white",
                    transition: "all 0.3s ease",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    padding: "10px 16px",
                    height: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    lineHeight: "1.2"
                  }} 
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#6a2fd9";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#7e3af2";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <FaFileExport className="me-2" style={{ flexShrink: 0 }} /> <span>Export Report</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => exportReport("PDF")}>
                    <FaFilePdf className="me-2" /> Export as PDF
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => exportReport("Excel")}>
                    <FaFileExcel className="me-2" /> Export as Excel
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>

        {/* Filters Panel */}
        <Card className="mb-4" style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
          <Card.Body style={{ padding: "20px" }}>
            <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
              <FaFilter className="me-2" style={{ color: "#7e3af2" }} />
              Filters
            </h5>
            <Row className="g-3">
              <Col xs={12} sm={6} md={4} lg={2}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Grade / Class
                  </Form.Label>
                  <Form.Select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {grades.map(grade => (
                      <option key={grade} value={grade}>
                        {grade === "all" ? "All Grades" : `Grade ${grade}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Section
                  </Form.Label>
                  <Form.Select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {sections.map(section => (
                      <option key={section} value={section}>
                        {section === "all" ? "All Sections" : `Section ${section}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Subject
                  </Form.Label>
                  <Form.Select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Term / Exam
                  </Form.Label>
                  <Form.Select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {terms.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Teacher
                  </Form.Label>
                  <Form.Select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>
                        {teacher === "all" ? "All Teachers" : teacher}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Date Range
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      style={{ 
                        backgroundColor: "white", 
                        border: "1px solid #cbd5e1", 
                        color: "#1e2a38",
                        fontSize: "clamp(0.75rem, 2vw, 0.875rem)"
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={12} className="d-flex justify-content-end gap-2">
                <Button 
                  style={{ 
                    backgroundColor: "#7e3af2", 
                    border: "none", 
                    color: "white",
                    transition: "all 0.3s ease",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    lineHeight: "1.2"
                  }} 
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#6a2fd9";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#7e3af2";
                    e.target.style.transform = "translateY(0)";
                  }}
                  onClick={applyFilters}
                  disabled={loading}
                >
                  {loading ? <Spinner as="span" animation="border" size="sm" /> : <><FaSearch className="me-2" /> Apply Filters</>}
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: "#1e2a38", 
                    border: "1px solid #7e3af2", 
                    color: "#7e3af2",
                    transition: "all 0.3s ease",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    lineHeight: "1.2"
                  }} 
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#7e3af2";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#7e3af2";
                    e.target.style.transform = "translateY(0)";
                  }}
                  onClick={resetFilters}
                >
                  <FaRedo className="me-2" /> Reset Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* KPI Cards */}
        <Row className="g-2 g-md-3 mb-4">
          <Col xs={6} md={4} lg={2}>
            <Card 
              className="text-center p-2 p-md-3 h-100" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(126, 58, 242, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaUsers size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Total Learners</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{analyticsData.totalLearners}</h4>
            </Card>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Card 
              className="text-center p-2 p-md-3 h-100" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(126, 58, 242, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaChartLine size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Average Marks</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{analyticsData.averageMarks}%</h4>
            </Card>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Card 
              className="text-center p-2 p-md-3 h-100" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(126, 58, 242, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaTrophy size={window.innerWidth < 768 ? 25 : 30} color="#25D366" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Top Scorer</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)"
              }}>{analyticsData.topScorer.name}</h4>
              <h6 style={{ 
                color: "#25D366", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}>{analyticsData.topScorer.marks}%</h6>
            </Card>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Card 
              className="text-center p-2 p-md-3 h-100" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(126, 58, 242, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaExclamationTriangle size={window.innerWidth < 768 ? 25 : 30} color="#ef4444" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Lowest Scorer</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)"
              }}>{analyticsData.lowestScorer.name}</h4>
              <h6 style={{ 
                color: "#ef4444", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}>{analyticsData.lowestScorer.marks}%</h6>
            </Card>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Card 
              className="text-center p-2 p-md-3 h-100" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(126, 58, 242, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaPercentage size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Pass %</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{analyticsData.passPercentage}%</h4>
            </Card>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Card 
              className="text-center p-2 p-md-3 h-100" 
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(126, 58, 242, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaUsers size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Attendance %</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{analyticsData.attendancePercentage}%</h4>
            </Card>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row className="g-3 mb-4">
          <Col xs={12} lg={6}>
            <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
              <Card.Body style={{ padding: "20px" }}>
                <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                  <FaChartBar className="me-2" style={{ color: "#7e3af2" }} />
                  Average Marks per Grade
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="grade" tick={{ fill: "#1e2a38" }} />
                    <YAxis tick={{ fill: "#1e2a38" }} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.9)", 
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px"
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="marks" fill="#7e3af2" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={6}>
            <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
              <Card.Body style={{ padding: "20px" }}>
                <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                  <FaChartLine className="me-2" style={{ color: "#7e3af2" }} />
                  Performance Trend Across Terms
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={termTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="term" tick={{ fill: "#1e2a38" }} />
                    <YAxis tick={{ fill: "#1e2a38" }} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.9)", 
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px"
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="marks" stroke="#7e3af2" strokeWidth={3} dot={{ fill: "#4f46e5", r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pie Chart and Leaderboards Row */}
        <Row className="g-3 mb-4">
          <Col xs={12} lg={4}>
            <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
              <Card.Body style={{ padding: "20px" }}>
                <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                  <FaChartPie className="me-2" style={{ color: "#7e3af2" }} />
                  Pass/Fail Ratio
                </h5>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={passFailData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {passFailData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="d-flex justify-content-center mt-2">
                  {passFailData.map((entry, index) => (
                    <div key={index} className="d-flex align-items-center me-3">
                      <div 
                        style={{ 
                          width: "12px", 
                          height: "12px", 
                          backgroundColor: entry.color, 
                          borderRadius: "2px",
                          marginRight: "5px"
                        }} 
                      />
                      <span style={{ fontSize: "14px", color: "#1e2a38" }}>
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
              <Card.Body style={{ padding: "20px" }}>
                <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                  <FaTrophy className="me-2" style={{ color: "#25D366" }} />
                  Top Performers
                </h5>
                <div className="table-responsive">
                  <Table size="sm" hover>
                    <thead>
                      <tr>
                        <th style={{ color: "#1e2a38", fontSize: "14px" }}>Rank</th>
                        <th style={{ color: "#1e2a38", fontSize: "14px" }}>Name</th>
                        <th style={{ color: "#1e2a38", fontSize: "14px" }}>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPerformers.map((performer, index) => (
                        <tr key={index}>
                          <td style={{ color: "#1e2a38", fontSize: "14px" }}>
                            {performer.rank === 1 ? <FaMedal color="#FFD700" /> : performer.rank}
                          </td>
                          <td style={{ color: "#1e2a38", fontSize: "14px" }}>{performer.name}</td>
                          <td style={{ color: "#25D366", fontSize: "14px", fontWeight: "600" }}>{performer.marks}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
              <Card.Body style={{ padding: "20px" }}>
                <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                  <FaExclamationTriangle className="me-2" style={{ color: "#ef4444" }} />
                  Bottom Performers
                </h5>
                <div className="table-responsive">
                  <Table size="sm" hover>
                    <thead>
                      <tr>
                        <th style={{ color: "#1e2a38", fontSize: "14px" }}>Rank</th>
                        <th style={{ color: "#1e2a38", fontSize: "14px" }}>Name</th>
                        <th style={{ color: "#1e2a38", fontSize: "14px" }}>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bottomPerformers.map((performer, index) => (
                        <tr key={index}>
                          <td style={{ color: "#1e2a38", fontSize: "14px" }}>
                            {performer.rank === 1 ? <FaTimesCircle color="#ef4444" /> : performer.rank}
                          </td>
                          <td style={{ color: "#1e2a38", fontSize: "14px" }}>{performer.name}</td>
                          <td style={{ color: "#ef4444", fontSize: "14px", fontWeight: "600" }}>{performer.marks}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Data Table */}
        <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
          <Card.Body style={{ padding: "20px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: "#1e2a38", fontWeight: "600" }}>
                Learner Performance Data
              </h5>
              <InputGroup style={{ maxWidth: "300px" }}>
                <InputGroup.Text style={{ backgroundColor: "white", border: "1px solid #cbd5e1", color: "#1e2a38" }}>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search learners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    backgroundColor: "white", 
                    border: "1px solid #cbd5e1", 
                    color: "#1e2a38"
                  }}
                />
              </InputGroup>
            </div>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr style={{ backgroundColor: "#7e3af2", color: "white" }}>
                    <th 
                      style={{ 
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => requestSort('name')}
                    >
                      Name {getSortIcon('name')}
                    </th>
                    <th 
                      style={{ 
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => requestSort('rollNo')}
                    >
                      Roll No {getSortIcon('rollNo')}
                    </th>
                    <th style={{ whiteSpace: "nowrap" }}>Class / Section</th>
                    <th style={{ whiteSpace: "nowrap" }}>Subject</th>
                    <th style={{ whiteSpace: "nowrap" }}>Term / Exam</th>
                    <th 
                      style={{ 
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => requestSort('marks')}
                    >
                      Marks {getSortIcon('marks')}
                    </th>
                    <th style={{ whiteSpace: "nowrap" }}>Grade</th>
                    <th style={{ whiteSpace: "nowrap" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLearnerData.map((learner) => (
                    <tr 
                      key={learner.id}
                      style={{ 
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(126,58,242,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
                      <td style={{ verticalAlign: "middle" }}>{learner.name}</td>
                      <td style={{ verticalAlign: "middle" }}>{learner.rollNo}</td>
                      <td style={{ verticalAlign: "middle" }}>{learner.class}</td>
                      <td style={{ verticalAlign: "middle" }}>{learner.subject}</td>
                      <td style={{ verticalAlign: "middle" }}>{learner.term}</td>
                      <td style={{ verticalAlign: "middle" }}>{learner.marks}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        <Badge 
                          style={{
                            backgroundColor: getGradeColor(learner.grade),
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "4px"
                          }}
                        >
                          {learner.grade}
                        </Badge>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <Badge 
                          style={{
                            backgroundColor: learner.status === "Pass" ? "#25D366" : "#ef4444",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "4px"
                          }}
                        >
                          {learner.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

      </Container>
    </div>
  );

  // Helper function to get grade color
  function getGradeColor(grade) {
    switch (grade) {
      case "A+":
      case "A":
        return "#25D366";
      case "B+":
      case "B":
        return "#7e3af2";
      case "C+":
      case "C":
        return "#ffc107";
      default:
        return "#ef4444";
    }
  }
};

export default AdminAnalysis;;