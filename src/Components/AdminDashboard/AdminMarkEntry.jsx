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
  Modal,
  Badge,
  OverlayTrigger,
  Tooltip,
  Pagination,
  Spinner,
  Tab,
  Tabs,
  Dropdown,
  Alert
} from "react-bootstrap";
import {
  FaSave,
  FaTimes,
  FaFileImport,
  FaFileExport,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBook,
  FaUserGraduate,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaInfoCircle,
  FaFilter,
  FaCheck,
  FaLock,
  FaUnlock,
  FaChartLine,
  FaTrophy,
  FaExclamationTriangle,
  FaEnvelope,
  FaEye,
  FaPrint
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminMarkEntry = () => {
  // State management
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedTerm, setSelectedTerm] = useState("Mid-term");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMarksRange, setFilterMarksRange] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("");
  const [filterSubmission, setFilterSubmission] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [marksLocked, setMarksLocked] = useState(false);

  // Sample data
  const [learners, setLearners] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      rollNo: "101",
      marks: 85,
      maxMarks: 100,
      attendance: 92,
      remarks: "Good performance",
      status: "Submitted"
    },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: "102",
      marks: 72,
      maxMarks: 100,
      attendance: 88,
      remarks: "Needs improvement",
      status: "Submitted"
    },
    {
      id: 3,
      name: "Amit Sharma",
      rollNo: "103",
      marks: 90,
      maxMarks: 100,
      attendance: 95,
      remarks: "Excellent",
      status: "Submitted"
    },
    {
      id: 4,
      name: "Sneha Patel",
      rollNo: "104",
      marks: 65,
      maxMarks: 100,
      attendance: 78,
      remarks: "Below average",
      status: "Not Submitted"
    },
    {
      id: 5,
      name: "Vikram Singh",
      rollNo: "105",
      marks: 78,
      maxMarks: 100,
      attendance: 90,
      remarks: "Average",
      status: "Submitted"
    },
    {
      id: 6,
      name: "Anjali Gupta",
      rollNo: "106",
      marks: 92,
      maxMarks: 100,
      attendance: 94,
      remarks: "Outstanding",
      status: "Submitted"
    }
  ]);

  const classes = ["9-A", "9-B", "10-A", "10-B", "11-A", "11-B", "12-A", "12-B"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography"];
  const terms = ["Mid-term", "Final", "Assignment 1", "Assignment 2"];

  // Calculate analytics
  const totalLearners = learners.length;
  const averageMarks = learners.reduce((sum, learner) => sum + learner.marks, 0) / totalLearners;
  const topScorer = learners.reduce((max, learner) => learner.marks > max.marks ? learner : max, learners[0]);
  const lowestScorer = learners.reduce((min, learner) => learner.marks < min.marks ? learner : min, learners[0]);
  

  // Calculate grade based on percentage
  const calculateGrade = (marks, maxMarks) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C+";
    if (percentage >= 40) return "C";
    return "F";
  };

  // Handle marks change
  const handleMarksChange = (id, value) => {
    const updatedLearners = learners.map(learner => 
      learner.id === id ? { ...learner, marks: parseInt(value) || 0 } : learner
    );
    setLearners(updatedLearners);
    setHasChanges(true);
  };

  // Handle remarks change
  const handleRemarksChange = (id, value) => {
    const updatedLearners = learners.map(learner => 
      learner.id === id ? { ...learner, remarks: value } : learner
    );
    setLearners(updatedLearners);
    setHasChanges(true);
  };

  // Handle status change
  const handleStatusChange = (id, value) => {
    const updatedLearners = learners.map(learner => 
      learner.id === id ? { ...learner, status: value } : learner
    );
    setLearners(updatedLearners);
    setHasChanges(true);
  };

  // Save changes
  const handleSaveChanges = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setHasChanges(false);
      alert("Marks saved successfully!");
    }, 1000);
  };

  // Cancel changes
  const handleCancelChanges = () => {
    // Reset to original data (in a real app, you'd fetch from API)
    setHasChanges(false);
    alert("Changes cancelled");
  };

  // Toggle marks lock
  const toggleMarksLock = () => {
    setMarksLocked(!marksLocked);
    alert(marksLocked ? "Marks unlocked for editing" : "Marks locked. Further changes require admin approval.");
  };

  // Handle message to parent
  const handleMessageToParent = (learner) => {
    setSelectedLearner(learner);
    setShowMessageModal(true);
  };

  // Handle export
  const handleExport = (format) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowExportModal(false);
      alert(`Exporting marks as ${format}...`);
    }, 1000);
  };

  // Handle import
  const handleImport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowImportModal(false);
      alert("Marks imported successfully!");
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

  // Filter learners
  const filteredLearners = learners.filter(learner => {
    const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesMarksRange = true;
    if (filterMarksRange) {
      const percentage = (learner.marks / learner.maxMarks) * 100;
      if (filterMarksRange === "60") matchesMarksRange = percentage >= 60;
      if (filterMarksRange === "80") matchesMarksRange = percentage >= 80;
      if (filterMarksRange === "40") matchesMarksRange = percentage < 40;
    }
    
    let matchesAttendance = true;
    if (filterAttendance) {
      if (filterAttendance === "90") matchesAttendance = learner.attendance >= 90;
      if (filterAttendance === "75") matchesAttendance = learner.attendance >= 75;
      if (filterAttendance === "60") matchesAttendance = learner.attendance < 60;
    }
    
    const matchesSubmission = !filterSubmission || learner.status === filterSubmission;
    
    return matchesSearch && matchesMarksRange && matchesAttendance && matchesSubmission;
  });

  // Sort learners
  const sortedLearners = [...filteredLearners].sort((a, b) => {
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
  const currentItems = sortedLearners.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedLearners.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{minHeight: "100vh", color: "#1e2a38", padding: "15px 0" }}>
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
              <FaBook className="me-2" style={{ color: "#7e3af2" }} />
              Marks Management
            </h3>
            <p className="mb-0" style={{ 
              color: "#1e2a38", 
              opacity: "0.8",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: "1.4"
            }}>
              Manage and track student performance across classes and subjects
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
                  minWidth: "120px",
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
                onClick={handleSaveChanges}
                disabled={loading || !hasChanges}
              >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : <><FaSave className="me-2" style={{ flexShrink: 0 }} /> <span>Save Changes</span></>}
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#1e2a38", 
                  border: "1px solid #cbd5e1", 
                  color: "#7e3af2",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                  padding: "10px 16px",
                  minWidth: "100px",
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
                onClick={handleCancelChanges}
                disabled={loading || !hasChanges}
              >
                <FaTimes className="me-2" style={{ flexShrink: 0 }} /> <span>Cancel</span>
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "transparent", 
                  border: "1px solid #cbd5e1", 
                  color: "#1e2a38",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                  padding: "10px 16px",
                  minWidth: "100px",
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
                onClick={toggleMarksLock}
              >
                {marksLocked ? <FaLock className="me-2" style={{ flexShrink: 0 }} /> : <FaUnlock className="me-2" style={{ flexShrink: 0 }} />}
                <span>{marksLocked ? "Locked" : "Unlocked"}</span>
              </Button>
            </div>
          </Col>
        </Row>

        {/* Class & Subject Selection */}
        <Card className="mb-4" style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
          <Card.Body style={{ padding: "20px" }}>
            <Row className="g-3 align-items-end">
              <Col xs={12} sm={6} md={3}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Class / Grade
                  </Form.Label>
                  <Form.Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={3}>
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
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Term / Exam Type
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
              <Col xs={12} sm={6} md={3}>
                <div className="d-flex gap-2">
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
                    onClick={() => setShowImportModal(true)}
                  >
                    <FaFileImport className="me-2" style={{ flexShrink: 0 }} /> <span>Import</span>
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle 
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
                    >
                      <FaFileExport className="me-2" style={{ flexShrink: 0 }} /> <span>Export</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleExport("PDF")}>Export as PDF</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleExport("Excel")}>Export as Excel</Dropdown.Item>
                      <Dropdown.Item onClick={() => window.print()}>Print Report</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
            <div className="mt-3">
              <span style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                Average Marks for {selectedClass} - {selectedSubject} ({selectedTerm}): 
              </span>
              <span style={{ color: "#7e3af2", fontWeight: "600", fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}>
                {averageMarks.toFixed(1)}%
              </span>
            </div>
          </Card.Body>
        </Card>

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
              <FaUserGraduate size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
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
              }}>{totalLearners}</h4>
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
              }}>{averageMarks.toFixed(1)}%</h4>
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
              }}>{topScorer.name}</h4>
              <h6 style={{ 
                color: "#7e3af2", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}>{topScorer.marks}%</h6>
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
              }}>{lowestScorer.name}</h4>
              <h6 style={{ 
                color: "#ef4444", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}>{lowestScorer.marks}%</h6>
            </Card>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Row className="mb-3 g-2">
          <Col xs={12} md={4}>
            <InputGroup>
              <InputGroup.Text 
                style={{ 
                  backgroundColor: "white", 
                  border: "1px solid #cbd5e1", 
                  color: "#1e2a38" 
                }}
              >
                <FaSearch />
              </InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="Search by name or roll no" 
                style={{ 
                  backgroundColor: "white", 
                  border: "1px solid #cbd5e1", 
                  color: "#1e2a38",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)"
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Form.Select
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}
              value={filterMarksRange}
              onChange={(e) => setFilterMarksRange(e.target.value)}
            >
              <option value="">All Marks</option>
              <option value="80">Above 80%</option>
              <option value="60">Above 60%</option>
              <option value="40">Below 40%</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Form.Select
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}
              value={filterAttendance}
              onChange={(e) => setFilterAttendance(e.target.value)}
            >
              <option value="">All Attendance</option>
              <option value="90">90% and above</option>
              <option value="75">75% and above</option>
              <option value="60">Below 60%</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Form.Select
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}
              value={filterSubmission}
              onChange={(e) => setFilterSubmission(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="Not Submitted">Not Submitted</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Button 
              variant="outline-secondary"
              style={{ 
                backgroundColor: "transparent", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                transition: "all 0.3s ease",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                width: "100%"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#7e3af2";
                e.target.style.color = "#7e3af2";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#cbd5e1";
                e.target.style.color = "#1e2a38";
              }}
              onClick={() => {
                setSearchTerm("");
                setFilterMarksRange("");
                setFilterAttendance("");
                setFilterSubmission("");
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>

        {/* Alert for unsaved changes */}
        {hasChanges && (
          <Alert variant="warning" className="mb-3" style={{ backgroundColor: "rgba(255, 193, 7, 0.1)", border: "1px solid #ffc107", color: "#856404" }}>
            You have unsaved changes. Don't forget to save them before leaving.
          </Alert>
        )}

        {/* Learners Table */}
        <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
          <Card.Body style={{ padding: "0" }}>
            <div className="table-responsive">
              <Table responsive hover className="mb-0" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
                <thead style={{ backgroundColor: "#7e3af2", color: "white" }}>
                  <tr>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                      }}
                      onClick={() => requestSort('name')}
                    >
                      Name {getSortIcon('name')}
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                      }}
                      onClick={() => requestSort('rollNo')}
                    >
                      Roll No {getSortIcon('rollNo')}
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Marks
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Maximum marks: 100</Tooltip>}
                      >
                        <FaInfoCircle className="ms-1" style={{ fontSize: "12px" }} />
                      </OverlayTrigger>
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Grade
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Attendance
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Remarks
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Status
                    </th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((learner) => (
                    <tr 
                      key={learner.id} 
                      style={{ 
                        backgroundColor: "white",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(126,58,242,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div 
                            style={{
                              width: window.innerWidth < 768 ? "25px" : "35px",
                              height: window.innerWidth < 768 ? "25px" : "35px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(126, 58, 242, 0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "8px",
                              color: "#7e3af2",
                              fontWeight: "600",
                              fontSize: window.innerWidth < 768 ? "10px" : "14px"
                            }}
                          >
                            {learner.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="d-none d-md-inline">{learner.name}</span>
                          <span className="d-md-none" style={{ fontSize: "12px" }}>
                            {learner.name.length > 10 ? learner.name.substring(0, 10) + "..." : learner.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        {learner.rollNo}
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <Form.Control
                          type="number"
                          min="0"
                          max={learner.maxMarks}
                          value={learner.marks}
                          onChange={(e) => handleMarksChange(learner.id, e.target.value)}
                          disabled={marksLocked}
                          style={{
                            width: "80px",
                            padding: "4px 8px",
                            fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                            backgroundColor: marksLocked ? "#f8f9fa" : "white",
                            borderColor: marksLocked ? "#dee2e6" : "#cbd5e1",
                            color: marksLocked ? "#6c757d" : "#1e2a38"
                          }}
                        />
                        <span className="ms-1" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
                          / {learner.maxMarks}
                        </span>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <Badge 
                          style={{
                            backgroundColor: getGradeColor(calculateGrade(learner.marks, learner.maxMarks)),
                            color: "white",
                            padding: window.innerWidth < 768 ? "2px 6px" : "5px 10px",
                            borderRadius: "4px",
                            fontSize: window.innerWidth < 768 ? "10px" : "12px"
                          }}
                        >
                          {calculateGrade(learner.marks, learner.maxMarks)}
                        </Badge>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "8px" }}>{learner.attendance}%</span>
                          <div style={{ 
                            width: "50px", 
                            height: "6px", 
                            backgroundColor: "#e2e8f0", 
                            borderRadius: "3px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              width: `${learner.attendance}%`,
                              height: "100%",
                              backgroundColor: learner.attendance >= 90 ? "#25D366" : learner.attendance >= 75 ? "#ffc107" : "#ef4444",
                              transition: "width 0.3s ease"
                            }}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <Form.Control
                          type="text"
                          value={learner.remarks}
                          onChange={(e) => handleRemarksChange(learner.id, e.target.value)}
                          disabled={marksLocked}
                          style={{
                            width: "120px",
                            padding: "4px 8px",
                            fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                            backgroundColor: marksLocked ? "#f8f9fa" : "white",
                            borderColor: marksLocked ? "#dee2e6" : "#cbd5e1",
                            color: marksLocked ? "#6c757d" : "#1e2a38"
                          }}
                        />
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <Form.Select
                          value={learner.status}
                          onChange={(e) => handleStatusChange(learner.id, e.target.value)}
                          disabled={marksLocked}
                          style={{
                            width: "130px",
                            padding: "4px 8px",
                            fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                            backgroundColor: marksLocked ? "#f8f9fa" : "white",
                            borderColor: marksLocked ? "#dee2e6" : "#cbd5e1",
                            color: marksLocked ? "#6c757d" : "#1e2a38"
                          }}
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Not Submitted">Not Submitted</option>
                        </Form.Select>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div className="d-flex justify-content-center gap-1 flex-wrap">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>View Progress</Tooltip>}
                          >
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #cbd5e1", 
                                color: "#1e2a38",
                                transition: "all 0.3s ease",
                                padding: "6px 10px",
                                minWidth: "35px",
                                height: "35px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
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
                              <FaEye style={{ fontSize: "14px" }} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Send Message to Parent</Tooltip>}
                          >
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #7e3af2", 
                                color: "#7e3af2",
                                transition: "all 0.3s ease",
                                padding: "6px 10px",
                                minWidth: "35px",
                                height: "35px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(126, 58, 242, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                              }}
                              onClick={() => handleMessageToParent(learner)}
                            >
                              <FaEnvelope style={{ fontSize: "14px" }} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3 p-3">
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

        {/* Import Modal */}
        <Modal show={showImportModal} onHide={() => setShowImportModal(false)} centered>
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title>Import Marks</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38" }}>
            <p>Upload a CSV or Excel file with marks data.</p>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select file</Form.Label>
              <Form.Control type="file" accept=".csv,.xlsx,.xls" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button 
                style={{ 
                  backgroundColor: "#7e3af2", 
                  border: "none",
                  color: "white"
                }}
                onClick={handleImport}
                disabled={loading}
              >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Import"}
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Export Modal */}
        <Modal show={showExportModal} onHide={() => setShowExportModal(false)} centered>
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title>Export Marks</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38" }}>
            <p>Select the format for exporting marks:</p>
            <div className="d-grid gap-2">
              <Button 
                style={{ 
                  backgroundColor: "#7e3af2", 
                  border: "none",
                  color: "white"
                }}
                onClick={() => handleExport("PDF")}
              >
                Export as PDF
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#7e3af2", 
                  border: "none",
                  color: "white"
                }}
                onClick={() => handleExport("Excel")}
              >
                Export as Excel
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#7e3af2", 
                  border: "none",
                  color: "white"
                }}
                onClick={() => window.print()}
              >
                Print Report
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Message Modal */}
        <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} centered>
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title>Send Message to Parent</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38" }}>
            {selectedLearner && (
              <>
                <p>Send a message to the parent of <strong>{selectedLearner.name}</strong> (Roll No: {selectedLearner.rollNo})</p>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter your message here..."
                    defaultValue={`Dear Parent,\n\nThis is regarding your child's performance in ${selectedSubject} (${selectedTerm}). Current marks: ${selectedLearner.marks}/${selectedLearner.maxMarks}.\n\nThank you.`}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#f8f9fa", border: "none" }}>
            <Button 
              style={{ 
                backgroundColor: "#7e3af2", 
                border: "none",
                color: "white"
              }}
              onClick={() => {
                alert("Message sent successfully!");
                setShowMessageModal(false);
              }}
            >
              Send Message
            </Button>
            <Button 
              variant="secondary" 
              style={{ 
                backgroundColor: "transparent", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38"
              }}
              onClick={() => setShowMessageModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

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

export default AdminMarkEntry;