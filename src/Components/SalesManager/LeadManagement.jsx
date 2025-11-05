import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaSms, FaDownload, FaChartLine, FaUsers, FaFileAlt, FaDollarSign, FaCheckCircle, FaArrowUp, FaSearch, FaFilter, FaEllipsisV, FaStar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Table, Badge, Form, InputGroup } from 'react-bootstrap';

const LeadManagement = () => {
  // Data for the stats cards
  const stats = [
    { title: 'Total Leads', value: '156', change: '+11.01%', icon: <FaUsers />, bgColor: '#4e73df' },
    { title: 'Active Proposals', value: '23', change: '+11.01%', icon: <FaFileAlt />, bgColor: '#1cc88a' },
    { title: 'Conversion Rate', value: '68%', change: '+11.01%', icon: <FaChartLine />, bgColor: '#36b9cc' },
    { title: 'Average Deal Size', value: '$485K', change: '+11.01%', icon: <FaDollarSign />, bgColor: '#f6c23e' },
    { title: 'Closed Deals', value: '12', change: '+11.01%', icon: <FaCheckCircle />, bgColor: '#e74a3b' },
    { title: 'Revenue', value: '$850K', change: '+11.01%', icon: <FaDollarSign />, bgColor: '#858796' }
  ];

  // Data for the AI Insights
  const aiInsights = [
    "Robert & Maria Chen have shown high interest in waterfront properties. Consider showing them premium listings with water views.",
    "Their budget is confirmed at $675,000. Focus on properties within 5% of this range.",
    "Schedule the site visit within the next 3 days to maintain momentum.",
    "Prepare a custom proposal highlighting waterfront features and customization options."
  ];

  return (
    <div style={{ 
      backgroundColor: '#f8f9fc', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#5a5c69',
      minHeight: '100vh',
      padding: '0'
    }}>
      <Container fluid className="p-0">
        {/* Header Section */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '1.5rem', 
          borderBottom: '1px solid #e3e6f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            color: '#5a5c69',
            margin: '0'
          }}>
            Sales Management
          </h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputGroup style={{ width: '250px', marginRight: '1rem' }}>
              <InputGroup.Text style={{ backgroundColor: '#f8f9fc', border: '1px solid #d1d3e2', color: '#858796' }}>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control 
                placeholder="Search..." 
                style={{ borderLeft: 'none', backgroundColor: '#f8f9fc', borderColor: '#d1d3e2', color: '#5a5c69' }}
              />
            </InputGroup>
            <Button variant="outline-secondary" style={{ borderColor: '#d1d3e2', color: '#858796', backgroundColor: '#f8f9fc', marginRight: '0.5rem' }}>
              <FaFilter style={{ marginRight: '0.25rem' }} /> Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ padding: '1.5rem' }}>
          <Row>
            {stats.map((stat, index) => (
              <Col key={index} xs={12} sm={6} md={6} lg={2} className="mb-4">
                <Card style={{ 
                  border: 'none', 
                  borderRadius: '0.35rem', 
                  boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
                  borderLeft: `0.25rem solid ${stat.bgColor}`
                }}>
                  <Card.Body className="p-3">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '400' }}>
                          {stat.title}
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#5a5c69' }}>
                          {stat.value}
                        </div>
                      </div>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        color: stat.bgColor,
                        opacity: 0.8
                      }}>
                        {stat.icon}
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      color: '#1cc88a',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginTop: '0.5rem'
                    }}>
                      <FaArrowUp style={{ marginRight: '0.2rem' }} />
                      {stat.change}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Main Content Area */}
        <Row noGutters style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
          {/* Left Column - Lead Management Table */}
          <Col lg={8} className="pr-lg-3">
            <Card style={{ 
              border: 'none', 
              borderRadius: '0.35rem', 
              boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)'
            }}>
              <Card.Header style={{ 
                backgroundColor: '#f8f9fc', 
                borderBottom: '1px solid #e3e6f0',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#5a5c69' }}>
                  Lead Management
                </h5>
                <Button variant="outline-secondary" size="sm" style={{ borderColor: '#d1d3e2', color: '#858796', backgroundColor: '#f8f9fc' }}>
                  <FaDownload style={{ marginRight: '0.25rem' }} /> Export
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0" style={{ color: '#5a5c69' }}>
                    <thead style={{ backgroundColor: '#f8f9fc' }}>
                      <tr>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Name</th>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Contact</th>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Value</th>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Source</th>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Assigned</th>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Next Action</th>
                        <th style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#858796', borderTop: 'none' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Lead Row 1 */}
                      <tr>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: '600', color: '#5a5c69' }}>Robert & Maria Chen</div>
                          <div style={{ fontSize: '0.85rem', color: '#858796' }}>Looking for custom waterfront home. Budget confirmed.</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ fontSize: '0.9rem' }}>robert.maria@example.com</div>
                          <div style={{ fontSize: '0.9rem', color: '#858796' }}>(555) 123-4567</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle', fontWeight: '600' }}>
                          $675,000
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          Website
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          Sarah Johnson
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <Badge bg="primary" style={{ fontSize: '0.7rem', backgroundColor: '#4e73df' }}>
                            Site Visit Scheduled
                          </Badge>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex' }}>
                            <Button variant="light" size="sm" style={{ marginRight: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fc', borderColor: '#e3e6f0' }}>
                              <FaPhone style={{ color: '#4e73df', fontSize: '0.8rem' }} />
                            </Button>
                            <Button variant="light" size="sm" style={{ marginRight: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fc', borderColor: '#e3e6f0' }}>
                              <FaEnvelope style={{ color: '#4e73df', fontSize: '0.8rem' }} />
                            </Button>
                            <Button variant="light" size="sm" style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fc', borderColor: '#e3e6f0' }}>
                              <FaSms style={{ color: '#4e73df', fontSize: '0.8rem' }} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {/* Lead Row 2 */}
                      <tr>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: '600', color: '#5a5c69' }}>Robert & Maria Chen</div>
                          <div style={{ fontSize: '0.85rem', color: '#858796' }}>Looking for custom waterfront home. Budget confirmed.</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ fontSize: '0.9rem' }}>robert.maria@example.com</div>
                          <div style={{ fontSize: '0.9rem', color: '#858796' }}>(555) 123-4567</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle', fontWeight: '600' }}>
                          $675,000
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          Website
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          Sarah Johnson
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <Badge bg="primary" style={{ fontSize: '0.7rem', backgroundColor: '#4e73df' }}>
                            Site Visit Scheduled
                          </Badge>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex' }}>
                            <Button variant="light" size="sm" style={{ marginRight: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fc', borderColor: '#e3e6f0' }}>
                              <FaPhone style={{ color: '#4e73df', fontSize: '0.8rem' }} />
                            </Button>
                            <Button variant="light" size="sm" style={{ marginRight: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fc', borderColor: '#e3e6f0' }}>
                              <FaEnvelope style={{ color: '#4e73df', fontSize: '0.8rem' }} />
                            </Button>
                            <Button variant="light" size="sm" style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f8f9fc', borderColor: '#e3e6f0' }}>
                              <FaSms style={{ color: '#4e73df', fontSize: '0.8rem' }} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Customer Details & AI Insights */}
          <Col lg={4}>
            {/* Customer Details Card */}
            <Card style={{ 
              border: 'none', 
              borderRadius: '0.35rem', 
              boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
              marginBottom: '1.5rem'
            }}>
              <Card.Body className="p-4">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#5a5c69' }}>
                    Robert & Maria Chen
                  </h5>
                  <div>
                    <FaStar style={{ color: '#f6c23e' }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>Email</div>
                  <div style={{ fontSize: '0.9rem', color: '#5a5c69' }}>robert.maria@example.com</div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>Phone</div>
                  <div style={{ fontSize: '0.9rem', color: '#5a5c69' }}>(555) 123-4567</div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>Estimated Value</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#5a5c69' }}>$675,000</div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>Source</div>
                  <div style={{ fontSize: '0.9rem', color: '#5a5c69' }}>Website</div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>Assigned To</div>
                  <div style={{ fontSize: '0.9rem', color: '#5a5c69' }}>Sarah Johnson</div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.5rem' }}>Next Action</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaCalendarAlt style={{ color: '#4e73df', marginRight: '0.5rem' }} />
                    <Badge bg="primary" style={{ fontSize: '0.75rem', backgroundColor: '#4e73df' }}>
                      Site Visit Scheduled
                    </Badge>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#858796', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.5rem' }}>Notes</div>
                  <div style={{ fontSize: '0.9rem', color: '#5a5c69', fontStyle: 'italic', backgroundColor: '#f8f9fc', padding: '0.75rem', borderRadius: '0.25rem', borderLeft: '3px solid #4e73df' }}>
                    "Looking for custom waterfront home. Budget confirmed."
                  </div>
                </div>
                
                <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
                  <Badge bg="danger" style={{ fontSize: '0.7rem', marginRight: '0.5rem', backgroundColor: '#e74a3b' }}>
                    Hot Lead
                  </Badge>
                  <Badge bg="info" style={{ fontSize: '0.7rem', backgroundColor: '#36b9cc' }}>
                    Proposal
                  </Badge>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="primary" style={{ flex: 1, marginRight: '0.5rem', backgroundColor: '#4e73df', border: 'none', fontWeight: '600' }}>
                    <FaPhone style={{ marginRight: '0.25rem' }} /> Call
                  </Button>
                  <Button variant="info" style={{ flex: 1, marginLeft: '0.5rem', backgroundColor: '#36b9cc', border: 'none', fontWeight: '600' }}>
                    <FaEnvelope style={{ marginRight: '0.25rem' }} /> Email
                  </Button>
                  <Button variant="success" style={{ flex: 1, marginLeft: '0.5rem', backgroundColor: '#1cc88a', border: 'none', fontWeight: '600' }}>
                    <FaSms style={{ marginRight: '0.25rem' }} /> SMS
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* AI Insights Card */}
            <Card style={{ 
              border: 'none', 
              borderRadius: '0.35rem', 
              boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)'
            }}>
              <Card.Header style={{ 
                backgroundColor: '#f8f9fc', 
                borderBottom: '1px solid #e3e6f0',
                padding: '1rem 1.25rem'
              }}>
                <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#5a5c69' }}>
                  AI Insights & Recommendations
                </h5>
              </Card.Header>
              <Card.Body style={{ padding: '1.25rem' }}>
                <ul style={{ paddingLeft: '1.25rem', marginBottom: '0', color: '#5a5c69' }}>
                  {aiInsights.map((insight, index) => (
                    <li key={index} style={{ marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {insight}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LeadManagement;