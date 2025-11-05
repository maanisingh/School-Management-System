import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaDollarSign, FaExclamationTriangle, FaFileInvoiceDollar, FaMoneyBillWave, FaChartLine, FaWallet, FaSync, FaEye, FaInfoCircle } from 'react-icons/fa';

const Banking = () => {
  return (
    <Container fluid className="px-3 px-md-4" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 mb-4 rounded"
           style={{
             backgroundColor: '#FFF8E1',
             border: '1px solid #FFE082'
           }}>
        <div className="d-flex align-items-center mb-3 mb-sm-0">
          <span style={{ color: '#FF6F00', fontSize: '1.5rem' }}>💰</span>
          <span className="ms-2 fw-bold" style={{ color: '#333' }}>Bookkeeper Dashboard</span>
        </div>
        <div>
          <select className="form-select form-select-sm" style={{
            maxWidth: '150px',
            fontSize: '14px'
          }}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <Row className="g-3 g-lg-4 mb-4">
        {[
          { icon: <FaDollarSign size={24} color="#4CAF50" />, title: "Outstanding AR", value: "$72,250", bg: "#F5F5F5" },
          { icon: <FaExclamationTriangle size={24} color="#FF9800" />, title: "Overdue Invoices", value: "8", bg: "#F5F5F5" },
          { icon: <FaFileInvoiceDollar size={24} color="#2196F3" />, title: "Pending Bills", value: "15", bg: "#F5F5F5" },
          { icon: <FaMoneyBillWave size={24} color="#9C27B0" />, title: "Cash on Hand", value: "$158,750", bg: "#F5F5F5" },
          { icon: <FaChartLine size={24} color="#E91E63" />, title: "Monthly Revenue", value: "$420,000", bg: "#F5F5F5", trend: "up" },
          { icon: <FaWallet size={24} color="#607D8B" />, title: "Monthly Expenses", value: "$185,000", bg: "#F5F5F5", trend: "down" }
        ].map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <Card className="h-100" style={{
              backgroundColor: item.bg,
              border: 'none',
              borderRadius: '8px',
            }}>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center">
                  {item.icon}
                </div>
                <div className="mt-3">
                  <div className="text-muted small fw-medium">{item.title}</div>
                  <div className="fw-bold" style={{ fontSize: '1.25rem' }}>{item.value}</div>
                  {item.trend && (
                    <div className={`small ${item.trend === 'up' ? 'text-success' : 'text-danger'} d-flex align-items-center`}>
                      {item.trend === 'up' ? '↑' : '↓'}
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bank Accounts & Reconciliation Section */}
      <Card className="mb-4" style={{
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Card.Header className="bg-white border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center py-3">
          <h5 className="mb-3 mb-sm-0 fw-bold">Bank Accounts & Reconciliation</h5>
          <Button variant="warning" size="sm" className="d-flex align-items-center rounded-pill">
            <FaSync className="me-2" /> Sync All Accounts
          </Button>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">
          {/* Operating Account */}
          <div className="border rounded p-3 mb-3 bg-white">
            <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
              <div>
                <div className="fw-bold">Operating Account</div>
                <div className="text-muted small">TD Business Banking</div>
                <div className="text-muted small">Last sync: 2024-01-31 09:30 AM</div>
              </div>
              <div className="text-sm-end mt-2 mt-sm-0">
                <div className="fw-bold" style={{ fontSize: '1.25rem' }}>$15000</div>
                <Badge bg="success" className="mt-1">Reconciled</Badge>
              </div>
            </div>
            <hr className="my-2" />
            <div className="d-flex flex-wrap gap-2">
              <Button variant="outline-dark" size="sm" className="d-flex align-items-center rounded-pill">
                <FaEye className="me-1" /> View Transaction
              </Button>
              <Button variant="outline-dark" size="sm" className="d-flex align-items-center rounded-pill">
                <FaSync className="me-1" /> Sync
              </Button>
            </div>
          </div>

          {/* Payroll Account */}
          <div className="border rounded p-3 mb-3 bg-white">
            <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
              <div>
                <div className="fw-bold">Payroll Account</div>
                <div className="text-muted small">TD Business Banking</div>
                <div className="text-muted small">Last sync: 2024-01-31 09:30 AM</div>
              </div>
              <div className="text-sm-end mt-2 mt-sm-0">
                <div className="fw-bold" style={{ fontSize: '1.25rem' }}>$45,000</div>
                <Badge bg="warning" className="mt-1">Needs Reconciliation</Badge>
              </div>
            </div>
            <hr className="my-2" />
            <div className="d-flex flex-wrap gap-2">
              <Button variant="outline-dark" size="sm" className="d-flex align-items-center rounded-pill">
                <FaEye className="me-1" /> View Transaction
              </Button>
              <Button variant="outline-dark" size="sm" className="d-flex align-items-center rounded-pill">
                <FaSync className="me-1" /> Sync
              </Button>
            </div>
          </div>

          {/* Project Materials Account */}
          <div className="border rounded p-3 bg-white">
            <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
              <div>
                <div className="fw-bold">Project Materials</div>
                <div className="text-muted small">RBC Business</div>
                <div className="text-muted small">Last sync: 2024-01-30 05:00 PM</div>
              </div>
              <div className="text-sm-end mt-2 mt-sm-0">
                <div className="fw-bold" style={{ fontSize: '1.25rem' }}>$15000</div>
                <Badge bg="success" className="mt-1">Reconciled</Badge>
              </div>
            </div>
            <hr className="my-2" />
            <div className="d-flex flex-wrap gap-2">
              <Button variant="outline-dark" size="sm" className="d-flex align-items-center rounded-pill">
                <FaEye className="me-1" /> View Transaction
              </Button>
              <Button variant="outline-dark" size="sm" className="d-flex align-items-center rounded-pill">
                <FaSync className="me-1" /> Sync
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* AI Insights & Recommendations */}
      <Card style={{
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Card.Header className="bg-white border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center py-3">
          <h5 className="mb-3 mb-sm-0 fw-bold d-flex align-items-center">
            <FaInfoCircle className="me-2 text-primary" /> AI Insights & Recommendations
          </h5>
          <Button variant="link" className="p-0 text-primary text-decoration-none">View All</Button>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row gap-3">
            {/* Quality Risk Alert */}
            <Alert variant="danger" className="d-flex align-items-center p-3 rounded">
              <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
                <div className="d-flex align-items-center gap-1">
                  <FaExclamationTriangle size={16} color="#fff" />
                  <span className="small fw-bold">Quality Risk</span>
                  <span className="badge bg-danger">HIGH</span>
                </div>
                <div className="small">
                  Weather conditions may impact concrete
                  <Button variant="link" className="p-0 small text-primary text-decoration-none ms-2">View Details</Button>
                </div>
              </div>
            </Alert>

            {/* Deposits Alert */}
            <Alert variant="success" className="d-flex align-items-center p-3 rounded">
              <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
                <div className="d-flex align-items-center gap-1">
                  <FaDollarSign size={16} color="#fff" />
                  <span className="small fw-bold">Deposits</span>
                  <span className="badge bg-success">MEDIUM</span>
                </div>
                <div className="small">
                  $245k in client deposits expected
                  <Button variant="link" className="p-0 small text-primary text-decoration-none ms-2">Process</Button>
                </div>
              </div>
            </Alert>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Banking;