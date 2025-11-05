import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaCalendarAlt, FaCheck, FaExclamationTriangle, FaChartBar, FaUser, FaTasks, FaDollarSign, FaPercentage, FaHandshake, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, ProgressBar, Table, Badge, Alert } from 'react-bootstrap';

const Overview = () => {
  // State for the dashboard data
  const [stats] = useState({
    totalLeads: { value: 156, change: 11.01 },
    activeProposals: { value: 23, change: 11.01 },
    conversionRate: { value: 68, change: 0 },
    averageDealSize: { value: 485, change: 11.01 },
    closedDeals: { value: 12, change: 11.01 },
    revenue: { value: 850, change: -11.01 }
  });

  const [pipelineData] = useState([
    { stage: 'Initial Contact', leads: 45 },
    { stage: 'Qualification', leads: 32 },
    { stage: 'Proposal', leads: 23 },
    { stage: 'Negotiation', leads: 12 },
    { stage: 'Closed Won', leads: 8 }
  ]);

  const [hotLeads] = useState([
    {
      name: 'Robert & Maria Chen',
      email: 'robert.chen@mail.com',
      phone: '[604] 55-0123',
      value: 675000,
      source: 'Website',
      assigned: 'Sarah Johnson',
      nextAction: 'Site Visit Scheduled',
      lastContact: '25/08/2025',
      status: ['Hot Lead', 'Proposal']
    }
  ]);

  const [recentActivities] = useState([
    { id: 1, description: 'Meeting with potential client', time: '2 hours ago' },
    { id: 2, description: 'Updated proposal for Johnson project', time: '5 hours ago' },
    { id: 3, description: 'Site visit completed', time: '1 day ago' }
  ]);

  const [todoList] = useState([
    { id: 1, task: 'Foundation Inspection', priority: 'Normal' },
    { id: 2, task: 'Material Delivery', priority: 'HIGH' }
  ]);

  const [aiInsights] = useState([
    { id: 1, category: 'Quality Risk', status: 'Medium', description: 'Check building materials quality' },
    { id: 2, category: 'Deposit', status: 'Pending', description: 'Awaiting initial deposit' },
    { id: 3, category: 'Documentation', status: 'Complete', description: 'All documents verified' }
  ]);

  // Function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Function to render change indicator
  const renderChange = (change) => {
    if (change === 0) return null;
    
    const isPositive = change > 0;
    return (
      <span style={{ color: isPositive ? '#28a745' : '#dc3545', fontSize: '0.85rem' }}>
        {isPositive ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(change)}%
      </span>
    );
  };

  return (
    <Container fluid style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', fontWeight: 'bold' }}>Sales Management</h1>
      
      {/* Stats Cards */}
      <Row style={{ marginBottom: '30px' }}>
        {Object.entries(stats).map(([key, stat]) => (
          <Col key={key} xs={12} sm={6} md={4} lg={2} style={{ marginBottom: '20px' }}>
            <Card style={{ 
              height: '100%', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: 'none'
            }}>
              <Card.Body style={{ padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Card.Title style={{ 
                      fontSize: '0.9rem', 
                      color: '#6c757d', 
                      marginBottom: '5px',
                      fontWeight: 'normal'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Card.Title>
                    <Card.Text style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0',
                      color: '#333'
                    }}>
                      {key === 'averageDealSize' || key === 'revenue' 
                        ? formatCurrency(stat.value) 
                        : key === 'conversionRate' 
                          ? `${stat.value}%` 
                          : stat.value}
                    </Card.Text>
                  </div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {key === 'totalLeads' && <FaUser style={{ color: '#6c757d' }} />}
                    {key === 'activeProposals' && <FaTasks style={{ color: '#6c757d' }} />}
                    {key === 'conversionRate' && <FaPercentage style={{ color: '#6c757d' }} />}
                    {key === 'averageDealSize' && <FaDollarSign style={{ color: '#6c757d' }} />}
                    {key === 'closedDeals' && <FaHandshake style={{ color: '#6c757d' }} />}
                    {key === 'revenue' && <FaDollarSign style={{ color: '#6c757d' }} />}
                  </div>
                </div>
                {renderChange(stat.change)}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row style={{ marginBottom: '30px' }}>
        {/* Sales Pipeline */}
        <Col md={6} style={{ marginBottom: '20px' }}>
          <Card style={{ 
            height: '100%', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: 'none'
          }}>
            <Card.Header style={{ 
              backgroundColor: '#fff', 
              borderBottom: '1px solid #e9ecef',
              fontWeight: 'bold',
              padding: '15px'
            }}>
              <FaChartBar style={{ marginRight: '10px' }} />
              Sales Pipeline
            </Card.Header>
            <Card.Body style={{ padding: '20px' }}>
              {pipelineData.map((stage, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>{stage.stage}</span>
                    <span>{stage.leads} Leads</span>
                  </div>
                  <ProgressBar 
                    now={(stage.leads / 45) * 100} 
                    style={{ height: '10px' }}
                    variant={index % 2 === 0 ? 'warning' : 'info'}
                  />
                </div>
              ))}
              
              <div style={{ marginTop: '30px' }}>
                <h5 style={{ marginBottom: '15px', color: '#dc3545' }}>
                  <FaExclamationTriangle style={{ marginRight: '10px' }} />
                  Hot Leads - Immediate Action Required
                </h5>
                {hotLeads.map((lead, index) => (
                  <div key={index} style={{ 
                    padding: '15px', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h6 style={{ marginBottom: '5px' }}>{lead.name}</h6>
                      <div>
                        {lead.status.map((status, idx) => (
                          <Badge 
                            key={idx} 
                            bg={status === 'Hot Lead' ? 'danger' : 'primary'} 
                            style={{ marginRight: '5px' }}
                          >
                            {status}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p style={{ marginBottom: '5px', fontSize: '0.9rem' }}>
                      {lead.email} | {lead.phone}
                    </p>
                    <p style={{ marginBottom: '0', fontSize: '0.9rem' }}>
                      Value: {formatCurrency(lead.value)}
                    </p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activities, To Do List, Calendar */}
        <Col md={6}>
          <Row>
            {/* Recent Activities */}
            <Col md={12} style={{ marginBottom: '20px' }}>
              <Card style={{ 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: 'none'
              }}>
                <Card.Header style={{ 
                  backgroundColor: '#fff', 
                  borderBottom: '1px solid #e9ecef',
                  fontWeight: 'bold',
                  padding: '15px'
                }}>
                  Recent Activities
                </Card.Header>
                <Card.Body style={{ padding: '15px' }}>
                  {recentActivities.map(activity => (
                    <div key={activity.id} style={{ 
                      padding: '10px 0', 
                      borderBottom: '1px solid #e9ecef'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{activity.description}</span>
                        <span style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* To Do List */}
            <Col md={6} style={{ marginBottom: '20px' }}>
              <Card style={{ 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: 'none'
              }}>
                <Card.Header style={{ 
                  backgroundColor: '#fff', 
                  borderBottom: '1px solid #e9ecef',
                  fontWeight: 'bold',
                  padding: '15px'
                }}>
                  To Do List
                </Card.Header>
                <Card.Body style={{ padding: '15px' }}>
                  {todoList.map(todo => (
                    <div key={todo.id} style={{ 
                      padding: '10px 0', 
                      borderBottom: '1px solid #e9ecef',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        border: '1px solid #ced4da', 
                        borderRadius: '4px',
                        marginRight: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <FaCheck style={{ fontSize: '0.7rem', color: '#fff' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div>{todo.task}</div>
                        {todo.priority === 'HIGH' && (
                          <Badge bg="danger" style={{ fontSize: '0.7rem' }}>
                            {todo.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Calendar */}
            <Col md={6} style={{ marginBottom: '20px' }}>
              <Card style={{ 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: 'none'
              }}>
                <Card.Header style={{ 
                  backgroundColor: '#fff', 
                  borderBottom: '1px solid #e9ecef',
                  fontWeight: 'bold',
                  padding: '15px'
                }}>
                  <FaCalendarAlt style={{ marginRight: '10px' }} />
                  September 2025
                </Card.Header>
                <Card.Body style={{ padding: '15px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={index} style={{ 
                        textAlign: 'center', 
                        fontWeight: 'bold', 
                        fontSize: '0.8rem',
                        color: '#6c757d'
                      }}>
                        {day}
                      </div>
                    ))}
                    
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 1; // Start from 0
                      const isCurrentMonth = day >= 0 && day < 30;
                      const isHighlighted = day === 22; // 23rd day (0-indexed)
                      
                      return (
                        <div 
                          key={i} 
                          style={{ 
                            textAlign: 'center', 
                            padding: '5px',
                            borderRadius: '4px',
                            backgroundColor: isHighlighted ? '#007bff' : 'transparent',
                            color: isHighlighted ? '#fff' : isCurrentMonth ? '#333' : '#ced4da',
                            fontWeight: isHighlighted ? 'bold' : 'normal'
                          }}
                        >
                          {isCurrentMonth ? day + 1 : ''}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Hot Leads Detail */}
      <Row>
        <Col md={12}>
          <Card style={{ 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: 'none'
          }}>
            <Card.Header style={{ 
              backgroundColor: '#fff', 
              borderBottom: '1px solid #e9ecef',
              fontWeight: 'bold',
              padding: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <FaExclamationTriangle style={{ marginRight: '10px', color: '#dc3545' }} />
                Leads - Immediate Action Required
              </div>
              <Badge bg="danger">Hot Lead</Badge>
            </Card.Header>
            <Card.Body style={{ padding: '20px' }}>
              {hotLeads.map((lead, index) => (
                <div key={index}>
                  <Row>
                    <Col md={8}>
                      <h4 style={{ marginBottom: '15px' }}>{lead.name}</h4>
                      <p style={{ marginBottom: '10px' }}>
                        <FaEnvelope style={{ marginRight: '10px' }} />
                        {lead.email} | <FaPhone style={{ marginRight: '5px', marginLeft: '10px' }} />
                        {lead.phone}
                      </p>
                      
                      <Table striped bordered hover style={{ marginBottom: '20px' }}>
                        <tbody>
                          <tr>
                            <td style={{ width: '150px', fontWeight: 'bold' }}>Value</td>
                            <td>{formatCurrency(lead.value)}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 'bold' }}>Source</td>
                            <td>{lead.source}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 'bold' }}>Assigned</td>
                            <td>{lead.assigned}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 'bold' }}>Next Action</td>
                            <td>{lead.nextAction}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 'bold' }}>Last Contact</td>
                            <td>{lead.lastContact}</td>
                          </tr>
                        </tbody>
                      </Table>
                      
                      <div style={{ marginBottom: '20px' }}>
                        <Button variant="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                          <FaPhone style={{ marginRight: '5px' }} />
                          Call
                        </Button>
                        <Button variant="outline-primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                          <FaEnvelope style={{ marginRight: '5px' }} />
                          Email
                        </Button>
                        <Button variant="outline-secondary" style={{ marginBottom: '10px' }}>
                          <FaCalendarAlt style={{ marginRight: '5px' }} />
                          Schedule
                        </Button>
                      </div>
                    </Col>
                    
                    <Col md={4}>
                      <h5 style={{ marginBottom: '15px' }}>Client Information</h5>
                      <Card style={{ marginBottom: '20px', border: '1px solid #e9ecef' }}>
                        <Card.Body style={{ padding: '15px' }}>
                          <p style={{ marginBottom: '10px' }}>
                            <strong>Address:</strong> 123 Main Street, Vancouver, BC
                          </p>
                          <p style={{ marginBottom: '10px' }}>
                            <strong>Project Type:</strong> Custom Home
                          </p>
                          <p style={{ marginBottom: '0' }}>
                            <strong>Budget Range:</strong> $600K - $700K
                          </p>
                        </Card.Body>
                      </Card>
                      
                      <h5 style={{ marginBottom: '15px' }}>AI Insights & Recommendations</h5>
                      {aiInsights.map(insight => (
                        <Alert 
                          key={insight.id} 
                          variant={insight.status === 'Complete' ? 'success' : insight.status === 'Medium' ? 'warning' : 'info'}
                          style={{ marginBottom: '10px' }}
                        >
                          <div style={{ fontWeight: 'bold' }}>{insight.category}</div>
                          <div style={{ fontSize: '0.9rem' }}>{insight.description}</div>
                        </Alert>
                      ))}
                    </Col>
                  </Row>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;