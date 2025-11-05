import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const SettingOwer = () => {
  return (
    <Container className="my-4">
      {/* INTERNAL USERS AND ROLES */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <h5>Internal Users and Roles</h5>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">Email Notifications</Card.Title>
                <Card.Text className="text-muted mb-0">System-wide email settings</Card.Text>
              </div>
              <Button variant="warning">Configure</Button>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">WhatsApp Integration</Card.Title>
                <Card.Text className="text-muted mb-0">Business messaging setup</Card.Text>
              </div>
              <Button variant="warning">Setup</Button>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">QuickBooks Integration</Card.Title>
                <Card.Text className="text-muted mb-0">Accounting system sync</Card.Text>
              </div>
              <Button variant="warning">Setup</Button>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">File Storage</Card.Title>
                <Card.Text className="text-muted mb-0">Documents and photo storage</Card.Text>
              </div>
              <Button variant="warning">Manage</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* SECURITY SETTINGS */}
        <Col md={6} className="mb-3">
          <h5>Security Settings</h5>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">Two-Factor Authentication</Card.Title>
                <Card.Text className="text-muted mb-0">Enhanced security for all users</Card.Text>
              </div>
              <Button variant="primary">Enabled</Button>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">Password Policy</Card.Title>
                <Card.Text className="text-muted mb-0">Minimum Requirements</Card.Text>
              </div>
              <Button variant="warning">Edit</Button>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1">Session Timeout</Card.Title>
                <Card.Text className="text-muted mb-0">Auto-Logout settings</Card.Text>
              </div>
              <span className="fw-bold">4 Hours</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* AI INSIGHTS */}
      <h5 className="mb-3">AI Insights & Recommendations</h5>
      <Row className="mb-2">
        <Col md={4} sm={6} xs={12} className="mb-3">
          <Card border="danger">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>⚠ Quality Risk</span>
                <Badge bg="danger">HIGH</Badge>
              </div>
              <Card.Text>$245k in client deposits expected</Card.Text>
              <Button variant="link" className="p-0">View Details</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} xs={12} className="mb-3">
          <Card border="success">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>💰 Deposits</span>
                <Badge bg="success">MEDIUM</Badge>
              </div>
              <Card.Text>$245k in client deposits expected</Card.Text>
              <Button variant="link" className="p-0">Process</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} xs={12} className="mb-3">
          <Card border="primary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>📄 Documents</span>
                <Badge bg="primary">NEW</Badge>
              </div>
              <Card.Text>3 permit applications require review</Card.Text>
              <Button variant="link" className="p-0">Review</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-end">
        <Button variant="link">View All</Button>
      </div>
    </Container>
  );
};

export default SettingOwer;