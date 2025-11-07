import React, { useState, useEffect } from "react";
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
  Spinner
} from "react-bootstrap";
import {
  FaPlus,
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
  FaTimes
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminSubjects = () => {
  // State management
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      classes: ["10", "11", "12"],
      teacher: "Dr. R. Sharma",
      status: "Active"
    },
    {
      id: 2,
      name: "Life Science",
      code: "LIFE102",
      classes: ["9", "10"],
      teacher: "Mrs. S. Patel",
      status: "Active"
    },
    {
      id: 3,
      name: "Physics",
      code: "PHY103",
      classes: ["11", "12"],
      teacher: "Mr. A. Kumar",
      status: "Active"
    },
    {
      id: 4,
      name: "Chemistry",
      code: "CHEM104",
      classes: ["11", "12"],
      teacher: "Dr. P. Singh",
      status: "Inactive"
    },
    {
      id: 5,
      name: "History",
      code: "HIST105",
      classes: ["9", "10"],
      teacher: "Mrs. K. Verma",
      status: "Active"
    },
    {
      id: 6,
      name: "Geography",
      code: "GEOG106",
      classes: ["9", "10"],
      teacher: "Mr. J. Reddy",
      status: "Active"
    }
  ]);

  const [teachers] = useState([
    "Dr. R. Sharma",
    "Mrs. S. Patel",
    "Mr. A. Kumar",
    "Dr. P. Singh",
    "Mrs. K. Verma",
    "Mr. J. Reddy",
    "Ms. N. Gupta"
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    classes: [],
    teacher: "",
    status: "Active"
  });

  // Analytics calculations
  const totalSubjects = subjects.length;
  const activeSubjects = subjects.filter(s => s.status === "Active").length;
  const inactiveSubjects = subjects.filter(s => s.status === "Inactive").length;
  
  // Calculate subjects per grade
  const subjectsPerGrade = {};
  subjects.forEach(subject => {
    subject.classes.forEach(cls => {
      subjectsPerGrade[cls] = (subjectsPerGrade[cls] || 0) + 1;
    });
  });

  // Handle modal operations
  const handleShow = () => {
    setSelectedSubject(null);
    setFormData({
      name: "",
      code: "",
      classes: [],
      teacher: "",
      status: "Active"
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      code: "",
      classes: [],
      teacher: "",
      status: "Active"
    });
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      classes: subject.classes,
      teacher: subject.teacher,
      status: subject.status
    });
    setShowModal(true);
  };

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setSubjects(subjects.filter(s => s.id !== selectedSubject.id));
    setShowDeleteModal(false);
    setSelectedSubject(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClassChange = (e) => {
    const { options } = e.target;
    const selectedClasses = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedClasses.push(options[i].value);
      }
    }
    setFormData({ ...formData, classes: selectedClasses });
  };

  const handleSave = () => {
    if (!formData.name || !formData.teacher || formData.classes.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    if (selectedSubject) {
      // Update existing subject
      setSubjects(subjects.map(s => 
        s.id === selectedSubject.id 
          ? { ...s, ...formData }
          : s
      ));
    } else {
      // Add new subject
      const newSubject = {
        id: subjects.length + 1,
        ...formData
      };
      setSubjects([...subjects, newSubject]);
    }
    handleClose();
  };

  const handleImport = () => {
    setLoading(true);
    // Simulate import process
    setTimeout(() => {
      setLoading(false);
      alert("Import functionality would open file picker for CSV/Excel");
    }, 1000);
  };

  const handleExport = () => {
    setLoading(true);
    // Simulate export process
    setTimeout(() => {
      setLoading(false);
      alert("Export functionality would download CSV/PDF");
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

  // Filter and sort subjects
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || subject.classes.includes(filterClass);
    const matchesTeacher = !filterTeacher || subject.teacher === filterTeacher;
    
    return matchesSearch && matchesClass && matchesTeacher;
  });

  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
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
  const currentItems = sortedSubjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSubjects.length / itemsPerPage);

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
              Subjects Management
            </h3>
            <p className="mb-0" style={{ 
              color: "#1e2a38", 
              opacity: "0.8",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: "1.4"
            }}>
              Add/edit subject list (Maths, Life Sci, etc.) and manage assignments
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
                onClick={handleShow}
              >
                <FaPlus className="me-2" style={{ flexShrink: 0 }} /> 
                <span>Add Subject</span>
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#1e2a38", 
                  border: "1px solid #cbd5e1", 
                  color: "white",
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
                onClick={handleImport}
                disabled={loading}
              >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : <><FaFileImport className="me-2" style={{ flexShrink: 0 }} /> <span>Import</span></>}
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#1e2a38", 
                  border: "1px solid #cbd5e1", 
                  color: "white",
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
                onClick={handleExport}
                disabled={loading}
              >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : <><FaFileExport className="me-2" style={{ flexShrink: 0 }} /> <span>Export</span></>}
              </Button>
            </div>
          </Col>
        </Row>

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
              <FaBook size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Total</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{totalSubjects}</h4>
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
              <FaCheck size={window.innerWidth < 768 ? 25 : 30} color="#25D366" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Active</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{activeSubjects}</h4>
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
              <FaTimes size={window.innerWidth < 768 ? 25 : 30} color="#ef4444" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Inactive</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{inactiveSubjects}</h4>
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
              <FaUserGraduate size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Teachers</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>{teachers.length}</h4>
            </Card>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Row className="mb-3 g-2">
          <Col xs={12} lg={4}>
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
                placeholder="Search by name or code" 
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
          <Col xs={12} sm={6} lg={4}>
            <Form.Select
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">All Classes</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <Form.Select
              style={{ 
                backgroundColor: "white", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
            >
              <option value="">All Teachers</option>
              {teachers.map(teacher => (
                <option key={teacher} value={teacher}>{teacher}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Subjects Table */}
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
                      onClick={() => requestSort('code')}
                    >
                      Code {getSortIcon('code')}
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                      }}
                      onClick={() => requestSort('classes')}
                    >
                      Classes {getSortIcon('classes')}
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                      }}
                      onClick={() => requestSort('teacher')}
                    >
                      Teacher {getSortIcon('teacher')}
                    </th>
                    <th 
                      style={{ 
                        border: "none", 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                      }}
                      onClick={() => requestSort('status')}
                    >
                      Status {getSortIcon('status')}
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
                  {currentItems.map((subject) => (
                    <tr 
                      key={subject.id} 
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
                            {subject.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="d-none d-md-inline">{subject.name}</span>
                          <span className="d-md-none" style={{ fontSize: "12px" }}>
                            {subject.name.length > 10 ? subject.name.substring(0, 10) + "..." : subject.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <span className="d-none d-md-inline">{subject.code}</span>
                        <span className="d-md-none">{subject.code.substring(0, 5)}</span>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div className="d-flex flex-wrap gap-1">
                          {subject.classes.map((cls, idx) => (
                            <Badge 
                              key={idx} 
                              style={{ 
                                backgroundColor: "rgba(126, 58, 242, 0.1)", 
                                color: "#7e3af2",
                                fontSize: window.innerWidth < 768 ? "10px" : "12px"
                              }}
                            >
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <span className="d-none d-md-inline">{subject.teacher}</span>
                        <span className="d-md-none">
                          {subject.teacher.split(" ").map(n => n[0]).join("")}
                        </span>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <Badge 
                          style={{
                            backgroundColor: subject.status === "Active" ? "#25D366" : "#ef4444",
                            color: "white",
                            padding: window.innerWidth < 768 ? "2px 6px" : "5px 10px",
                            borderRadius: "4px",
                            fontSize: window.innerWidth < 768 ? "10px" : "12px"
                          }}
                        >
                          {subject.status}
                        </Badge>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div className="d-flex justify-content-center gap-1 flex-wrap">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Edit Subject</Tooltip>}
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
                              onClick={() => handleEdit(subject)}
                            >
                              <FaEdit style={{ fontSize: "14px" }} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Delete Subject</Tooltip>}
                          >
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #ef4444", 
                                color: "#ef4444",
                                transition: "all 0.3s ease",
                                padding: "6px 10px",
                                minWidth: "35px",
                                height: "35px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                              }}
                              onClick={() => handleDelete(subject)}
                            >
                              <FaTrash style={{ fontSize: "14px" }} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>View Details</Tooltip>}
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
                              <FaInfoCircle style={{ fontSize: "14px" }} />
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

        {/* Add/Edit Subject Modal */}
        <Modal 
          show={showModal} 
          onHide={handleClose} 
          centered 
          size="lg"
          fullscreen={window.innerWidth < 768 ? "sm-down" : false}
        >
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title style={{ fontSize: "clamp(1rem, 3vw, 1.125rem)", fontWeight: "500" }}>
              {selectedSubject ? "Edit Subject" : "Add New Subject"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38", maxHeight: "70vh", overflowY: "auto" }}>
            <Row className="g-2 g-md-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Subject Name <span style={{ color: "#ef4444" }}>*</span>
                  </Form.Label>
                  <Form.Control 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Subject Code
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Optional unique identifier for the subject</Tooltip>}
                    >
                      <FaInfoCircle className="ms-1" style={{ color: "#7e3af2", fontSize: "14px" }} />
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control 
                    name="code" 
                    value={formData.code} 
                    onChange={handleChange} 
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Assign Class(es) <span style={{ color: "#ef4444" }}>*</span>
                  </Form.Label>
                  <Form.Select 
                    multiple
                    name="classes" 
                    value={formData.classes} 
                    onChange={handleClassChange} 
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)",
                      height: "100px"
                    }}
                  >
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </Form.Select>
                  <Form.Text style={{ color: "#7e3af2", fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}>
                    Hold Ctrl/Cmd to select multiple classes
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Assign Teacher <span style={{ color: "#ef4444" }}>*</span>
                  </Form.Label>
                  <Form.Select 
                    name="teacher" 
                    value={formData.teacher} 
                    onChange={handleChange} 
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                    Status
                  </Form.Label>
                  <Form.Select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange} 
                    style={{ 
                      backgroundColor: "white", 
                      border: "1px solid #cbd5e1", 
                      color: "#1e2a38",
                      fontSize: "clamp(0.875rem, 2vw, 1rem)"
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
                transition: "all 0.3s ease",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                padding: "10px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#6a2fd9";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#7e3af2";
              }}
              onClick={handleSave}
            >
              {selectedSubject ? "Update" : "Save"}
            </Button>
            <Button 
              variant="secondary" 
              style={{ 
                backgroundColor: "transparent", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                transition: "all 0.3s ease",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                padding: "10px 24px",
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
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal 
          show={showDeleteModal} 
          onHide={() => setShowDeleteModal(false)} 
          centered
        >
          <Modal.Header 
            closeButton 
            style={{ 
              backgroundColor: "#1e2a38", 
              color: "#e2e8f0",
              border: "none"
            }}
          >
            <Modal.Title style={{ fontSize: "clamp(1rem, 3vw, 1.125rem)", fontWeight: "500" }}>
              Confirm Delete
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38" }}>
            <p style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
              Are you sure you want to delete <strong>{selectedSubject?.name}</strong>?
            </p>
            <p style={{ color: "#ef4444", fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}>
              This action cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#f8f9fa", border: "none" }}>
            <Button 
              variant="danger"
              style={{
                backgroundColor: "#ef4444",
                border: "none",
                transition: "all 0.3s ease",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                padding: "10px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ef4444";
              }}
              onClick={confirmDelete}
            >
              Delete
            </Button>
            <Button 
              variant="secondary" 
              style={{ 
                backgroundColor: "transparent", 
                border: "1px solid #cbd5e1", 
                color: "#1e2a38",
                transition: "all 0.3s ease",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                padding: "10px 24px",
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
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
};

export default AdminSubjects;