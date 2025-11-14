import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form, Table, InputGroup, FormControl } from "react-bootstrap";
import { FaUsers, FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

/**
 * ClassWorkspace
 * Layout: Header, Class Actions, Class Subjects, Footer
 *
 * Local state implementation:
 * - classData: loaded from localStorage or initial list passed via props (for demo)
 * - learners: array of { id, surname, name, progressed: boolean }
 * - subjects: array of { id, phase, grade, subjectKey, name, enrolledLearnerIds: [] }
 *
 * NOTE: persist to localStorage here for demo so refresh won't lose changes.
 */

const CAPS_SUBJECTS = {
    GET: { label: "GET (Grades 7–9)", grades: ["7", "8", "9"], subjects: ["Mathematics", "Physical Sciences", "Life Sciences"] },
    FET: { label: "FET (Grades 10–12)", grades: ["10", "11", "12"], subjects: ["Mathematics", "Physical Sciences", "Life Sciences"] },
};

const ClassWorkspace = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

    // Load class store from localStorage or create an empty structure for this class id
    const storageKey = `fundisa_class_${classId}`;
    const [store, setStore] = useState(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) return JSON.parse(raw);
        } catch { }
        // default structure
        return {
            id: classId,
            grade: "12",
            section: "",
            learners: [], // {id, surname, name, progressed}
            subjects: [], // {id, phase, grade, subjectKey, name, enrolledLearnerIds: []}
        };
    });

    // Modals
    const [showAddLearner, setShowAddLearner] = useState(false);
    const [addLearnerForm, setAddLearnerForm] = useState({ surname: "", name: "", progressed: false });
    const [showAddSubject, setShowAddSubject] = useState(false);
    const [addSubjectForm, setAddSubjectForm] = useState({ phase: "GET", grade: "", subject: "" });
    const [editingSubject, setEditingSubject] = useState(null);
    const [showEditLearnersForSubject, setShowEditLearnersForSubject] = useState(false);
    const [subjectToEditLearners, setSubjectToEditLearners] = useState(null);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(store));
    }, [store, storageKey]);

    // Helpers
    const sortedLearners = [...store.learners].sort((a, b) => a.surname.localeCompare(b.surname));

    // Add learner popup behavior per spec
    const handleSaveLearner = () => {
        const { surname, name } = addLearnerForm;
        if (!surname.trim() || !name.trim()) return alert("Please enter surname and name.");
        const newLearner = { id: uuidv4(), surname: surname.trim(), name: name.trim(), progressed: !!addLearnerForm.progressed };
        // When added: automatically enrolled in all subjects by default
        const updatedSubjects = store.subjects.map((s) => ({
            ...s,
            enrolledLearnerIds: Array.from(new Set([...s.enrolledLearnerIds, newLearner.id])),
        }));
        setStore((prev) => ({
            ...prev,
            learners: [...prev.learners, newLearner],
            subjects: updatedSubjects,
        }));
        // confirmation flow
        if (window.confirm("Learner added successfully. Do you want to add another learner?")) {
            setAddLearnerForm({ surname: "", name: "", progressed: false });
            // keep modal open
        } else {
            setAddLearnerForm({ surname: "", name: "", progressed: false });
            setShowAddLearner(false);
        }
    };

    // Manage learners — redirect to ManageLearners route
    const goToManageLearners = () => {
        navigate(`/class/${classId}/learners`);
    };

    // Add Subject modal behavior
    const handleAddSubject = () => {
        const { phase, grade, subject } = addSubjectForm;
        if (!phase || !grade || !subject) return alert("Please select phase, grade and subject.");
        // prevent duplicate subject for this class
        const exists = store.subjects.some((s) => s.phase === phase && s.grade === grade && s.subjectKey === subject);
        if (exists) return alert("Subject already added to this class.");
        // Enroll all existing learners by default
        const enrollIds = store.learners.map((l) => l.id);
        const newSubject = {
            id: uuidv4(),
            phase,
            grade,
            subjectKey: subject,
            name: subject,
            enrolledLearnerIds: enrollIds,
        };
        setStore((prev) => ({ ...prev, subjects: [...prev.subjects, newSubject] }));
        setShowAddSubject(false);
        setAddSubjectForm({ phase: "GET", grade: "", subject: "" });
    };

    // Delete subject (removes subject and its tasks but not learners)
    const handleDeleteSubject = (subId) => {
        if (!window.confirm("Delete this subject and its associated tasks? This will not remove learners.")) return;
        setStore((prev) => ({ ...prev, subjects: prev.subjects.filter((s) => s.id !== subId) }));
    };

    // Open edit learners modal for a specific subject
    const openEditLearners = (subject) => {
        setSubjectToEditLearners(subject);
        setShowEditLearnersForSubject(true);
    };

    // Save learners enrolled/un-enrolled for a subject
    const handleSaveSubjectLearners = (subjectId, newEnrolledIds) => {
        setStore((prev) => ({
            ...prev,
            subjects: prev.subjects.map((s) => (s.id === subjectId ? { ...s, enrolledLearnerIds: newEnrolledIds } : s)),
        }));
        setShowEditLearnersForSubject(false);
        setSubjectToEditLearners(null);
    };

    // Footer counters
    const totalLearners = store.learners.length;
    const progressedCount = store.learners.filter((l) => l.progressed).length;

    // Manage delete learner globally (used by manage learners page)
    const deleteLearnerGlobally = (learnerId) => {
        setStore((prev) => ({
            ...prev,
            learners: prev.learners.filter((l) => l.id !== learnerId),
            subjects: prev.subjects.map((s) => ({ ...s, enrolledLearnerIds: s.enrolledLearnerIds.filter((id) => id !== learnerId) })),
        }));
    };

    // Edit learner globally
    const updateLearnerGlobally = (updatedLearner) => {
        setStore((prev) => ({ ...prev, learners: prev.learners.map((l) => (l.id === updatedLearner.id ? updatedLearner : l)) }));
    };

    // Small helpers to compute class name
    const classNameDisplay = `Grade ${store.grade}${store.section ? ` ${store.section}` : ""}`;

    const goToAnalysisSelection = (subjectId, taskType) => {
        navigate(`/analysis/${taskType}/${subjectId}/select`);
    };


    return (
        <Container fluid style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#e2e8f0" }}>
            {/* Header */}
            <Row className="mb-3 align-items-center">
                <Col>
                    <h2 style={{ color: "#1e2a38" }}>{classNameDisplay} — Class Workspace</h2>
                    <p style={{ color: "#64748b" }}>{store.subjects.length} subjects • {totalLearners} learners</p>
                </Col>
                <Col className="text-end">
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => navigate(-1)}
                        style={{
                            border: "#7e3af2",
                            color: "#7e3af2",
                            backgroundColor: "transparent"
                        }}
                    >
                        Back
                    </Button>
                </Col>
            </Row>

            {/* Class Actions */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Row className="g-2 align-items-center">
                    <Col xs="auto">
                        <Button
                            onClick={() => setShowAddLearner(true)}
                            style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                        >
                            <FaPlus className="me-1" /> Add Learner
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="outline-primary"
                            onClick={goToManageLearners}
                            style={{
                                border: "#7e3af2",
                                color: "#ffff",
                                backgroundColor: "#7e3af2"
                            }}
                        >
                            <FaPlus className="me-1" />Manage Learners
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            onClick={() => setShowAddSubject(true)}
                            style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                        >
                            <FaPlus className="me-1" /> Add Subject
                        </Button>
                    </Col>
                    <Col className="ms-auto text-end">
                        <Button
                            variant="outline-secondary"
                            disabled
                            style={{
                                border: "#7e3af2",
                                color: "#7e3af2",
                                backgroundColor: "transparent",
                                opacity: 0.6,
                                cursor: "not-allowed"
                            }}
                        >
                            Class Reports (coming soon)
                        </Button>
                    </Col>
                </Row>
            </Card>


            {/* Class Subjects Table (auto-updated) */}
            <Card className="mb-3" style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <h5 style={{ color: "#1e2a38" }}>Class Subjects</h5>
                <Table responsive bordered hover className="mt-2">
                    <thead style={{ backgroundColor: "#1e2a38", color: "white" }}>
                        <tr>
                            <th>Subject Name</th>
                            <th>Formal Tasks</th>
                            <th>Informal Tasks</th>
                            <th>Learners</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.subjects.length === 0 && (
                            <tr>
                                <td colSpan="5">No subjects added yet. Click “+ Add Subject” to add (CAPS list only).</td>
                            </tr>
                        )}
                        {store.subjects.map((s) => (
                            <tr key={s.id}>
                                <td>{s.name}</td>

                                {/* Formal Tasks */}
                                <td>
                                    <Button
                                        variant="link"
                                        style={{ color: "#7e3af2", textDecoration: "none" }}
                                        // UPDATED: Navigate to the new Formal Task Mark Entry page
                                        onClick={() => navigate(`/class/${classId}/subject/${s.id}/formal-tasks`)}
                                    >
                                        Mark Entry
                                    </Button>
                                    <Button
                                        variant="link"
                                        style={{ color: "#7e3af2", textDecoration: "none" }}
                                        // UPDATED: Navigate to the analysis page (you can create this later)
                                        onClick={() => goToAnalysisSelection(s.id, "formal")}
                                    >
                                        Analyse
                                    </Button>
                                </td>

                                {/* Informal Tasks */}
                                <td>
                                    <Button
                                        variant="link"
                                        style={{ color: "#7e3af2", textDecoration: "none" }}
                                        // UPDATED: Navigate to the informal tasks page (you can create this later)
                                        onClick={() => navigate(`/class/${classId}/subject/${s.id}/informal-tasks`)}
                                    >
                                        Mark Entry
                                    </Button>
                                    <Button
                                        variant="link"
                                        style={{ color: "#7e3af2", textDecoration: "none" }}
                                        // UPDATED: Navigate to the informal analysis page (you can create this later)
                                        onClick={() => navigate(`/class/${classId}/subject/${s.id}/informal-analysis`)}
                                    >
                                        Analyse
                                    </Button>
                                </td>

                                {/* Learners */}
                                <td>
                                    <Button
                                        variant="link"
                                        style={{ color: "#7e3af2", textDecoration: "none" }}
                                        onClick={() => openEditLearners(s)}
                                        className="d-flex align-items-center justify-content-center"
                                    >
                                        <FaUsers className="m-2" /> Edit Learners
                                    </Button>
                                </td>

                                {/* Actions */}
                                <td>
                                    <Button
                                        variant="link"
                                        style={{ color: "#7e3af2", textDecoration: "none" }}
                                        onClick={() => handleDeleteSubject(s.id)}
                                        className="d-flex align-items-center justify-content-center"
                                    >
                                        <FaTrashAlt className="m-2" /> Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Card>

            {/* Footer showing totals and progressed learners */}
            <Card style={{ padding: "12px", border: "1px solid #cbd5e1" }}>
                <Row>
                    <Col xs={12} md={4}>
                        <strong style={{ color: "#1e2a38" }}>Total learners:</strong> {totalLearners}
                    </Col>
                    <Col xs={12} md={4}>
                        <strong style={{ color: "#1e2a38" }}>Progressed learners:</strong> {progressedCount}
                    </Col>
                    <Col xs={12} md={4} className="text-md-end">
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                // quick demo: toggle first learner as progressed (if exists)
                                if (store.learners.length === 0) { alert("No learners to toggle."); return; }
                                const first = store.learners[0];
                                updateLearnerGlobally({ ...first, progressed: !first.progressed });
                            }}
                            style={{
                                border: "#7e3af2",
                                color: "#7e3af2",
                                backgroundColor: "transparent"
                            }}
                        >
                            Toggle first progressed (demo)
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* ===== Add Learner Modal ===== */}
            <Modal show={showAddLearner} onHide={() => setShowAddLearner(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#1e2a38" }}>Add Learner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-2">
    <Form.Label style={{ color: "#1e2a38" }}>Surname</Form.Label>
    <Form.Control
        value={addLearnerForm.surname}
        onChange={(e) => setAddLearnerForm((p) => ({ ...p, surname: e.target.value }))}
    />
</Form.Group>
<Form.Group className="mb-2">
    <Form.Label style={{ color: "#1e2a38" }}>Name</Form.Label>
    <Form.Control
        value={addLearnerForm.name}
        onChange={(e) => setAddLearnerForm((p) => ({ ...p, name: e.target.value }))}
    />
</Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Check
                                type="checkbox"
                                label="Progressed Learner"
                                checked={addLearnerForm.progressed}
                                onChange={(e) => setAddLearnerForm((p) => ({ ...p, progressed: e.target.checked }))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddLearner(false)}
                        style={{
                            border: "#7e3af2",
                            color: "#7e3af2",
                            backgroundColor: "transparent"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                        onClick={handleSaveLearner}
                    >
                        Save Learner
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ===== Add Subject Modal (CAPS list only) ===== */}
            <Modal show={showAddSubject} onHide={() => setShowAddSubject(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#1e2a38" }}>Add Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: "#1e2a38" }}>Phase</Form.Label>
                            <Form.Select
                                value={addSubjectForm.phase}
                                onChange={(e) => setAddSubjectForm((p) => ({ ...p, phase: e.target.value, grade: "", subject: "" }))}
                            >
                                <option value="GET">{CAPS_SUBJECTS.GET.label}</option>
                                <option value="FET">{CAPS_SUBJECTS.FET.label}</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: "#1e2a38" }}>Grade</Form.Label>
                            <Form.Select
                                value={addSubjectForm.grade}
                                onChange={(e) => setAddSubjectForm((p) => ({ ...p, grade: e.target.value }))}
                            >
                                <option value="">Select Grade</option>
                                {CAPS_SUBJECTS[addSubjectForm.phase].grades.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: "#1e2a38" }}>Subject</Form.Label>
                            <Form.Select
                                value={addSubjectForm.subject}
                                onChange={(e) => setAddSubjectForm((p) => ({ ...p, subject: e.target.value }))}
                            >
                                <option value="">Select Subject</option>
                                {CAPS_SUBJECTS[addSubjectForm.phase].subjects.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-muted">Subjects are preloaded from CAPS. Teachers cannot create new subjects here.</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddSubject(false)}
                        style={{
                            border: "#7e3af2",
                            color: "#7e3af2",
                            backgroundColor: "transparent"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                        onClick={handleAddSubject}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ===== Edit Learners For Subject Modal ===== */}
            <EditLearnersModal
                show={showEditLearnersForSubject}
                onHide={() => { setShowEditLearnersForSubject(false); setSubjectToEditLearners(null); }}
                subject={subjectToEditLearners}
                learners={sortedLearners}
                onSave={(newEnrolledIds) => handleSaveSubjectLearners(subjectToEditLearners.id, newEnrolledIds)}
            />

            {/* NOTE: include exported helpers for ManageLearners page via location storage */}
            {/* For demo purpose pass store mutation functions via localStorage or contexts.
          ManageLearners page (separate file) will read/write to the same localStorage key.
      */}
        </Container>
    );
};

/* ===== EditLearnersModal component (internal) ===== */
const EditLearnersModal = ({ show, onHide, subject, learners = [], onSave }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    useEffect(() => {
        if (!subject) return;
        setSelectedIds(subject.enrolledLearnerIds || []);
    }, [subject]);

    const toggle = (id) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };
    const selectAll = () => setSelectedIds(learners.map((l) => l.id));
    const deselectAll = () => setSelectedIds([]);

    if (!subject) return null;
    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "#1e2a38" }}>Edit Learners — {subject?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <div className="d-flex justify-content-between mb-2">
                    <div>
                        <Button
                            size="sm"
                            onClick={selectAll}
                            style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                        >
                            Select All
                        </Button>{" "}
                        <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={deselectAll}
                            style={{
                                border: "#7e3af2",
                                color: "#7e3af2",
                                backgroundColor: "transparent"
                            }}
                        >
                            Deselect All
                        </Button>
                    </div>
                    <div>
                        <small style={{ color: "#1e2a38" }}>{selectedIds.length} selected</small>
                    </div>
                </div>

                <div>
                    {learners.length === 0 && <p>No learners in class.</p>}
                    {learners.map((l) => (
                        <div key={l.id} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`chk-${l.id}`}
                                checked={selectedIds.includes(l.id)}
                                onChange={() => toggle(l.id)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`chk-${l.id}`}
                                style={{ color: "#1e2a38" }}
                            >
                                {l.surname} {l.name}
                            </label>
                        </div>
                    ))}
                </div>
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
                    style={{ backgroundColor: "#7e3af2", border: "none", color: "white" }}
                    onClick={() => onSave(selectedIds)}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClassWorkspace;