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
} from "react-bootstrap";
import {
  FaPlus,
  FaFileImport,
  FaFileExport,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUserGraduate,
  FaVenusMars,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLearners = ({ role = "admin", assignedClass = ["10-A", "9-B"] }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [learners, setLearners] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      roll: "101",
      class: "10",
      section: "A",
      gender: "Male",
      parent: "Mr. Kumar",
      contact: "9876543210",
      admission: "2022-06-12",
      status: "Active",
      marks: 85,
      attendance: 92,
    },
    {
      id: 2,
      name: "Priya Singh",
      roll: "102",
      class: "9",
      section: "B",
      gender: "Female",
      parent: "Mrs. Singh",
      contact: "9876501234",
      admission: "2023-01-05",
      status: "Active",
      marks: 72,
      attendance: 88,
    },
    {
      id: 3,
      name: "Amit Sharma",
      roll: "103",
      class: "10",
      section: "A",
      gender: "Male",
      parent: "Mr. Sharma",
      contact: "9876543211",
      admission: "2022-06-15",
      status: "Active",
      marks: 90,
      attendance: 95,
    },
    {
      id: 4,
      name: "Sneha Patel",
      roll: "104",
      class: "9",
      section: "B",
      gender: "Female",
      parent: "Mrs. Patel",
      contact: "9876501235",
      admission: "2023-01-10",
      status: "Inactive",
      marks: 65,
      attendance: 78,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    class: "",
    section: "",
    gender: "",
    dob: "",
    parent: "",
    contact: "",
    address: "",
    admission: "",
    status: "Active",
  });

  const [filter, setFilter] = useState({ subject: "", performance: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      roll: "",
      class: "",
      section: "",
      gender: "",
      dob: "",
      parent: "",
      contact: "",
      address: "",
      admission: "",
      status: "Active",
    });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleAdd = () => {
    const newLearner = {
      ...formData,
      id: learners.length + 1,
      marks: Math.floor(Math.random() * 30) + 70,
      attendance: Math.floor(Math.random() * 20) + 80,
    };
    setLearners([...learners, newLearner]);
    handleClose();
  };

  const handleEdit = (learner) => {
    setFormData(learner);
    setSelectedLearner(learner);
    setShowModal(true);
  };

  const handleUpdate = () => {
    setLearners(learners.map(l => l.id === selectedLearner.id ? formData : l));
    handleClose();
    setSelectedLearner(null);
  };

  const handleDelete = (learner) => {
    setSelectedLearner(learner);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLearners(learners.filter(l => l.id !== selectedLearner.id));
    setShowDeleteModal(false);
    setSelectedLearner(null);
  };

  // Teacher view: filter only assigned classes
  const filteredLearners = role === "teacher"
    ? learners.filter((l) => assignedClass.includes(`${l.class}-${l.section}`))
    : learners;

  // Search filter
  const searchedLearners = filteredLearners.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Optional performance filter
  const finalLearners = searchedLearners.filter((l) =>
    filter.performance ? l.marks >= parseInt(filter.performance) : true
  );

  const maleCount = finalLearners.filter(l => l.gender === "Male").length;
  const femaleCount = finalLearners.filter(l => l.gender === "Female").length;
  const activeCount = finalLearners.filter(l => l.status === "Active").length;

  return (
    <div style={{minHeight: "100vh", color: "#1e2a38", padding: "15px 0" }}>
      <Container fluid style={{ maxWidth: "98%", px: 2 }}>
        
        {/* Header */}
        <Row className="mb-4 mb-md-4 align-items-center">
          <Col xs={12} md={8} className="mb-3 mb-md-0">
            <h3 style={{ 
              color: "#1e2a38", 
              fontWeight: "600",
              fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
              marginBottom: "8px"
            }}>
              <FaUserGraduate className="me-2" style={{ color: "#7e3af2" }} />
              Learners Management
            </h3>
            <p className="mb-0" style={{ 
              color: "#1e2a38", 
              opacity: "0.8",
              fontSize: "clamp(0.875rem, 2vw, 1rem)"
            }}>
              {role === "teacher"
                ? "View and manage your assigned class learners."
                : "Manage all learners efficiently — add, edit, import/export, and analyze student data."}
            </p>
          </Col>
          {role === "admin" && (
            <Col xs={12} md={4} className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-2">
              <Button 
                style={{ 
                  backgroundColor: "#7e3af2", 
                  border: "none", 
                  color: "white",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                  padding: "8px 16px",
                  minWidth: "120px"
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
                <FaPlus className="me-1 me-md-2" /> 
                <span className="d-none d-md-inline">Add Learner</span>
                <span className="d-md-none">Add</span>
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#1e2a38", 
                  border: "1px solid #cbd5e1", 
                  color: "white",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                  padding: "8px 16px",
                  minWidth: "100px"
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
                <FaFileImport className="me-1 me-md-2" /> 
                <span className="d-none d-md-inline">Import</span>
                <span className="d-md-none">Imp</span>
              </Button>
              <Button 
                style={{ 
                  backgroundColor: "#1e2a38", 
                  border: "1px solid #cbd5e1", 
                  color: "white",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                  padding: "8px 16px",
                  minWidth: "100px"
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
                <FaFileExport className="me-1 me-md-2" /> 
                <span className="d-none d-md-inline">Export</span>
                <span className="d-md-none">Exp</span>
              </Button>
            </Col>
          )}
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
              <FaUsers size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
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
              }}>{finalLearners.length}</h4>
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
              <FaVenusMars size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
              <h5 style={{ 
                color: "#1e2a38", 
                fontWeight: "500",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                marginBottom: "4px"
              }}>Gender</h5>
              <h6 style={{ 
                color: "#1e2a38",
                fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)"
              }}>
                <span className="d-block d-md-inline">M: {maleCount}</span>
                <span className="d-none d-md-inline"> | </span>
                <span className="d-block d-md-inline">F: {femaleCount}</span>
              </h6>
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
              }}>Avg Marks</h5>
              <h4 style={{ 
                color: "#1e2a38", 
                fontWeight: "700",
                fontSize: "clamp(1.25rem, 3vw, 1.5rem)"
              }}>
                {finalLearners.length > 0 ? (finalLearners.reduce((a,c)=>a+(c.marks||0),0)/finalLearners.length).toFixed(0) : 0}%
              </h4>
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
              <FaUsers size={window.innerWidth < 768 ? 25 : 30} color="#7e3af2" className="mb-2" />
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
              }}>{activeCount}</h4>
            </Card>
          </Col>
        </Row>

        {/* Search + Filter */}
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
                placeholder="Search by name, roll or class" 
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
          {role === "teacher" && (
            <Col xs={12} md={4}>
              <Form.Select
                style={{ 
                  backgroundColor: "white", 
                  border: "1px solid #cbd5e1", 
                  color: "#1e2a38",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)"
                }}
                onChange={(e) => setFilter({ ...filter, performance: e.target.value })}
              >
                <option value="">All Performance</option>
                <option value="60">Above 60%</option>
                <option value="80">Above 80%</option>
              </Form.Select>
            </Col>
          )}
        </Row>

        {/* Learners Table */}
        <Card style={{ backgroundColor: "white", border: "1px solid #cbd5e1" }}>
          <Card.Body style={{ padding: "0" }}>
            <div className="table-responsive">
              <Table responsive hover className="mb-0" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
                <thead style={{ backgroundColor: "#7e3af2", color: "white" }}>
                  <tr>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Name</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Roll</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Class</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Sec</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Gender</th>
                    <th className="d-none d-md-table-cell" style={{ 
                      border: "none", 
                      padding: "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Parent</th>
                    <th className="d-none d-lg-table-cell" style={{ 
                      border: "none", 
                      padding: "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Contact</th>
                    <th className="d-none d-md-table-cell" style={{ 
                      border: "none", 
                      padding: "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Admission</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Status</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Marks</th>
                    <th className="d-none d-md-table-cell" style={{ 
                      border: "none", 
                      padding: "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Attendance</th>
                    <th style={{ 
                      border: "none", 
                      padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                      fontWeight: "500",
                      whiteSpace: "nowrap"
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {finalLearners.map((l) => (
                    <tr key={l.id} style={{ backgroundColor: "white" }}>
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
                            {l.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="d-none d-md-inline">{l.name}</span>
                          <span className="d-md-none" style={{ fontSize: "12px" }}>
                            {l.name.split(" ")[0]}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>{l.roll}</td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>{l.class}</td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>{l.section}</td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <span className="d-none d-md-inline">{l.gender}</span>
                        <span className="d-md-none">{l.gender[0]}</span>
                      </td>
                      <td className="d-none d-md-table-cell" style={{ 
                        padding: "12px", 
                        verticalAlign: "middle" 
                      }}>{l.parent}</td>
                      <td className="d-none d-lg-table-cell" style={{ 
                        padding: "12px", 
                        verticalAlign: "middle" 
                      }}>{l.contact}</td>
                      <td className="d-none d-md-table-cell" style={{ 
                        padding: "12px", 
                        verticalAlign: "middle" 
                      }}>{l.admission}</td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <Badge 
                          style={{
                            backgroundColor: l.status === "Active" ? "#22c55e" : "#ef4444",
                            color: "white",
                            padding: window.innerWidth < 768 ? "2px 6px" : "5px 10px",
                            borderRadius: "4px",
                            fontSize: window.innerWidth < 768 ? "10px" : "12px"
                          }}
                        >
                          {l.status[0]}
                        </Badge>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: window.innerWidth < 768 ? "column" : "row" }}>
                          <span style={{ 
                            marginRight: window.innerWidth < 768 ? "0" : "8px",
                            fontSize: window.innerWidth < 768 ? "11px" : "14px"
                          }}>{l.marks}%</span>
                          <div style={{ 
                            width: window.innerWidth < 768 ? "30px" : "50px", 
                            height: "4px", 
                            backgroundColor: "#e2e8f0", 
                            borderRadius: "2px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              width: `${l.marks}%`,
                              height: "100%",
                              backgroundColor: "#7e3af2",
                              transition: "width 0.3s ease"
                            }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell" style={{ 
                        padding: "12px", 
                        verticalAlign: "middle" 
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "8px" }}>{l.attendance}%</span>
                          <div style={{ 
                            width: "50px", 
                            height: "6px", 
                            backgroundColor: "#e2e8f0", 
                            borderRadius: "3px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              width: `${l.attendance}%`,
                              height: "100%",
                              backgroundColor: "#7e3af2",
                              transition: "width 0.3s ease"
                            }}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ 
                        padding: window.innerWidth < 768 ? "8px 4px" : "12px", 
                        verticalAlign: "middle" 
                      }}>
                        {role === "teacher" ? (
                          <div className="d-flex flex-column flex-md-row justify-content-center gap-1">
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "#7e3af2", 
                                border: "none",
                                fontSize: window.innerWidth < 768 ? "10px" : "12px",
                                padding: window.innerWidth < 768 ? "2px 6px" : "5px 10px",
                                transition: "all 0.3s ease",
                                minWidth: window.innerWidth < 768 ? "60px" : "auto"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#6a2fd9";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#7e3af2";
                              }}
                            >
                              <span className="d-none d-md-inline">Enter Marks</span>
                              <span className="d-md-none">Marks</span>
                            </Button>
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #7e3af2", 
                                color: "#7e3af2",
                                fontSize: window.innerWidth < 768 ? "10px" : "12px",
                                padding: window.innerWidth < 768 ? "2px 6px" : "5px 10px",
                                transition: "all 0.3s ease",
                                minWidth: window.innerWidth < 768 ? "60px" : "auto"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(126, 58, 242, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                              }}
                            >
                              <span className="d-none d-md-inline">Message</span>
                              <span className="d-md-none">Msg</span>
                            </Button>
                            <Button 
                              size="sm" 
                              className="d-none d-md-inline-block"
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #cbd5e1", 
                                color: "#1e2a38",
                                fontSize: "12px",
                                padding: "5px 10px",
                                transition: "all 0.3s ease"
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
                              Progress
                            </Button>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center gap-1">
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #7e3af2", 
                                color: "#7e3af2",
                                transition: "all 0.3s ease",
                                padding: window.innerWidth < 768 ? "4px 8px" : "5px 10px"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(126, 58, 242, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                              }}
                              onClick={() => handleEdit(l)}
                            >
                              <FaEdit style={{ fontSize: window.innerWidth < 768 ? "12px" : "14px" }} />
                            </Button>
                            <Button 
                              size="sm" 
                              style={{
                                backgroundColor: "transparent", 
                                border: "1px solid #ef4444", 
                                color: "#ef4444",
                                transition: "all 0.3s ease",
                                padding: window.innerWidth < 768 ? "4px 8px" : "5px 10px"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                              }}
                              onClick={() => handleDelete(l)}
                            >
                              <FaTrash style={{ fontSize: window.innerWidth < 768 ? "12px" : "14px" }} />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Add/Edit Learner Modal (Admin Only) */}
        {role === "admin" && (
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
                color: "#1e2a38",
                border: "none"
              }}
            >
              <Modal.Title style={{ fontSize: "clamp(1rem, 3vw, 1.125rem)", fontWeight: "500" }}>
                {selectedLearner ? "Edit Learner" : "Add New Learner"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#f8f9fa", color: "#1e2a38", maxHeight: "70vh", overflowY: "auto" }}>
              <Row className="g-2 g-md-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Full Name
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
                      Roll Number
                    </Form.Label>
                    <Form.Control 
                      name="roll" 
                      value={formData.roll} 
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
                <Col xs={12} sm={6} md={4}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Class
                    </Form.Label>
                    <Form.Select 
                      name="class" 
                      value={formData.class} 
                      onChange={handleChange} 
                      style={{ 
                        backgroundColor: "white", 
                        border: "1px solid #cbd5e1", 
                        color: "#1e2a38",
                        fontSize: "clamp(0.875rem, 2vw, 1rem)"
                      }}
                    >
                      <option value="">Select Class</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Section
                    </Form.Label>
                    <Form.Select 
                      name="section" 
                      value={formData.section} 
                      onChange={handleChange} 
                      style={{ 
                        backgroundColor: "white", 
                        border: "1px solid #cbd5e1", 
                        color: "#1e2a38",
                        fontSize: "clamp(0.875rem, 2vw, 1rem)"
                      }}
                    >
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Gender
                    </Form.Label>
                    <Form.Select 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleChange} 
                      style={{ 
                        backgroundColor: "white", 
                        border: "1px solid #cbd5e1", 
                        color: "#1e2a38",
                        fontSize: "clamp(0.875rem, 2vw, 1rem)"
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Date of Birth
                    </Form.Label>
                    <Form.Control 
                      type="date"
                      name="dob" 
                      value={formData.dob} 
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
                <Col xs={12} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Parent Name
                    </Form.Label>
                    <Form.Control 
                      name="parent" 
                      value={formData.parent} 
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
                <Col xs={12} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Parent Contact
                    </Form.Label>
                    <Form.Control 
                      name="contact" 
                      value={formData.contact} 
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
                <Col xs={12} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Admission Date
                    </Form.Label>
                    <Form.Control 
                      type="date"
                      name="admission" 
                      value={formData.admission} 
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
                <Col xs={12} sm={6} md={6}>
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
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label style={{ color: "#1e2a38", fontWeight: "500", fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
                      Address
                    </Form.Label>
                    <Form.Control 
                      as="textarea"
                      rows={2}
                      name="address" 
                      value={formData.address} 
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
              </Row>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#f8f9fa", border: "none" }}>
              <Button 
                style={{ 
                  backgroundColor: "#7e3af2", 
                  border: "none",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  padding: "8px 20px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#6a2fd9";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#7e3af2";
                }}
                onClick={selectedLearner ? handleUpdate : handleAdd}
              >
                {selectedLearner ? "Update" : "Save"}
              </Button>
              <Button 
                variant="secondary" 
                style={{ 
                  backgroundColor: "transparent", 
                  border: "1px solid #cbd5e1", 
                  color: "#1e2a38",
                  transition: "all 0.3s ease",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  padding: "8px 20px"
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
        )}

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
              Are you sure you want to delete <strong>{selectedLearner?.name}</strong>?
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
                padding: "8px 20px"
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
                padding: "8px 20px"
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

export default AdminLearners;