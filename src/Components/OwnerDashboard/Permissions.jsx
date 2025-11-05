import React from "react";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import { FaCheckCircle, FaMinusCircle, FaFileAlt, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
import { BsLightbulb } from "react-icons/bs";
import { MdOutlineCalendarToday, MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
function Permissions() {
  const roles = [
    "Admin",
    "Project manager",
    "Sales Manager",
    "Bookkeeper",
    "Subcontractor",
    "Client",
    "CEO",
  ];

  const permissions = [
    {
      module: "User Management",
      access: [true, false, true, false, false, false, true],
    },
    {
      module: "Financial Report",
      access: [true, true, true, true, false, false, true],
    },
    {
      module: "Project Creation",
      access: [true, true, true, false, false, false, true],
    },
    {
      module: "Schedule Management",
      access: [true, true, true, false, true, true, true],
    },
    {
      module: "Client Communication",
      access: [true, true, false, true, true, true, true],
    },
  ];

  const insightsData = [
    {
      id: 1,
      icon: <FaExclamationTriangle className="text-danger" />,
      title: "Quality Risk",
      level: "HIGH",
      levelColor: "danger",
      description: "Weather conditions may impact concrete",
      action: "View Details",
    },
    {
      id: 2,
      icon: <FaDollarSign className="text-success" />,
      title: "Deposits",
      level: "MEDIUM",
      levelColor: "success",
      description: "$245k in client deposits expected",
      action: "Process",
    },
    {
      id: 3,
      icon: <FaFileAlt className="text-primary" />,
      title: "Documents",
      level: "NEW",
      levelColor: "primary",
      description: "3 permit applications require",
      action: "Review",
    },
  ];

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h5 className="fw-semibold m-0">Permissions Matrix & Role Management</h5>
        <Button
          variant="warning"
          className="fw-semibold px-4 py-1 shadow-sm"
          onClick={() => alert("Configure clicked")}
        >
          Configure
        </Button>
      </div>

      {/* Permissions Table */}
      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th className="text-start">Module</th>
              {roles.map((role, index) => (
                <th key={index}>{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, i) => (
              <tr key={i}>
                <td className="text-start fw-medium">{perm.module}</td>
                {perm.access.map((allowed, j) => (
                  <td key={j}>
                    {allowed ? (
                      <FaCheckCircle className="text-success fs-5" />
                    ) : (
                      <span className="text-muted">–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* AI Insights & Recommendations */}
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <BsLightbulb className="text-primary fs-5" />
            <h6 className="fw-semibold mb-0">AI Insights & Recommendations</h6>
          </div>
          <a
            href="#"
            className="text-primary text-decoration-none small fw-semibold"
          >
            View All
          </a>
        </div>

        <Row xs={1} md={2} lg={3} className="g-3">
          {insightsData.map((insight) => (
            <Col key={insight.id}>
              <Card className="p-3 shadow-sm border-0 rounded-3 d-flex flex-row align-items-center justify-content-between h-100">
                {/* Left: Icon + Title */}
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div className="fs-5">{insight.icon}</div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <strong>{insight.title}</strong>
                    <Badge
                      bg={insight.levelColor}
                      className="opacity-75 text-uppercase small"
                    >
                      {insight.level}
                    </Badge>
                  </div>
                </div>

                {/* Middle: Description */}
                <div className="text-muted flex-grow-1 mx-3 small">
                  {insight.description}
                </div>

                {/* Right: Action */}
                <a
                  href="#"
                  className="text-primary text-decoration-none fw-semibold small"
                >
                  {insight.action}
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Permissions;