import React from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ProgressBar } from 'react-bootstrap';
import { FaBuilding, FaFileAlt, FaRocket, FaDollarSign, FaCheck, FaChartLine, FaSearch, FaPlus, FaEye, FaEdit, FaPaperPlane, FaClock, FaInfoCircle } from 'react-icons/fa';

const Proposals = () => {
  return (
    <Container fluid style={{ padding: '20px', backgroundColor: '#f8f9fa', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#fff',
        padding: '15px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#8e44ad',
            width: '30px',
            height: '30px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px'
          }}>
            <FaBuilding />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>Sales Management</span>
        </div>
        <div style={{
          width: '20px',
          height: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '12px', color: '#666' }}>&#9660;</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <Row className="g-3 mb-4">
        {[
          { icon: <FaBuilding />, title: 'Total Leads', value: '156', change: '+11.01%', color: '#bdc3c7' },
          { icon: <FaFileAlt />, title: 'Active Proposals', value: '23', change: '+11.01%', color: '#9b59b6' },
          { icon: <FaRocket />, title: 'Conversion Rate', value: '68%', change: '+11.01%', color: '#2ecc71' },
          { icon: <FaDollarSign />, title: 'Average Deal Size', value: '$485K', change: '+11.01%', color: '#f1c40f' },
          { icon: <FaCheck />, title: 'Closed Deals', value: '12', change: '+11.01%', color: '#3498db' },
          { icon: <FaChartLine />, title: 'Revenue', value: '$850K', change: '+11.01%', color: '#e74c3c' }
        ].map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <Card style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  backgroundColor: item.color,
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>{item.title}</div>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#333' }}>{item.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#27ae60' }}>
                {item.change}
                <span style={{ fontSize: '14px' }}>&#8593;</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Active Proposals Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h5 style={{ margin: '0', fontWeight: '600', color: '#333' }}>Active Proposals</h5>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Form.Control
              type="text"
              placeholder="Search"
              style={{
                width: '150px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            <Button
              variant="warning"
              style={{
                backgroundColor: '#f39c12',
                borderColor: '#f39c12',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <FaPlus /> Create Proposal
            </Button>
          </div>
        </div>

        {/* Proposal Card 1 */}
        <Card style={{
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #eee',
          overflow: 'hidden'
        }}>
          <Card.Body style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div>
                <h6 style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#333' }}>Parker Development</h6>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Multi-unit Complex</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Badge bg="warning" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px'
                }}>
                  Under Review
                </Badge>
                <Badge bg="light" text="dark" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #9b59b6',
                  color: '#9b59b6'
                }}>
                  85% Win
                </Badge>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Value</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>$1,675,000</div>
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Submitted</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>9/5/2025</div>
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Response Expected</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>9/15/2025</div>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Win Probability</div>
              <ProgressBar
                now={85}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: '#ecf0f1'
                }}
                variant="warning"
              >
                <div style={{
                  position: 'absolute',
                  right: '0',
                  top: '-20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  85%
                </div>
              </ProgressBar>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666' }}>
                <FaClock /> 590 days remaining
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="outline-secondary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaEye /> View
                </Button>
                <Button variant="outline-secondary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaEdit /> Edit
                </Button>
                <Button variant="outline-primary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#9b59b6',
                  borderColor: '#9b59b6'
                }}>
                  <FaPaperPlane /> Follow Up
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Proposal Card 2 */}
        <Card style={{
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #eee',
          overflow: 'hidden'
        }}>
          <Card.Body style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div>
                <h6 style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#333' }}>Parker Development</h6>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Multi-unit Complex</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Badge bg="primary" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px'
                }}>
                  Negotiating
                </Badge>
                <Badge bg="light" text="dark" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #9b59b6',
                  color: '#9b59b6'
                }}>
                  70% Win
                </Badge>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Value</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>$1,675,000</div>
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Submitted</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>9/5/2025</div>
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Response Expected</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>9/15/2025</div>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Win Probability</div>
              <ProgressBar
                now={70}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: '#ecf0f1'
                }}
                variant="warning"
              >
                <div style={{
                  position: 'absolute',
                  right: '0',
                  top: '-20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  70%
                </div>
              </ProgressBar>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666' }}>
                <FaClock /> 590 days remaining
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="outline-secondary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaEye /> View
                </Button>
                <Button variant="outline-secondary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaEdit /> Edit
                </Button>
                <Button variant="outline-primary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#9b59b6',
                  borderColor: '#9b59b6'
                }}>
                  <FaPaperPlane /> Follow Up
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Proposal Card 3 */}
        <Card style={{
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #eee',
          overflow: 'hidden'
        }}>
          <Card.Body style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div>
                <h6 style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#333' }}>Parker Development</h6>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Multi-unit Complex</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Badge bg="dark" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px'
                }}>
                  Pending Approval
                </Badge>
                <Badge bg="light" text="dark" style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #9b59b6',
                  color: '#9b59b6'
                }}>
                  60% Win
                </Badge>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Value</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>$1,675,000</div>
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Submitted</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>9/5/2025</div>
              </div>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Response Expected</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>9/15/2025</div>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Win Probability</div>
              <ProgressBar
                now={60}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: '#ecf0f1'
                }}
                variant="warning"
              >
                <div style={{
                  position: 'absolute',
                  right: '0',
                  top: '-20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  60%
                </div>
              </ProgressBar>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#666' }}>
                <FaClock /> 590 days remaining
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="outline-secondary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaEye /> View
                </Button>
                <Button variant="outline-secondary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaEdit /> Edit
                </Button>
                <Button variant="outline-primary" size="sm" style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#9b59b6',
                  borderColor: '#9b59b6'
                }}>
                  <FaPaperPlane /> Follow Up
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* AI Insights & Recommendations Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h5 style={{ margin: '0', fontWeight: '600', color: '#333' }}>
            <FaInfoCircle style={{ marginRight: '8px', color: '#9b59b6' }} />
            AI Insights & Recommendations
          </h5>
          <Button variant="link" style={{
            fontSize: '14px',
            color: '#9b59b6',
            padding: '0',
            textDecoration: 'none'
          }}>
            View All
          </Button>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{
            backgroundColor: '#fdf2f8',
            border: '1px solid #fccfe8',
            borderRadius: '8px',
            padding: '12px',
            flex: '1',
            minWidth: '200px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#d6336c' }}>Quality Risk</span>
              <Badge bg="danger" style={{
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '12px'
              }}>
                HIGH
              </Badge>
            </div>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
              Weather conditions may impact concrete
            </p>
            <Button variant="link" style={{
              fontSize: '12px',
              color: '#9b59b6',
              padding: '0',
              textDecoration: 'none'
            }}>
              View Details
            </Button>
          </div>

          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '12px',
            flex: '1',
            minWidth: '200px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a' }}>Deposits</span>
              <Badge bg="success" style={{
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '12px'
              }}>
                MEDIUM
              </Badge>
            </div>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
              $245k in client deposits expected
            </p>
            <Button variant="link" style={{
              fontSize: '12px',
              color: '#9b59b6',
              padding: '0',
              textDecoration: 'none'
            }}>
              Process
            </Button>
          </div>

          <div style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px',
            flex: '1',
            minWidth: '200px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Documents</span>
              <Badge bg="info" style={{
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '12px'
              }}>
                NEW
              </Badge>
            </div>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
              3 permit applications require review
            </p>
            <Button variant="link" style={{
              fontSize: '12px',
              color: '#9b59b6',
              padding: '0',
              textDecoration: 'none'
            }}>
              Review
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Proposals;