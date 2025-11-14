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
  FaUserTie,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Ravi Sharma", subject: "Mathematics", assignedClass: "Grade 8 - A" },
    { id: 2, name: "Priya Mehta", subject: "Science", assignedClass: "Grade 7 - B" },
    { id: 3, name: "Amit Kumar", subject: "English", assignedClass: "Grade 6 - C" },
  ]);

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({
    id: null,
    name: "",
    subject: "",
    assignedClass: "",
  });

  const handleShow = () => {
    setEditMode(false);
    setCurrentTeacher({ id: null, name: "", subject: "", assignedClass: "" });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = () => {
    if (!currentTeacher.name || !currentTeacher.subject || !currentTeacher.assignedClass)
      return alert("All fields are required");

    if (editMode) {
      setTeachers(
        teachers.map((t) => (t.id === currentTeacher.id ? currentTeacher : t))
      );
    } else {
      setTeachers([...teachers, { ...currentTeacher, id: Date.now() }]);
    }
    handleClose();
  };

  const handleEdit = (teacher) => {
    setEditMode(true);
    setCurrentTeacher(teacher);
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedClass.toLowerCase().includes(search.toLowerCase())
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
              <FaUserTie
                style={{ color: "#7e3af2", fontSize: "30px", marginRight: "10px" }}
              />
              <h3 className="mb-0 text-dark fw-bold">Teachers</h3>
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
              Add Teacher
            </Button>
          </Col>
        </Row>

        {/* Description */}
        <Row className="mb-4">
          <Col>
            <p className="text-secondary mb-0 fs-6">
              List of instructors and their assigned classes. Add, Edit, or Delete teachers easily.
            </p>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-3">
          <Col md={6} className="mb-2">
            <InputGroup>
              <InputGroup.Text
                style={{
                  backgroundColor: "rgba(126, 58, 242, 0.1)",
                  border: "1px solid #7e3af2",
                  color: "#7e3af2",
                }}
              >
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search by name, subject or class..."
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

        {/* Teachers Table */}
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
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Assigned Class</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((t, i) => (
                        <tr
                          key={t.id}
                          style={{
                            backgroundColor: "rgba(255,255,255,0.8)",
                            borderRadius: "10px",
                          }}
                        >
                          <td>{i + 1}</td>
                          <td>{t.name}</td>
                          <td>{t.subject}</td>
                          <td>{t.assignedClass}</td>
                          <td className="text-center">
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: "transparent",
                                color: "#7e3af2",
                                border: "1px solid #7e3af2",
                                marginRight: "8px",
                              }}
                              onClick={() => handleEdit(t)}
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
                              onClick={() => handleDelete(t.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center text-secondary">
                          No teachers found.
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
          <Modal.Title>
            {editMode ? "Edit Teacher" : "Add New Teacher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white", color: "#1e2a38" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <FormControl
                placeholder="Enter teacher name"
                value={currentTeacher.name}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, name: e.target.value })
                }
                style={{
                  backgroundColor: "rgba(126,58,242,0.1)",
                  border: "1px solid #7e3af2",
                  color: "#1e2a38",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <FormControl
                placeholder="Enter subject"
                value={currentTeacher.subject}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, subject: e.target.value })
                }
                style={{
                  backgroundColor: "rgba(126,58,242,0.1)",
                  border: "1px solid #7e3af2",
                  color: "#1e2a38",
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Assigned Class</Form.Label>
              <FormControl
                placeholder="Enter class (e.g. Grade 8 - A)"
                value={currentTeacher.assignedClass}
                onChange={(e) =>
                  setCurrentTeacher({
                    ...currentTeacher,
                    assignedClass: e.target.value,
                  })
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

export default AdminTeachers;