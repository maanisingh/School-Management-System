import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import {
  getClassById,
  saveClass,
  removeLearnerFromClass,
  updateLearner,
  sortLearnersBySurname,
  formatLearnerName
} from "../../utils/classStorage";

/**
 * ManageLearners page - manages learners for a class
 * Route: /teacher/class/:classId/learners
 *
 * FIXED: Now uses global storage utilities
 */

const ManageLearners = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  // FIXED: Load from global storage
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState({ show: false, learner: null });

  const loadClassData = () => {
    const data = getClassById(classId);
    if (data) {
      setStore(data);
      setLoading(false);
    } else {
      alert("Class not found!");
      navigate("/admin-dashboard");
    }
  };

  useEffect(() => {
    loadClassData();
  }, [classId]);

  // FIXED: Use sorting utility (Issue #6)
  const filtered = store
    ? sortLearnersBySurname(
        store.learners.filter((l) =>
          (l.surname + " " + l.name).toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  const openEdit = (learner) => setEditModal({ show: true, learner });
  const closeEdit = () => setEditModal({ show: false, learner: null });

  // FIXED: Use global storage utility (Issue #5)
  const saveEdit = (updated) => {
    updateLearner(classId, updated);
    loadClassData(); // Reload to get updated data
    closeEdit();
  };

  // FIXED: Use global storage utility
  const confirmDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this learner? This will remove all their marks and analysis data from this class.")) return;
    removeLearnerFromClass(classId, id);
    loadClassData(); // Reload to get updated data
  };

  // Show loading state
  if (loading || !store) {
    return (
      <Container fluid style={{ padding: "20px", backgroundColor: "#e2e8f0" }}>
        <h2 style={{ color: "#1e2a38" }}>Loading...</h2>
      </Container>
    );
  }

  return (
    <Container fluid style={{ padding: "20px", backgroundColor: "#e2e8f0" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 style={{ color: "#1e2a38" }}>Manage Learners</h3>
          <p className="text-muted">Class: Grade {store.grade} {store.section}</p>
        </div>
        <div>
          <Button 
            variant="secondary" 
            onClick={() => navigate(-1)}
            style={{ 
              border: "#7e3af2", 
              color: "#7e3af2", 
              backgroundColor: "transparent" 
            }}
          >
            Back to Class
          </Button>
        </div>
      </div>

      <InputGroup className="mb-3" style={{ maxWidth: 480 }}>
        <FormControl 
          placeholder="Search learners by name or surname" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ borderColor: "#cbd5e1" }}
        />
      </InputGroup>

      <Table 
        responsive 
        bordered 
        hover
        style={{ 
          backgroundColor: "white",
          border: "1px solid #cbd5e1",
          borderRadius: "4px"
        }}
      >
       <thead>
  <tr style={{ color: "#1e2a38" }}>
    <th style={{ borderColor: "#cbd5e1" }}>Surname</th>
    <th style={{ borderColor: "#cbd5e1" }}>Name</th>
    <th style={{ borderColor: "#cbd5e1" }}>Progressed</th>
    <th style={{ width: 160, borderColor: "#cbd5e1" }}>Actions</th>
  </tr>
</thead>
<tbody>
  {filtered.length === 0 ? (
    <tr><td colSpan="4" style={{ borderColor: "#cbd5e1" }}>No learners found.</td></tr>
  ) : (
    filtered.map((l) => (
      <tr 
        key={l.id} 
        style={{ 
          borderColor: "#cbd5e1",
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(126, 58, 242, 0.1)"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}
      >
        <td style={{ borderColor: "#cbd5e1" }}>{l.surname}</td>
        <td style={{ borderColor: "#cbd5e1" }}>{l.name}</td>
        <td style={{ borderColor: "#cbd5e1" }}>{l.progressed ? "Yes" : "No"}</td>
        <td style={{ borderColor: "#cbd5e1" }}>
          <Button 
            size="sm" 
            onClick={() => openEdit(l)} 
            className="me-2"
            style={{ 
              backgroundColor: "#7e3af2", 
              border: "none",
              color: "white"
            }}
          >
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="danger" 
            onClick={() => confirmDelete(l.id)}
            style={{ 
              backgroundColor: "#7e3af2", 
              border: "none",
              color: "white"
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ))
  )}
</tbody>
      </Table>

      <EditLearnerModal show={editModal.show} learner={editModal.learner} onHide={closeEdit} onSave={saveEdit} />
    </Container>
  );
};

/* Small icon helper so we don't need to import react-icons here */
const FaIcon = ({ name }) => {
  // minimal mapping
  return <span style={{ fontSize: 14, color: name === "edit" ? "#7e3af2" : "#1e2a38" }}>
    {name === "edit" ? "✎" : "•"}
  </span>;
};

const EditLearnerModal = ({ show, learner, onHide, onSave }) => {
  const [form, setForm] = useState({ surname: "", name: "", progressed: false });
  useEffect(() => {
    if (learner) setForm({ ...learner });
  }, [learner]);
  if (!learner) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ color: "#1e2a38" }}>
        <Modal.Title style={{ color: "#1e2a38" }}>Edit Learner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label style={{ color: "#1e2a38" }}>Surname</Form.Label>
            <Form.Control 
              value={form.surname} 
              onChange={(e) => setForm((p) => ({ ...p, surname: e.target.value }))}
              style={{ borderColor: "#cbd5e1" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label style={{ color: "#1e2a38" }}>Name</Form.Label>
            <Form.Control 
              value={form.name} 
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              style={{ borderColor: "#cbd5e1" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Check 
              type="checkbox" 
              label="Progressed Learner" 
              checked={form.progressed} 
              onChange={(e) => setForm((p) => ({ ...p, progressed: e.target.checked }))}
              style={{ color: "#1e2a38" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{ 
            border: "#7e3af2", 
            color: "#7e3af2", 
            backgroundColor: "transparent" 
          }}
        >
          Cancel
        </Button>
        <Button 
          style={{ 
            backgroundColor: "#7e3af2", 
            border: "none",
            color: "white" 
          }} 
          onClick={() => onSave(form)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageLearners;