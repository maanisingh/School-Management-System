import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  FaChalkboardTeacher,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminClasses = () => {
  const [classes, setClasses] = useState([
    { id: 1, grade: "Grade 1", section: "A" },
    { id: 2, grade: "Grade 2", section: "B" },
    { id: 3, grade: "Grade 3", section: "C" },
  ]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState({ id: null, grade: "", section: "" });

  const handleShow = () => {
    setEditMode(false);
    setCurrentClass({ id: null, grade: "", section: "" });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = () => {
    if (!currentClass.grade || !currentClass.section)
      return alert("Please fill all fields");
    if (editMode) {
      setClasses(
        classes.map((cls) => (cls.id === currentClass.id ? currentClass : cls))
      );
    } else {
      setClasses([...classes, { ...currentClass, id: Date.now() }]);
    }
    handleClose();
  };

  const handleEdit = (cls) => {
    setEditMode(true);
    setCurrentClass(cls);
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this class?")) {
      setClasses(classes.filter((cls) => cls.id !== id));
    }
  };

  const filtered = classes.filter(
    (cls) =>
      cls.grade.toLowerCase().includes(search.toLowerCase()) ||
      cls.section.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 0",
        color: "#1e2a38",
      }}
    >
      <Container fluid="md">
        {/* Header */}
        <Row className="mb-4">
          <Col className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <FaChalkboardTeacher
                style={{ color: "#7e3af2", fontSize: "30px", marginRight: "10px" }}
              />
              <h3 className="mb-0 text-dark fw-bold">Classes</h3>
            </div>
            <Button
              onClick={handleShow}
              style={{
                backgroundColor: "#7e3af2",
                borderColor: "#7e3af2",
                borderRadius: "8px",
                padding: "8px 20px",
              }}
            >
              <FaPlus className="me-2" />
              Add Class
            </Button>
          </Col>
        </Row>

        {/* Description */}
        <Row className="mb-4">
          <Col>
            <p className="text-secondary mb-0 fs-6">
              Manage all class sections efficiently. Add, Edit, or Delete
              classes easily using the panel below.
            </p>
          </Col>
        </Row>

        {/* Search and Action Bar */}
        <Row className="mb-3">
          <Col md={6} className="mb-2">
            <InputGroup>
              <InputGroup.Text
                style={{
                  backgroundColor: "rgba(126,58,242,0.1)",
                  border: "1px solid #7e3af2",
                  color: "#7e3af2",
                }}
              >
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search by grade or section..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  backgroundColor: "rgba(126,58,242,0.1)",
                  border: "1px solid #7e3af2",
                  color: "#1e2a38",
                }}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Classes Table */}
        <Row>
          <Col>
            <Card
              style={{
                backgroundColor: "white",
                border: "1px solid #cbd5e1",
                borderRadius: "14px",
              }}
              className="shadow-sm"
            >
              <Card.Body>
                <Table
                  responsive
                  hover
                  className="align-middle"
                  style={{
                    backgroundColor: "transparent",
                    borderCollapse: "separate",
                    borderSpacing: "0 10px",
                    color: "#1e2a38",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "rgba(126,58,242,0.1)",
                      color: "#1e2a38",
                    }}
                  >
                    <tr>
                      <th>#</th>
                      <th>Grade</th>
                      <th>Section</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length > 0 ? (
                      filtered.map((cls, i) => (
                        <tr
                          key={cls.id}
                          style={{
                            backgroundColor: "rgba(255,255,255,0.8)",
                            borderRadius: "10px",
                          }}
                        >
                          <td>{i + 1}</td>
                          <td>{cls.grade}</td>
                          <td>{cls.section}</td>
                          <td className="text-center">
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: "transparent",
                                color: "#7e3af2",
                                border: "1px solid #7e3af2",
                                marginRight: "8px",
                              }}
                              onClick={() => handleEdit(cls)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: "transparent",
                                color: "#ef4444",
                                border: "1px solid #ef4444",
                              }}
                              onClick={() => handleDelete(cls.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-secondary">
                          No classes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "white", color: "#1e2a38", borderBottom: "1px solid #cbd5e1" }}
        >
          <Modal.Title>{editMode ? "Edit Class" : "Add New Class"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white", color: "#1e2a38" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <FormControl
                placeholder="Enter grade (e.g. Grade 5)"
                value={currentClass.grade}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, grade: e.target.value })
                }
                style={{
                  backgroundColor: "rgba(126,58,242,0.1)",
                  border: "1px solid #7e3af2",
                  color: "#1e2a38",
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Section</Form.Label>
              <FormControl
                placeholder="Enter section (e.g. A)"
                value={currentClass.section}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, section: e.target.value })
                }
                style={{
                  backgroundColor: "rgba(126,58,242,0.1)",
                  border: "1px solid #7e3af2",
                  color: "#1e2a38",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "white", borderTop: "1px solid #cbd5e1" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #7e3af2",
              color: "#7e3af2",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{
              backgroundColor: "#7e3af2",
              border: "none",
              color: "white",
            }}
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminClasses;