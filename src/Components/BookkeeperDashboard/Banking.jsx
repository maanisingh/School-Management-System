import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaDollarSign, FaExclamationTriangle, FaFileInvoiceDollar, FaMoneyBillWave, FaChartLine, FaWallet, FaSync, FaEye, FaInfoCircle } from 'react-icons/fa';

const Banking = () => {
  return (
    <Container fluid style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFF8E1',
        padding: '10px 15px',
        borderRadius: '6px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #FFE082'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#FF6F00', fontSize: '1.2rem' }}>💰</span>
          <span style={{ fontWeight: '600', color: '#333' }}>Bookkeeper Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select style={{
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '5px 10px',
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
      <Row className="g-3 mb-4">
        {[
          { icon: <FaDollarSign size={24} color="#4CAF50" />, title: "Outstanding AR", value: "$72,250", bg: "#F5F5F5" },
          { icon: <FaExclamationTriangle size={24} color="#FF9800" />, title: "Overdue Invoices", value: "8", bg: "#F5F5F5" },
          { icon: <FaFileInvoiceDollar size={24} color="#2196F3" />, title: "Pending Bills", value: "15", bg: "#F5F5F5" },
          { icon: <FaMoneyBillWave size={24} color="#9C27B0" />, title: "Cash on Hand", value: "$158,750", bg: "#F5F5F5" },
          { icon: <FaChartLine size={24} color="#E91E63" />, title: "Monthly Revenue", value: "$420,000", bg: "#F5F5F5", trend: "up" },
          { icon: <FaWallet size={24} color="#607D8B" />, title: "Monthly Expenses", value: "$185,000", bg: "#F5F5F5", trend: "down" }
        ].map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <Card style={{
              backgroundColor: item.bg,
              border: 'none',
              borderRadius: '8px',
              padding: '15px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.icon}
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>{item.title}</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{item.value}</div>
                {item.trend && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: item.trend === 'up' ? '#4CAF50' : '#F44336',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {item.trend === 'up' ? '↑' : '↓'}
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bank Accounts & Reconciliation Section */}
      <Card style={{
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Card.Header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h5 style={{ margin: '0', fontWeight: '600', color: '#333' }}>Bank Accounts & Reconciliation</h5>
          <Button variant="warning" size="sm" style={{
            borderRadius: '20px',
            padding: '5px 15px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <FaSync size={14} /> Sync All Accounts
          </Button>
        </Card.Header>
        <Card.Body style={{ padding: '20px' }}>
          {/* Operating Account */}
          <div style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>Operating Account</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>TD Business Banking</div>
                <div style={{ fontSize: '12px', color: '#999' }}>Last sync: 2024-01-31 09:30 AM</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>$15000</div>
                <Badge bg="success" style={{ fontSize: '12px', padding: '3px 8px', marginTop: '5px' }}>Reconciled</Badge>
              </div>
            </div>
            <hr style={{ margin: '10px 0', borderColor: '#eee' }} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button variant="outline-dark" size="sm" style={{
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FaEye size={12} /> View Transaction
              </Button>
              <Button variant="outline-dark" size="sm" style={{
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FaSync size={12} /> Sync
              </Button>
            </div>
          </div>

          {/* Payroll Account */}
          <div style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>Payroll Account</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>TD Business Banking</div>
                <div style={{ fontSize: '12px', color: '#999' }}>Last sync: 2024-01-31 09:30 AM</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>$45,000</div>
                <Badge bg="warning" style={{ fontSize: '12px', padding: '3px 8px', marginTop: '5px' }}>Needs Reconciliation</Badge>
              </div>
            </div>
            <hr style={{ margin: '10px 0', borderColor: '#eee' }} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button variant="outline-dark" size="sm" style={{
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FaEye size={12} /> View Transaction
              </Button>
              <Button variant="outline-dark" size="sm" style={{
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FaSync size={12} /> Sync
              </Button>
            </div>
          </div>

          {/* Project Materials Account */}
          <div style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>Project Materials</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>RBC Business</div>
                <div style={{ fontSize: '12px', color: '#999' }}>Last sync: 2024-01-30 05:00 PM</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>$15000</div>
                <Badge bg="success" style={{ fontSize: '12px', padding: '3px 8px', marginTop: '5px' }}>Reconciled</Badge>
              </div>
            </div>
            <hr style={{ margin: '10px 0', borderColor: '#eee' }} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button variant="outline-dark" size="sm" style={{
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FaEye size={12} /> View Transaction
              </Button>
              <Button variant="outline-dark" size="sm" style={{
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <FaSync size={12} /> Sync
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
        <Card.Header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h5 style={{ margin: '0', fontWeight: '600', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaInfoCircle size={18} color="#2196F3" /> AI Insights & Recommendations
          </h5>
          <Button variant="link" style={{ padding: '0', fontSize: '14px', color: '#2196F3', textDecoration: 'none' }}>View All</Button>
        </Card.Header>
        <Card.Body style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {/* Quality Risk Alert */}
            <Alert variant="danger" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 15px',
              borderRadius: '6px',
              width: 'auto',
              minWidth: '250px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaExclamationTriangle size={16} color="#fff" />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>Quality Risk</span>
                <span style={{ 
                  backgroundColor: '#ff6b6b', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px', 
                  fontSize: '11px',
                  fontWeight: '600'
                }}>HIGH</span>
              </div>
              <div style={{ marginLeft: '10px', fontSize: '13px', flex: 1 }}>
                Weather conditions may impact concrete
                <Button variant="link" style={{ 
                  padding: '0', 
                  fontSize: '12px', 
                  color: '#2196F3', 
                  textDecoration: 'none',
                  marginLeft: '8px'
                }}>View Details</Button>
              </div>
            </Alert>

            {/* Deposits Alert */}
            <Alert variant="success" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 15px',
              borderRadius: '6px',
              width: 'auto',
              minWidth: '250px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaDollarSign size={16} color="#fff" />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>Deposits</span>
                <span style={{ 
                  backgroundColor: '#4caf50', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px', 
                  fontSize: '11px',
                  fontWeight: '600'
                }}>MEDIUM</span>
              </div>
              <div style={{ marginLeft: '10px', fontSize: '13px', flex: 1 }}>
                $245k in client deposits expected
                <Button variant="link" style={{ 
                  padding: '0', 
                  fontSize: '12px', 
                  color: '#2196F3', 
                  textDecoration: 'none',
                  marginLeft: '8px'
                }}>Process</Button>
              </div>
            </Alert>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Banking;