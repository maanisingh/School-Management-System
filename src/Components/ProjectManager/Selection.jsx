import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaClipboardList, FaClock, FaCalendarAlt, FaCheckCircle, FaUsers, FaFileAlt, FaExclamationTriangle, FaMoneyBillWave, FaFolder, FaPlus } from 'react-icons/fa';
import { MdOutlineArrowForward } from 'react-icons/md';

const Selection = () => {
  return (
    <Container fluid style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Top Header */}
      <div style={{
        backgroundColor: '#FFF8E1',
        padding: '10px 15px',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            backgroundColor: '#9C27B0',
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px'
          }}>
            P
          </div>
          <span style={{ fontWeight: '500', fontSize: '14px' }}>Project Management</span>
        </div>
        <div style={{
          backgroundColor: '#F5F5F5',
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <MdOutlineArrowForward style={{ fontSize: '16px', color: '#757575' }} />
        </div>
      </div>

      {/* Stats Cards Row */}
      <Row className="g-3 mb-4">
        {[
          { icon: <FaClipboardList size={24} color="#4CAF50" />, title: "Active To-Dos", count: "23" },
          { icon: <FaClock size={24} color="#FF9800" />, title: "Pending RFIs", count: "8" },
          { icon: <FaCalendarAlt size={24} color="#4CAF50" />, title: "Today's Task", count: "12" },
          { icon: <FaCheckCircle size={24} color="#4CAF50" />, title: "Completed", count: "45" },
          { icon: <FaClock size={24} color="#9C27B0" />, title: "Milestones", count: "5" },
          { icon: <FaUsers size={24} color="#9C27B0" />, title: "Team Members", count: "15" }
        ].map((item, index) => (
          <Col key={index} xs={6} sm={4} md={2}>
            <Card style={{
              border: 'none',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontSize: '12px', color: '#757575', marginBottom: '5px' }}>{item.title}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#212121' }}>{item.count}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content Card */}
      <Card style={{
        border: 'none',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h5 style={{ marginBottom: '30px', fontWeight: '500', color: '#212121' }}>Client Selections Management</h5>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          textAlign: 'center'
        }}>
          <FaFileAlt size={64} color="#757575" style={{ marginBottom: '20px' }} />
          <h5 style={{ marginBottom: '10px', fontWeight: '500', color: '#212121' }}>Selections Dashboard</h5>
          <p style={{ marginBottom: '20px', color: '#757575', maxWidth: '400px' }}>
            Track client selections for finishes, fixtures, and upgrades
          </p>
          <Button 
            variant="warning" 
            style={{
              backgroundColor: '#FFC107',
              borderColor: '#FFC107',
              color: '#212121',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '4px'
            }}
          >
            <FaPlus style={{ marginRight: '8px' }} /> Create Selection Sheet
          </Button>
        </div>
      </Card>

      {/* AI Insights Section */}
      <div style={{ marginTop: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaExclamationTriangle size={16} color="#4CAF50" />
            <span style={{ fontWeight: '500', fontSize: '14px', color: '#212121' }}>AI Insights & Recommendations</span>
          </div>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#2196F3',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}>
            View All
          </button>
        </div>

        <Row className="g-3">
          {[
            {
              icon: <FaExclamationTriangle size={16} color="#FF5722" />,
              label: "Quality Risk",
              severity: "HIGH",
              text: "Weather conditions may impact concrete",
              action: "View Details"
            },
            {
              icon: <FaMoneyBillWave size={16} color="#4CAF50" />,
              label: "Deposits",
              severity: "MEDIUM",
              text: "$245k in client deposits expected",
              action: "Process"
            },
            {
              icon: <FaFolder size={16} color="#2196F3" />,
              label: "Documents",
              severity: "NEW",
              text: "3 permit applications require",
              action: "Review"
            }
          ].map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <Card style={{
                border: '1px solid #E0E0E0',
                borderRadius: '6px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{ flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#212121' }}>{item.label}</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: item.severity === 'HIGH' ? '#FF5722' : item.severity === 'MEDIUM' ? '#4CAF50' : '#2196F3',
                      backgroundColor: item.severity === 'HIGH' ? '#FFEBEE' : item.severity === 'MEDIUM' ? '#E8F5E9' : '#E3F2FD',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {item.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#757575', marginBottom: '4px' }}>{item.text}</div>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#2196F3',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}>
                    {item.action}
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Selection;