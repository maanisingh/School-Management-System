import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaDollarSign, FaExclamationTriangle, FaFileAlt, FaMoneyBillWave, FaChartLine, FaCalculator, FaEye, FaDownload, FaPlus, FaInfoCircle, FaCheck, FaClock, FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa';

const BookKeeperReports = () => {
  return (
    <Container fluid className="px-3 px-md-4" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center py-3 px-3 px-md-4 mb-3"
           style={{
             backgroundColor: '#FFF8E1',
             border: '1px solid #FFE082',
             borderRadius: '8px'
           }}>
        <div className="d-flex align-items-center gap-2">
          <FaCalculator style={{ color: '#FF6F00' }} />
          <span className="fw-bold" style={{ color: '#333' }}>Bookkeeper Dashboard</span>
        </div>
        <FaArrowDown style={{ color: '#757575', cursor: 'pointer' }} />
      </div>

      {/* KPI Cards */}
      <Row className="g-3 g-md-4 mb-4">
        {[
          { icon: <FaDollarSign size={24} color="#4CAF50" />, title: "Outstanding AR", value: "$72,250", bg: "#F1F8E9" },
          { icon: <FaExclamationTriangle size={24} color="#FF5722" />, title: "Overdue Invoices", value: "8", bg: "#FFEBEE" },
          { icon: <FaFileAlt size={24} color="#2196F3" />, title: "Pending Bills", value: "15", bg: "#E3F2FD" },
          { icon: <FaMoneyBillWave size={24} color="#795548" />, title: "Cash on Hand", value: "$158,750", bg: "#FBE9E7" },
          { icon: <FaChartLine size={24} color="#E91E63" />, title: "Monthly Revenue", value: "$420,000", bg: "#FCE4EC", trend: <FaArrowUp size={12} color="#4CAF50" style={{ marginLeft: '4px' }} /> },
          { icon: <FaCalculator size={24} color="#607D8B" />, title: "Monthly Expenses", value: "$185,000", bg: "#ECEFF1", trend: <FaArrowDown size={12} color="#F44336" style={{ marginLeft: '4px' }} /> }
        ].map((item, index) => (
          <Col key={index} xs={6} md={4} lg={2}>
            <Card className="h-100 border-0"
                  style={{
                    backgroundColor: item.bg,
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
              <div className="mb-2">
                {item.icon}
              </div>
              <div className="text-muted small mb-1">{item.title}</div>
              <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{item.value}</div>
              {item.trend && <div className="text-end">{item.trend}</div>}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Financial Reports Section */}
      <Card className="mb-4 border-0 shadow-sm"
            style={{
              borderRadius: '12px',
              border: '1px solid #E0E0E0'
            }}>
        <Card.Header className="bg-white border-bottom py-3 px-3 px-md-4"
                     style={{
                       borderBottom: '1px solid #E0E0E0'
                     }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="mb-0 fw-bold">Financial Reports</h5>
            <Button variant="warning" size="sm" className="mt-2 mt-md-0 rounded-pill px-3 fw-bold d-flex align-items-center gap-2">
              <FaPlus /> Create Invoice
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">
          <Row className="g-3">
            {/* Report 1 */}
            <Col xs={12} lg={6}>
              <Card className="h-100 border" style={{ borderRadius: '12px' }}>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="fw-bold">Profit & Loss Statement</div>
                      <div className="text-muted small">January 2024</div>
                    </div>
                    <Badge bg="success" className="fs-6">Ready</Badge>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div className="text-muted small">Generated: 2024-01-31</div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaEye /> <span className="d-none d-sm-inline">View</span>
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaDownload /> <span className="d-none d-sm-inline">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Report 2 */}
            <Col xs={12} lg={6}>
              <Card className="h-100 border" style={{ borderRadius: '12px' }}>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="fw-bold">Balance Sheet</div>
                      <div className="text-muted small">January 2024</div>
                    </div>
                    <Badge bg="success" className="fs-6">Ready</Badge>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div className="text-muted small">Generated: 2024-01-31</div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaEye /> <span className="d-none d-sm-inline">View</span>
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaDownload /> <span className="d-none d-sm-inline">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Report 3 */}
            <Col xs={12} lg={6}>
              <Card className="h-100 border" style={{ borderRadius: '12px' }}>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="fw-bold">Cash Flow Statement</div>
                      <div className="text-muted small">Q4 2023</div>
                    </div>
                    <Badge bg="success" className="fs-6">Ready</Badge>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div className="text-muted small">Generated: 2024-01-31</div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaEye /> <span className="d-none d-sm-inline">View</span>
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
                        <FaDownload /> <span className="d-none d-sm-inline">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Report 4 */}
            <Col xs={12} lg={6}>
              <Card className="h-100 border" style={{ borderRadius: '12px' }}>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="fw-bold">Profit & Loss Statement</div>
                      <div className="text-muted small">January 2024</div>
                    </div>
                    <Badge bg="primary" className="fs-6">Generating</Badge>
                  </div>
                  <hr className="my-2" />
                  <div className="text-muted small">In Progress</div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* AI Insights & Recommendations */}
      <Card className="border-0 shadow-sm"
            style={{
              borderRadius: '12px',
              border: '1px solid #E0E0E0'
            }}>
        <Card.Header className="bg-white border-bottom py-3 px-3 px-md-4"
                     style={{
                       borderBottom: '1px solid #E0E0E0'
                     }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="mb-0 fw-bold">AI Insights & Recommendations</h5>
            <Button variant="link" className="p-0 text-primary text-decoration-none">View All</Button>
          </div>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">
          <Row className="g-3">
            {/* Insight 1 */}
            <Col xs={12}>
              <div className="border rounded p-3">
                <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaExclamationTriangle color="#FF5722" />
                    <span className="fw-bold text-danger">Quality Risk</span>
                    <Badge bg="danger" className="fs-6">HIGH</Badge>
                  </div>
                  <div className="flex-grow-1 text-muted small">
                    Weather conditions may impact concrete
                  </div>
                  <Button variant="link" className="p-0 text-primary text-decoration-none">View Details</Button>
                </div>
              </div>
            </Col>

            {/* Insight 2 */}
            <Col xs={12}>
              <div className="border rounded p-3">
                <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaMoneyBillWave color="#4CAF50" />
                    <span className="fw-bold text-success">Deposits</span>
                    <Badge bg="success" className="fs-6">MEDIUM</Badge>
                  </div>
                  <div className="flex-grow-1 text-muted small">
                    $245k in client deposits expected
                  </div>
                  <Button variant="link" className="p-0 text-primary text-decoration-none">Process</Button>
                </div>
              </div>
            </Col>

            {/* Insight 3 */}
            <Col xs={12}>
              <div className="border rounded p-3">
                <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaFileAlt color="#2196F3" />
                    <span className="fw-bold text-primary">Documents</span>
                    <Badge bg="info" className="fs-6">NEW</Badge>
                  </div>
                  <div className="flex-grow-1 text-muted small">
                    3 permit applications require
                  </div>
                  <Button variant="link" className="p-0 text-primary text-decoration-none">Review</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookKeeperReports;