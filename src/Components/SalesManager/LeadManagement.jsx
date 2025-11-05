import React from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Table, Navbar, Nav, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaUser, FaChartLine, FaDollarSign, FaCheck, FaRocket, FaFileAlt, FaPhone, FaEnvelope, FaSms, FaEye, FaEdit, FaSearch, FaDownload, FaPlus, FaChevronDown } from 'react-icons/fa';

const LeadManagement = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <Navbar bg="light" expand="lg" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #dee2e6' }}>
        <Container fluid>
          <Navbar.Brand href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              borderRadius: '6px', 
              backgroundColor: '#7C4DFF', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              color: 'white',
              fontSize: '16px'
            }}>
              i
            </div>
            <span style={{ fontWeight: '500', fontSize: '14px' }}>Sales Management</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" style={{ border: '1px solid #dee2e6', borderRadius: '4px' }}>
                  <FaChevronDown style={{ fontSize: '12px' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#action1">Action</Dropdown.Item>
                  <Dropdown.Item href="#action2">Another action</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#action3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Stats */}
      <Container fluid style={{ padding: '1rem' }}>
        <Row className="g-3">
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#E3F2FD', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto 0.5rem',
                color: '#1976D2'
              }}>
                <FaUser />
              </div>
              <h6 style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Total Leads</h6>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.25rem' }}>156</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#28a745', fontSize: '12px' }}>+11.01%</span>
                <FaChartLine style={{ color: '#28a745', fontSize: '10px' }} />
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#F3E5F5', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto 0.5rem',
                color: '#9C27B0'
              }}>
                <FaFileAlt />
              </div>
              <h6 style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Active Proposals</h6>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.25rem' }}>23</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#28a745', fontSize: '12px' }}>+11.01%</span>
                <FaChartLine style={{ color: '#28a745', fontSize: '10px' }} />
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#E8F5E9', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto 0.5rem',
                color: '#4CAF50'
              }}>
                <FaRocket />
              </div>
              <h6 style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Conversion Rate</h6>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.25rem' }}>68%</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#28a745', fontSize: '12px' }}>+11.01%</span>
                <FaChartLine style={{ color: '#28a745', fontSize: '10px' }} />
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#FFF3E0', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto 0.5rem',
                color: '#FF9800'
              }}>
                <FaDollarSign />
              </div>
              <h6 style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Average Deal Size</h6>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.25rem' }}>$485K</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#28a745', fontSize: '12px' }}>+11.01%</span>
                <FaChartLine style={{ color: '#28a745', fontSize: '10px' }} />
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#ECEFF1', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto 0.5rem',
                color: '#607D8B'
              }}>
                <FaCheck />
              </div>
              <h6 style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Closed Deals</h6>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.25rem' }}>12</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#28a745', fontSize: '12px' }}>+11.01%</span>
                <FaChartLine style={{ color: '#28a745', fontSize: '10px' }} />
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#FFEBEE', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto 0.5rem',
                color: '#F44336'
              }}>
                <FaChartLine />
              </div>
              <h6 style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Revenue</h6>
              <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.25rem' }}>$850K</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#28a745', fontSize: '12px' }}>+11.01%</span>
                <FaChartLine style={{ color: '#28a745', fontSize: '10px' }} />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Lead Management Section */}
      <Container fluid style={{ padding: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <h5 style={{ fontWeight: '600', marginBottom: '0' }}>Lead Management</h5>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Form.Control 
              type="text" 
              placeholder="Search" 
              style={{ 
                width: '200px', 
                borderRadius: '4px', 
                border: '1px solid #dee2e6',
                padding: '0.5rem 0.75rem'
              }}
            />
            <Button 
              variant="warning" 
              style={{ 
                backgroundColor: '#FFC107', 
                borderColor: '#FFC107', 
                color: 'black',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
            >
              <FaPlus style={{ marginRight: '0.5rem' }} /> Add Lead
            </Button>
            <Button 
              variant="outline-secondary" 
              style={{ 
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaDownload /> Export
            </Button>
          </div>
        </div>

        {/* Lead Cards */}
        <Row className="g-3">
          <Col xs={12}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: '#9C27B0', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  R
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Robert & Maria Chen</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>robert.chen@mail.com | (604) 55-0123</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Badge bg="warning" style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    Hot Lead
                  </Badge>
                  <Badge bg="light" style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    color: '#673AB7',
                    border: '1px solid #673AB7'
                  }}>
                    Proposal
                  </Badge>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Estimated Value</div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>$675,000</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Source</div>
                  <div style={{ fontSize: '14px' }}>Website</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Assigned</div>
                  <div style={{ fontSize: '14px' }}>Sarah Johnson</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Next Action</div>
                  <div style={{ fontSize: '14px' }}>Site Visit Scheduled</div>
                </div>
              </div>

              <div style={{ 
                backgroundColor: '#FFF3E0', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '0.25rem' }}>
                  Next Action: Site Visit Scheduled
                </div>
                <div style={{ fontSize: '14px' }}>
                  Notes: Looking for custom waterfront home. Budget confirmed.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline-secondary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '12px'
                  }}>
                    <FaPhone /> Call
                  </Button>
                  <Button variant="outline-primary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '12px'
                  }}>
                    <FaEnvelope /> Email
                  </Button>
                  <Button variant="outline-dark" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '12px'
                  }}>
                    <FaSms /> SMS
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline-secondary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <FaEye />
                  </Button>
                  <Button variant="outline-secondary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <FaEdit />
                  </Button>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={12}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: '#9C27B0', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  R
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Robert & Maria Chen</div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>robert.chen@mail.com | (604) 55-0123</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Badge bg="warning" style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    Hot Lead
                  </Badge>
                  <Badge bg="light" style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    color: '#673AB7',
                    border: '1px solid #673AB7'
                  }}>
                    Proposal
                  </Badge>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Estimated Value</div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>$675,000</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Source</div>
                  <div style={{ fontSize: '14px' }}>Website</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Assigned</div>
                  <div style={{ fontSize: '14px' }}>Sarah Johnson</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '0.25rem' }}>Next Action</div>
                  <div style={{ fontSize: '14px' }}>Site Visit Scheduled</div>
                </div>
              </div>

              <div style={{ 
                backgroundColor: '#FFF3E0', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '0.25rem' }}>
                  Next Action: Site Visit Scheduled
                </div>
                <div style={{ fontSize: '14px' }}>
                  Notes: Looking for custom waterfront home. Budget confirmed.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline-secondary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '12px'
                  }}>
                    <FaPhone /> Call
                  </Button>
                  <Button variant="outline-primary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '12px'
                  }}>
                    <FaEnvelope /> Email
                  </Button>
                  <Button variant="outline-dark" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '12px'
                  }}>
                    <FaSms /> SMS
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline-secondary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <FaEye />
                  </Button>
                  <Button variant="outline-secondary" size="sm" style={{ 
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <FaEdit />
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* AI Insights & Recommendations */}
      <Container fluid style={{ padding: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem'
        }}>
          <h5 style={{ fontWeight: '600', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaChartLine style={{ color: '#1976D2' }} />
            AI Insights & Recommendations
          </h5>
          <Button variant="link" style={{ 
            color: '#6c757d', 
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            View All
          </Button>
        </div>

        <Row className="g-3">
          <Col xs={12} md={6} lg={4}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              borderLeft: '4px solid #dc3545'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: '#dc3545',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}></div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#dc3545' }}>Quality Risk</div>
                <Badge bg="danger" style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  padding: '0.15rem 0.3rem',
                  borderRadius: '4px'
                }}>
                  HIGH
                </Badge>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '0.5rem' }}>
                Weather conditions may impact concrete
              </div>
              <Button variant="link" style={{ 
                color: '#1976D2', 
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '12px',
                padding: '0',
                marginTop: '0.25rem'
              }}>
                View Details
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              borderLeft: '4px solid #4caf50'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: '#4caf50',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}></div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#4caf50' }}>Deposits</div>
                <Badge bg="success" style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  padding: '0.15rem 0.3rem',
                  borderRadius: '4px'
                }}>
                  MEDIUM
                </Badge>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '0.5rem' }}>
                $245k in client deposits expected
              </div>
              <Button variant="link" style={{ 
                color: '#1976D2', 
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '12px',
                padding: '0',
                marginTop: '0.25rem'
              }}>
                Process
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              padding: '1rem',
              borderLeft: '4px solid #9c27b0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: '#9c27b0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}></div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#9c27b0' }}>Documents</div>
                <Badge bg="secondary" style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  padding: '0.15rem 0.3rem',
                  borderRadius: '4px'
                }}>
                  NEW
                </Badge>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '0.5rem' }}>
                Contract signatures require review
              </div>
              <Button variant="link" style={{ 
                color: '#1976D2', 
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '12px',
                padding: '0',
                marginTop: '0.25rem'
              }}>
                Review
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LeadManagement;