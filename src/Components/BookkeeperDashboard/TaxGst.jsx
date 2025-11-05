import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaDollarSign, FaExclamationTriangle, FaFileAlt, FaMoneyBillWave, FaChartLine, FaWallet, FaCalendar, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineWarning, AiOutlineCheckCircle, AiOutlineFileText } from 'react-icons/ai';

const TaxGst = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', padding: '20px' }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#fff8e1',
        padding: '12px 20px',
        borderRadius: '6px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ffe082'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            backgroundColor: '#ff9800',
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px'
          }}>
            $
          </div>
          <span style={{ fontWeight: '600', color: '#333' }}>Bookkeeper Dashboard</span>
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <span style={{ fontSize: '12px' }}>▼</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <Row className="g-3 mb-4">
        {[
          { icon: <FaDollarSign size={20} color="#4CAF50" />, title: "Outstanding AR", value: "$72,250", bgColor: "#f8f9fa" },
          { icon: <FaExclamationTriangle size={20} color="#FF5722" />, title: "Overdue Invoices", value: "8", bgColor: "#f8f9fa" },
          { icon: <FaFileAlt size={20} color="#2196F3" />, title: "Pending Bills", value: "15", bgColor: "#f8f9fa" },
          { icon: <FaMoneyBillWave size={20} color="#673AB7" />, title: "Cash on Hand", value: "$158,750", bgColor: "#f8f9fa" },
          { icon: <FaChartLine size={20} color="#E91E63" />, title: "Monthly Revenue", value: "$420,000", bgColor: "#f8f9fa", trend: "up" },
          { icon: <FaWallet size={20} color="#795548" />, title: "Monthly Expenses", value: "$185,000", bgColor: "#f8f9fa", trend: "down" }
        ].map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <Card style={{
              backgroundColor: item.bgColor,
              border: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  backgroundColor: item.bgColor === "#f8f9fa" ? '#ffffff' : item.bgColor,
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e0e0e0'
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>{item.title}</div>
                </div>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>
                {item.value}
                {item.trend && (
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '14px',
                    color: item.trend === 'up' ? '#4CAF50' : '#F44336'
                  }}>
                    {item.trend === 'up' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* GST/HST Tax Management Section */}
      <Card style={{
        backgroundColor: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '20px',
        padding: '20px'
      }}>
        <h6 style={{ fontWeight: '600', color: '#333', marginBottom: '16px' }}>GST/HST Tax Management</h6>
        
        <Row className="g-3 mb-3">
          <Col xs={12} md={6}>
            <div style={{
              backgroundColor: '#e8f5e9',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #c8e6c9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '14px', color: '#2E7D32', fontWeight: '500' }}>GST Collected</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#2E7D32' }}>$24,378</div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div style={{
              backgroundColor: '#fff3e0',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #ffe0b2',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '14px', color: '#EF6C00', fontWeight: '500' }}>GST Owed</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#EF6C00' }}>$18,250</div>
            </div>
          </Col>
        </Row>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '14px', color: '#666', fontWeight: '500', marginBottom: '4px' }}>Current Filing Period</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>Q4 2024</div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '14px', color: '#666', fontWeight: '500', marginBottom: '4px' }}>Next Filing Date</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>31/03/2024</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '16px',
          flexWrap: 'wrap'
        }}>
          <Button 
            variant="warning" 
            style={{
              backgroundColor: '#FFB300',
              borderColor: '#FFB300',
              color: '#333',
              fontWeight: '600',
              padding: '8px 16px',
              fontSize: '14px',
              borderRadius: '6px'
            }}
          >
            Generate GST Return
          </Button>
          <Button 
            variant="outline-secondary" 
            style={{
              borderColor: '#dee2e6',
              color: '#495057',
              fontWeight: '600',
              padding: '8px 16px',
              fontSize: '14px',
              borderRadius: '6px'
            }}
          >
            Download Tax Report
          </Button>
          <Button 
            variant="outline-secondary" 
            style={{
              borderColor: '#dee2e6',
              color: '#495057',
              fontWeight: '600',
              padding: '8px 16px',
              fontSize: '14px',
              borderRadius: '6px'
            }}
          >
            CRA Online
          </Button>
        </div>
      </Card>

      {/* AI Insights & Recommendations Section */}
      <Card style={{
        backgroundColor: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '20px',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: '#e3f2fd',
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1976d2'
            }}>
              <FaCalendar size={14} />
            </div>
            <h6 style={{ fontWeight: '600', color: '#333', margin: 0 }}>AI Insights & Recommendations</h6>
          </div>
          <Button 
            variant="link" 
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0',
              fontSize: '14px'
            }}
          >
            View All
          </Button>
        </div>

        <Row className="g-3">
          {[
            {
              type: 'Quality Risk',
              severity: 'HIGH',
              description: 'Weather conditions may impact concrete',
              action: 'View Details',
              icon: <AiOutlineWarning size={18} color="#FF5722" />,
              severityBg: '#ffcdd2',
              severityColor: '#d32f2f'
            },
            {
              type: 'Deposits',
              severity: 'MEDIUM',
              description: '$245k in client deposits expected',
              action: 'Process',
              icon: <AiOutlineCheckCircle size={18} color="#4CAF50" />,
              severityBg: '#dcedc8',
              severityColor: '#388e3c'
            },
            {
              type: 'Documents',
              severity: 'NEW',
              description: '3 permit applications require',
              action: 'Review',
              icon: <AiOutlineFileText size={18} color="#2196F3" />,
              severityBg: '#bbdefb',
              severityColor: '#1976d2'
            }
          ].map((item, index) => (
            <Col key={index} xs={12} md={4}>
              <div style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #dee2e6'
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.type}</span>
                    <Badge 
                      bg="none" 
                      style={{
                        backgroundColor: item.severityBg,
                        color: item.severityColor,
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {item.severity}
                    </Badge>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{item.description}</div>
                  <Button 
                    variant="link" 
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: '500',
                      padding: '0',
                      fontSize: '13px'
                    }}
                  >
                    {item.action}
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default TaxGst;