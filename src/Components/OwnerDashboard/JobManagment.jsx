import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Dropdown,
  Accordion,
  Badge,
} from "react-bootstrap";
import { BsBuilding, BsPlus, BsGear, BsLightbulb } from "react-icons/bs";

const JobsDashboard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "South Shore Estate - Phase 2",
      manager: "Sarah Johnson",
      client: "Chen Family",
      progress: 65,
      budgetUsed: 592500,
      budgetTotal: 950000,
      deadline: "03/12/2025",
      status: "IN PROGRESS",
    },
    {
      id: 2,
      title: "Westfield Renovation",
      manager: "Michael Torres",
      client: "Garcia LLC",
      progress: 20,
      budgetUsed: 78000,
      budgetTotal: 390000,
      deadline: "08/15/2025",
      status: "Planning",
    },
  ]);

  const stats = [
    { label: "Active Projects", value: 18 },
    { label: "Completed", value: 105 },
    { label: "Upcoming Deadlines", value: 3 },
  ];

  const insights = [
    {
      type: "danger",
      title: "Quality Risk",
      desc: "Weather or conditions may impact concrete",
      action: "View Details",
    },
    {
      type: "success",
      title: "Deposits",
      desc: "$245k in client deposits expected",
      action: "Process",
    },
    {
      type: "primary",
      title: "Documents",
      desc: "3 project applications require review",
      action: "Review",
    },
  ];

  return (
    <Container fluid className="p-4" style={{ background: "#fff" }}>
      {/* HEADER */}
      <Card
        className="p-3 d-flex flex-row align-items-center justify-content-between mb-4"
        style={{
          background: "#fffbeb",
          border: "1px solid #f3e8c9",
          borderRadius: "10px",
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              background: "#a020f0",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsBuilding />
          </div>
          <strong>Organization Management</strong>
        </div>
        <Button
          variant="light"
          className="border rounded-circle"
          style={{ width: 30, height: 30 }}
        >
          ⌄
        </Button>
      </Card>

      {/* JOB STATISTICS */}
      <Card className="p-3 mb-4 shadow-sm border-0">
        <h6 className="fw-semibold mb-3">Job Statistics</h6>
        <Row>
          {stats.map((s, i) => (
            <Col key={i} xs={12} sm={6} md={4} className="mb-2">
              <div className="d-flex justify-content-between text-muted small">
                <span>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* JOBS MANAGEMENT HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
        <h6 className="m-0 fw-semibold">Jobs Management & Setup</h6>

        <div className="d-flex gap-2 align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="border rounded-3 fw-semibold"
            >
              Sunview Homes
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Sunview Homes</Dropdown.Item>
              <Dropdown.Item>Nova Estates</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button
            variant="warning"
            className="fw-semibold"
            onClick={() => alert("Create New Job clicked")}
          >
            <BsPlus size={20} /> Create New Job
          </Button>
        </div>
      </div>

      {/* JOB CARDS */}
      {jobs.map((job) => (
        <Card key={job.id} className="p-3 mb-3 shadow-sm border-0 rounded-3">
          <Row className="align-items-center gy-3">
            <Col xs={12} md={6}>
              <h6 className="fw-semibold mb-1">{job.title}</h6>
              <div className="text-muted small">
                Project Manager: {job.manager}
              </div>
              <div className="text-muted small">Client: {job.client}</div>

              <div className="mt-3">
                <span className="fw-semibold small d-block mb-1">Progress</span>
                <ProgressBar
                  now={job.progress}
                  label={`${job.progress}%`}
                  variant="warning"
                  style={{ height: "8px" }}
                />
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
                <div className="text-center text-md-start small">
                  <div className="fw-semibold">Budget Utilization</div>
                  <div className="text-muted">
                    ${job.budgetUsed.toLocaleString()} / $
                    {job.budgetTotal.toLocaleString()}
                  </div>
                  <div className="text-muted">{job.progress}% Used</div>
                </div>

                <div className="text-center small">
                  <div className="fw-semibold">Deadline</div>
                  <div className="text-muted">{job.deadline}</div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Badge
                    bg={
                      job.status === "IN PROGRESS"
                        ? "warning"
                        : job.status === "Planning"
                        ? "dark"
                        : "secondary"
                    }
                    text={job.status === "IN PROGRESS" ? "dark" : "light"}
                    className="text-uppercase px-3 py-2 small"
                  >
                    {job.status}
                  </Badge>
                  <Button
                    variant="light"
                    size="sm"
                    className="border rounded-3 d-flex align-items-center gap-1"
                    onClick={() => alert(`Configuring ${job.title}`)}
                  >
                    <BsGear /> Configure
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}

      {/* JOB ACTIONS */}
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>New Project</Accordion.Header>
          <Accordion.Body>Create a new project from scratch.</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Schedule View</Accordion.Header>
          <Accordion.Body>Manage your job schedules here.</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Reports</Accordion.Header>
          <Accordion.Body>View and export job performance reports.</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Budget Overview</Accordion.Header>
          <Accordion.Body>Track project budgets and financials.</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* AI INSIGHTS */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <BsLightbulb className="text-primary" />
          <h6 className="m-0 fw-semibold">AI Insights & Recommendations</h6>
        </div>
        <a href="#" className="text-primary small fw-semibold text-decoration-none">
          View all
        </a>
      </div>

      <Row xs={1} md={3} className="g-3">
        {insights.map((ins, i) => (
          <Col key={i}>
            <Card
              className="p-3 shadow-sm border-0 rounded-3 d-flex flex-column justify-content-between h-100"
              onClick={() => alert(`${ins.title} - ${ins.action}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Badge bg={ins.type} className="small opacity-75">
                  {ins.title}
                </Badge>
                <div className="text-muted small flex-grow-1">
                  {ins.desc}
                </div>
              </div>
              <div className="text-primary fw-semibold small mt-2">
                {ins.action}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobsDashboard;