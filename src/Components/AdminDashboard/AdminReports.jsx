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
  Pagination,
  Alert,
  Modal,
  Tab,
  Tabs,
  Dropdown,
  ProgressBar
} from "react-bootstrap";
import {
  FaFilePdf,
  FaFileExcel,
  FaFilter,
  FaSearch,
  FaRedo,
  FaDownload,
  FaChartBar,
  FaChartLine,
  FaTrophy,
  FaExclamationTriangle,
  FaUsers,
  FaPercentage,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFileExport,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserCheck,
  FaUserTimes,
  FaEye,
  FaPrint,
  FaCog,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaEllipsisV,
  FaChartPie
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

const AdminReports = () => {
  // State management
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [exportFormat, setExportFormat] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sample data
  const [reportData] = useState([
    { id: 1, name: "Priya Sharma", rollNo: "101", class: "12-A", section: "A", subject: "Mathematics", term: "Final", marks: 95, attendance: 92, grade: "A+", status: "Active", email: "priya.sharma@example.com", phone: "9876543210" },
    { id: 2, name: "Amit Kumar", rollNo: "102", class: "11-B", section: "B", subject: "Physics", term: "Final", marks: 88, attendance: 85, grade: "A", status: "Active", email: "amit.kumar@example.com", phone: "9876543211" },
    { id: 3, name: "Sneha Patel", rollNo: "103", class: "12-A", section: "A", subject: "Chemistry", term: "Final", marks: 92, attendance: 90, grade: "A+", status: "Active", email: "sneha.patel@example.com", phone: "9876543212" },
    { id: 4, name: "Vikram Singh", rollNo: "104", class: "10-B", section: "B", subject: "Biology", term: "Final", marks: 78, attendance: 82, grade: "B+", status: "Active", email: "vikram.singh@example.com", phone: "9876543213" },
    { id: 5, name: "Anjali Gupta", rollNo: "105", class: "11-A", section: "A", subject: "History", term: "Final", marks: 85, attendance: 88, grade: "A", status: "Active", email: "anjali.gupta@example.com", phone: "9876543214" },
    { id: 6, name: "Rahul Verma", rollNo: "106", class: "9-B", section: "B", subject: "Mathematics", term: "Final", marks: 65, attendance: 75, grade: "C+", status: "Active", email: "rahul.verma@example.com", phone: "9876543215" },
    { id: 7, name: "Kavita Nair", rollNo: "107", class: "10-A", section: "A", subject: "Physics", term: "Final", marks: 72, attendance: 78, grade: "B", status: "Active", email: "kavita.nair@example.com", phone: "9876543216" },
    { id: 8, name: "Rohit Sharma", rollNo: "108", class: "11-B", section: "B", subject: "Chemistry", term: "Final", marks: 58, attendance: 70, grade: "C", status: "Inactive", email: "rohit.sharma@example.com", phone: "9876543217" },
    { id: 9, name: "Meera Joshi", rollNo: "109", class: "9-A", section: "A", subject: "Biology", term: "Final", marks: 82, attendance: 85, grade: "A", status: "Active", email: "meera.joshi@example.com", phone: "9876543218" },
    { id: 10, name: "Arjun Reddy", rollNo: "110", class: "10-B", section: "B", subject: "History", term: "Final", marks: 75, attendance: 80, grade: "B+", status: "Active", email: "arjun.reddy@example.com", phone: "9876543219" },
    { id: 11, name: "Neha Singh", rollNo: "111", class: "12-A", section: "A", subject: "Mathematics", term: "Mid-term", marks: 90, attendance: 92, grade: "A+", status: "Active", email: "neha.singh@example.com", phone: "9876543220" },
    { id: 12, name: "Karan Patel", rollNo: "112", class: "11-B", section: "B", subject: "Physics", term: "Mid-term", marks: 85, attendance: 88, grade: "A", status: "Active", email: "karan.patel@example.com", phone: "9876543221" }
  ]);

  // Analytics data
  const [analyticsData, setAnalyticsData] = useState({
    totalLearners: 0,
    averageMarks: 0,
    passPercentage: 0,
    failPercentage: 0,
    topScorer: { name: "", marks: 0 },
    lowestScorer: { name: "", marks: 0 },
    attendanceRate: 0,
    subjectPerformance: [],
    gradeDistribution: []
  });

  // Chart data
  const [gradeDistributionData, setGradeDistributionData] = useState([]);
  const [subjectPerformanceData, setSubjectPerformanceData] = useState([]);

  // Dropdown options
  const grades = ["all", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const sections = ["all", "A", "B", "C", "D"];
  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "English"];
  const terms = ["all", "Mid-term", "Final", "Assignment 1", "Assignment 2"];
  const teachers = ["all", "Dr. R. Sharma", "Mrs. S. Patel", "Mr. A. Kumar", "Dr. P. Singh"];
  const statuses = ["all", "Active", "Inactive"];

  // Apply filters
  const applyFilters = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
      updateAnalytics();
      updateChartData();
    }, 1000);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedGrade("all");
    setSelectedSection("all");
    setSelectedSubject("all");
    setSelectedTerm("all");
    setSelectedTeacher("all");
    setSelectedStatus("all");
    setDateRange({ start: "", end: "" });
    setSearchTerm("");
    setShowPreview(false);
    setSelectedRows([]);
    setSelectAll(false);
  };

  // Update analytics based on filtered data
  const updateAnalytics = () => {
    const filteredData = getFilteredData();
    const totalLearners = filteredData.length;
    const averageMarks = totalLearners > 0 
      ? filteredData.reduce((sum, learner) => sum + learner.marks, 0) / totalLearners 
      : 0;
    
    const passCount = filteredData.filter(learner => learner.marks >= 60).length;
    const passPercentage = totalLearners > 0 ? (passCount / totalLearners) * 100 : 0;
    const failPercentage = 100 - passPercentage;
    
    const attendanceRate = totalLearners > 0 
      ? filteredData.reduce((sum, learner) => sum + learner.attendance, 0) / totalLearners 
      : 0;
    
    const topScorer = totalLearners > 0 
      ? filteredData.reduce((max, learner) => learner.marks > max.marks ? learner : max, filteredData[0])
      : { name: "", marks: 0 };
    
    const lowestScorer = totalLearners > 0 
      ? filteredData.reduce((min, learner) => learner.marks < min.marks ? learner : min, filteredData[0])
      : { name: "", marks: 0 };
    
    setAnalyticsData({
      totalLearners,
      averageMarks,
      passPercentage,
      failPercentage,
      topScorer,
      lowestScorer,
      attendanceRate
    });
  };

  // Update chart data
  const updateChartData = () => {
    const filteredData = getFilteredData();
    
    // Grade distribution
    const gradeCounts = {};
    filteredData.forEach(learner => {
      gradeCounts[learner.grade] = (gradeCounts[learner.grade] || 0) + 1;
    });
    
    const gradeData = Object.keys(gradeCounts).map(grade => ({
      name: grade,
      value: gradeCounts[grade],
      color: getGradeColor(grade)
    }));
    
    setGradeDistributionData(gradeData);
    
    // Subject performance
    const subjectMarks = {};
    filteredData.forEach(learner => {
      if (!subjectMarks[learner.subject]) {
        subjectMarks[learner.subject] = { total: 0, count: 0 };
      }
      subjectMarks[learner.subject].total += learner.marks;
      subjectMarks[learner.subject].count += 1;
    });
    
    const subjectData = Object.keys(subjectMarks).map(subject => ({
      subject,
      average: Math.round(subjectMarks[subject].total / subjectMarks[subject].count)
    }));
    
    setSubjectPerformanceData(subjectData);
  };

  // Get filtered data
  const getFilteredData = () => {
    return reportData.filter(learner => {
      const matchesGrade = selectedGrade === "all" || learner.class.includes(selectedGrade);
      const matchesSection = selectedSection === "all" || learner.section === selectedSection;
      const matchesSubject = selectedSubject === "all" || learner.subject === selectedSubject;
      const matchesTerm = selectedTerm === "all" || learner.term === selectedTerm;
      const matchesStatus = selectedStatus === "all" || learner.status === selectedStatus;
      const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           learner.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesGrade && matchesSection && matchesSubject && matchesTerm && matchesStatus && matchesSearch;
    });
  };

  // Handle export
  const handleExport = (format) => {
    setExportFormat(format);
    setShowExportModal(true);
  };

  const confirmExport = () => {
    setLoading(true);
    // Simulate export process
    setTimeout(() => {
      setLoading(false);
      setShowExportModal(false);
      alert(`Report exported as ${exportFormat} successfully!`);
    }, 2000);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
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

  // Handle row selection
  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Filter and sort data for table
  const filteredData = getFilteredData();
  const sortedData = [...filteredData].sort((a, b) => {
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get grade color
  const getGradeColor = (grade) => {
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
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ 
          backgroundColor: "white", 
          border: "1px solid #cbd5e1", 
          borderRadius: "4px",
          padding: "10px"
        }}>
          <p style={{ margin: "0", fontWeight: "bold" }}>{`${label}`}</p>
          <p style={{ margin: "0" }}>{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
              <FaFileExport className="me-2" style={{ color: "#7e3af2" }} />
              Reports
            </h3>
            <p className="mb-0" style={{ 
              color: "#1e2a38", 
              opacity: "0.8",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: "1.4"
            }}>
              Export school-level performance reports in PDF or Excel format
            </p>
          </Col>
          <Col xs={12} lg={4}>
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-end gap-2 h-100 align-items-center align-items-lg-start">
              <Button 
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
                onClick={() => handleExport("PDF")}
                disabled={loading || !showPreview}
              >
                <FaFilePdf className="me-2" style={{ flexShrink: 0 }} /> <span>Export PDF</span>
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#1e2a38", 
                  border: "1px solid #cbd5e1", 
                  color: "#7e3af2",
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
                  e.target.style.borderColor = "#7e3af2";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.transform = "translateY(0)";
                }}
                onClick={() => handleExport("Excel")}
                disabled={loading || !showPreview}
              >
                <FaFileExcel className="me-2" style={{ flexShrink: 0 }} /> <span>Export Excel</span>
              </Button>
              <Dropdown>
                <Dropdown.Toggle 
                  style={{ 
                    backgroundColor: "transparent", 
                    border: "1px solid #cbd5e1", 
                    color: "#1e2a38",
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
                    e.target.style.borderColor = "#7e3af2";
                    e.target.style.color = "#7e3af2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#cbd5e1";
                    e.target.style.color = "#1e2a38";
                  }}
                >
                  <FaEllipsisV />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handlePrint}>
                    <FaPrint className="me-2" /> Print Report
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowAdvancedSettings(true)}>
                    <FaCog className="me-2" /> Advanced Settings
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>

        {/* Filters Panel */}
        <Card className="mb-4" style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
          <Card.Body style={{ padding: "20px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "0" }}>
                <FaFilter className="me-2" style={{ color: "#7e3af2" }} />
                Filters
              </h5>
              <Button 
                variant="link" 
                style={{ 
                  color: "#7e3af2", 
                  textDecoration: "none",
                  padding: "0",
                  fontSize: "0.875rem"
                }}
                onClick={() => setShowAdvancedSettings(true)}
              >
                <FaCog className="me-1" /> Advanced
              </Button>
            </div>
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
                    Status
                  </Form.Label>
                  <Form.Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Start Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    End Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Search
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text style={{ backgroundColor: "white", border: "1px solid #cbd5e1", color: "#1e2a38" }}>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Name or Roll No"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ 
                        backgroundColor: "white", 
                        border: "1px solid #cbd5e1", 
                        color: "#1e2a38",
                        fontSize: "clamp(0.875rem, 2vw, 1rem)"
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="d-flex align-items-end">
                <div className="d-flex gap-2 w-100">
                  <Button 
                    style={{ 
                      backgroundColor: "#7e3af2", 
                      border: "none", 
                      color: "white",
                      transition: "all 0.3s ease",
                      fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      padding: "10px 16px",
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
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : <><FaFilter className="me-2" /> Apply</>}
                  </Button>
                  <Button 
                    style={{ 
                      backgroundColor: "#1e2a38", 
                      border: "1px solid #7e3af2", 
                      color: "#7e3af2",
                      transition: "all 0.3s ease",
                      fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      padding: "10px 16px",
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
                    <FaRedo className="me-2" /> Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Main Content with Tabs */}
        {showPreview && (
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
            <Tab eventKey="summary" title="Summary" style={{ color: "#1e2a38" }}>
              {/* Analytics Cards */}
              <Row className="g-2 g-md-3 mb-4">
                <Col xs={6} md={3}>
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
                <Col xs={6} md={3}>
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
                    }}>{analyticsData.averageMarks.toFixed(1)}%</h4>
                  </Card>
                </Col>
                <Col xs={6} md={3}>
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
                <Col xs={6} md={3}>
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
                    }}>Pass / Fail %</h5>
                    <h4 style={{ 
                      color: "#1e2a38", 
                      fontWeight: "700",
                      fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
                    }}>{analyticsData.passPercentage.toFixed(0)}% / {analyticsData.failPercentage.toFixed(0)}%</h4>
                  </Card>
                </Col>
              </Row>

              {/* Charts Row */}
              <Row className="g-3 mb-4">
                <Col xs={12} md={6}>
                  <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
                    <Card.Body style={{ padding: "20px" }}>
                      <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                        <FaChartPie className="me-2" style={{ color: "#7e3af2" }} />
                        Grade Distribution
                      </h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={gradeDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {gradeDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
                    <Card.Body style={{ padding: "20px" }}>
                      <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                        <FaChartBar className="me-2" style={{ color: "#7e3af2" }} />
                        Subject Performance
                      </h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={subjectPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="subject" tick={{ fill: "#1e2a38" }} />
                          <YAxis tick={{ fill: "#1e2a38" }} />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Bar dataKey="average" fill="#7e3af2" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Preview Table */}
              <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
                <Card.Body style={{ padding: "0" }}>
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead style={{ backgroundColor: "#7e3af2", color: "white" }}>
                        <tr>
                          <th style={{ width: "40px" }}>
                            <Form.Check 
                              checked={selectAll} 
                              onChange={handleSelectAll}
                              style={{ backgroundColor: "transparent" }}
                            />
                          </th>
                          <th 
                            style={{ 
                              cursor: "pointer",
                              whiteSpace: "nowrap"
                            }}
                            onClick={() => requestSort('name')}
                          >
                            Learner Name {getSortIcon('name')}
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
                          <th style={{ whiteSpace: "nowrap" }}>Class/Section</th>
                          <th style={{ whiteSpace: "nowrap" }}>Subject</th>
                          <th style={{ whiteSpace: "nowrap" }}>Term</th>
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
                          <th style={{ whiteSpace: "nowrap" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((learner) => (
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
                            <td>
                              <Form.Check 
                                checked={selectedRows.includes(learner.id)} 
                                onChange={() => handleRowSelection(learner.id)}
                                style={{ backgroundColor: "transparent" }}
                              />
                            </td>
                            <td style={{ verticalAlign: "middle" }}>{learner.name}</td>
                            <td style={{ verticalAlign: "middle" }}>{learner.rollNo}</td>
                            <td style={{ verticalAlign: "middle" }}>{learner.class}-{learner.section}</td>
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
                                  backgroundColor: learner.status === "Active" ? "#25D366" : "#ef4444",
                                  color: "white",
                                  padding: "5px 10px",
                                  borderRadius: "4px"
                                }}
                              >
                                {learner.status === "Active" ? <><FaUserCheck className="me-1" /> Active</> : <><FaUserTimes className="me-1" /> Inactive</>}
                              </Badge>
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <Dropdown>
                                <Dropdown.Toggle 
                                  variant="link" 
                                  style={{ 
                                    color: "#7e3af2", 
                                    textDecoration: "none",
                                    padding: "0"
                                  }}
                                >
                                  <FaEllipsisV />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <FaEye className="me-2" /> View Details
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <FaEnvelope className="me-2" /> Send Email
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="d-flex justify-content-between align-items-center mt-3 p-3">
                    <div>
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
                      {selectedRows.length > 0 && (
                        <span className="ms-3">
                          <Badge bg="primary">{selectedRows.length} selected</Badge>
                        </span>
                      )}
                    </div>
                    <Pagination>
                      <Pagination.Prev 
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ 
                          backgroundColor: "#1e2a38", 
                          border: "1px solid #cbd5e1", 
                          color: "#e2e8f0"
                        }}
                      />
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => paginate(index + 1)}
                          style={{ 
                            backgroundColor: index + 1 === currentPage ? "#7e3af2" : "white", 
                            border: "1px solid #cbd5e1", 
                            color: index + 1 === currentPage ? "white" : "#1e2a38"
                          }}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next 
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ 
                          backgroundColor: "#1e2a38", 
                          border: "1px solid #cbd5e1", 
                          color: "#e2e8f0"
                        }}
                      />
                    </Pagination>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="detailed" title="Detailed View" style={{ color: "#1e2a38" }}>
              <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
                <Card.Body style={{ padding: "20px" }}>
                  <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                    Detailed Performance Analysis
                  </h5>
                  <p>This tab would contain more detailed analysis and visualizations.</p>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="comparison" title="Comparison" style={{ color: "#1e2a38" }}>
              <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
                <Card.Body style={{ padding: "20px" }}>
                  <h5 style={{ color: "#1e2a38", fontWeight: "600", marginBottom: "15px" }}>
                    Performance Comparison
                  </h5>
                  <p>This tab would contain comparison tools between different classes, subjects, or terms.</p>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        )}

        {/* Alert for no preview */}
        {!showPreview && (
          <Alert variant="info" className="mb-4" style={{ backgroundColor: "rgba(126, 58, 242, 0.1)", border: "1px solid #7e3af2", color: "#1e2a38" }}>
            <FaEye className="me-2" />
            Apply filters to preview data before exporting reports.
          </Alert>
        )}

        {/* Export Confirmation Modal */}
        <Modal show={showExportModal} onHide={() => setShowExportModal(false)} centered>
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title>Export Report</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38" }}>
            <p>Are you sure you want to export the report as <strong>{exportFormat}</strong>?</p>
            <p>This will include all the filtered data shown in the preview table.</p>
            {selectedRows.length > 0 && (
              <Alert variant="info">
                <FaInfoCircle className="me-2" />
                {selectedRows.length} selected records will be exported.
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#f8f9fa", border: "none" }}>
            <Button 
              style={{ 
                backgroundColor: "#7e3af2", 
                border: "none",
                color: "white"
              }}
              onClick={confirmExport}
              disabled={loading}
            >
              {loading ? <Spinner as="span" animation="border" size="sm" /> : "Export"}
            </Button>
            <Button 
              variant="secondary" 
              style={{ 
                backgroundColor: "transparent", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38"
              }}
              onClick={() => setShowExportModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Advanced Settings Modal */}
        <Modal show={showAdvancedSettings} onHide={() => setShowAdvancedSettings(false)} centered size="lg">
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title>Advanced Export Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38" }}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Include Charts</Form.Label>
                  <Form.Check type="checkbox" label="Grade Distribution Chart" defaultChecked />
                  <Form.Check type="checkbox" label="Subject Performance Chart" defaultChecked />
                  <Form.Check type="checkbox" label="Attendance Analysis" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Additional Information</Form.Label>
                  <Form.Check type="checkbox" label="Student Contact Details" />
                  <Form.Check type="checkbox" label="Parent Information" />
                  <Form.Check type="checkbox" label="Teacher Comments" />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Report Format</Form.Label>
                  <Form.Select>
                    <option>Standard</option>
                    <option>Detailed</option>
                    <option>Summary</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Page Orientation</Form.Label>
                  <Form.Select>
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#f8f9fa", border: "none" }}>
            <Button 
              style={{ 
                backgroundColor: "#7e3af2", 
                border: "none",
                color: "white"
              }}
              onClick={() => setShowAdvancedSettings(false)}
            >
              Save Settings
            </Button>
            <Button 
              variant="secondary" 
              style={{ 
                backgroundColor: "transparent", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38"
              }}
              onClick={() => setShowAdvancedSettings(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
};

export default AdminReports;