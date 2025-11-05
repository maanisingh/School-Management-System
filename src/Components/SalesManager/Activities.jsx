import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaUsers, FaFileAlt, FaRocket, FaMoneyBillWave, FaCheck, FaChartLine, FaPhone, FaEnvelope, FaUser, FaCalendar, FaExclamationTriangle, FaFolder, FaPlay } from 'react-icons/fa';

const Activities = () => {
  return (
    <Container fluid style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFF8E1',
        padding: '10px 15px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
            fontSize: '12px'
          }}>
            S
          </div>
          <span style={{ fontWeight: '600', color: '#333' }}>Sales Management</span>
        </div>
        <div style={{
          backgroundColor: '#F5F5F5',
          borderRadius: '4px',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Metrics Cards */}
      <Row className="g-3 mb-4">
        {[
          { icon: <FaUsers size={20} color="#64B5F6" />, title: "Total Leads", value: "156", growth: "+11.01%", trend: "↑" },
          { icon: <FaFileAlt size={20} color="#7E57C2" />, title: "Active Proposals", value: "23", growth: "+11.01%", trend: "↑" },
          { icon: <FaRocket size={20} color="#4CAF50" />, title: "Conversion Rate", value: "68%", growth: "+11.01%", trend: "↑" },
          { icon: <FaMoneyBillWave size={20} color="#FF9800" />, title: "Average Deal Size", value: "$485K", growth: "+11.01%", trend: "↑" },
          { icon: <FaCheck size={20} color="#607D8B" />, title: "Closed Deals", value: "12", growth: "+11.01%", trend: "↑" },
          { icon: <FaChartLine size={20} color="#FF5722" />, title: "Revenue", value: "$850K", growth: "+11.01%", trend: "↑" }
        ].map((item, index) => (
          <Col key={index} xs={6} sm={4} md={2}>
            <Card style={{
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '15px',
              backgroundColor: '#FAFAFA'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  {item.icon}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{item.value}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: '#4CAF50' }}>{item.growth}</span>
                <span style={{ fontSize: '14px', color: '#4CAF50' }}>{item.trend}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sales Activities & Communications */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', 
        marginBottom: '20px' 
      }}>
        <h5 style={{ 
          fontWeight: '600', 
          color: '#333', 
          marginBottom: '15px',
          fontSize: '14px'
        }}>Sales Activities & Communications</h5>

        {/* Activity Items */}
        {[
          {
            icon: <FaPhone size={16} color="#64B5F6" />,
            title: "Follow-up call with Chen Family",
            time: "2 hours ago",
            status: "Positive response, site visit scheduled",
            button: "Call Client"
          },
          {
            icon: <FaEnvelope size={16} color="#4CAF50" />,
            title: "Proposal sent to Wilson Estate",
            time: "4 hours ago",
            status: "Delivered and opened",
            button: "Email Client"
          },
          {
            icon: <FaUser size={16} color="#7E57C2" />,
            title: "Initial consultation with Thompson",
            time: "1 day ago",
            status: "Budget confirmed, needs qualified",
            button: "Schedule Meeting"
          },
          {
            icon: <FaUser size={16} color="#7E57C2" />,
            title: "Proposal presentation to Parker Development",
            time: "2 hours ago",
            status: "Positive response, site visit scheduled",
            button: "Schedule Meeting"
          },
          {
            icon: <FaPhone size={16} color="#64B5F6" />,
            title: "Discovery call with new lead - Johnson Family",
            time: "3 hours ago",
            status: "Qualified lead, budget confirmed",
            button: "Call Client"
          },
          {
            icon: <FaPhone size={16} color="#64B5F6" />,
            title: "Contract sent to Wilson Estate",
            time: "4 days ago",
            status: "Under legal review",
            button: "Email Client"
          }
        ].map((activity, index) => (
          <div key={index} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '15px',
            border: '1px solid #E0E0E0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px'
                }}>
                  {activity.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>{activity.title}</div>
                  <div style={{ fontSize: '12px', color: '#FF5722', marginTop: '4px' }}>{activity.time}</div>
                </div>
              </div>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                style={{
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  borderColor: '#E0E0E0',
                  color: '#666'
                }}
              >
                {activity.button}
              </Button>
            </div>
            <div style={{
              backgroundColor: '#FFF8E1',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#333'
            }}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights & Recommendations */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h5 style={{ 
            fontWeight: '600', 
            color: '#333', 
            marginBottom: '0',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaPlay size={16} color="#607D8B" />
            AI Insights & Recommendations
          </h5>
          <span style={{ fontSize: '12px', color: '#64B5F6', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            {
              icon: <FaExclamationTriangle size={14} color="#FF5722" />,
              label: "Quality Risk",
              badge: "HIGH",
              description: "Weather conditions may impact concrete",
              action: "View Details",
              bgColor: "#FFEBEE",
              badgeColor: "#FF5722"
            },
            {
              icon: <FaMoneyBillWave size={14} color="#4CAF50" />,
              label: "Deposits",
              badge: "MEDIUM",
              description: "$240k in client deposits expected",
              action: "Process",
              bgColor: "#E8F5E9",
              badgeColor: "#4CAF50"
            },
            {
              icon: <FaFolder size={14} color="#607D8B" />,
              label: "Documents",
              badge: "NEW",
              description: "3 permit applications require",
              action: "Review",
              bgColor: "#E3F2FD",
              badgeColor: "#607D8B"
            }
          ].map((insight, index) => (
            <div key={index} style={{
              backgroundColor: insight.bgColor,
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '250px',
              flex: '1 1 auto'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {insight.icon}
              </div>
              <div style={{ flex: '1', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{insight.label}</span>
                  <Badge 
                    bg="" 
                    style={{
                      backgroundColor: insight.badgeColor,
                      color: 'white',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    {insight.badge}
                  </Badge>
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>{insight.description}</div>
                <Button 
                  variant="link" 
                  size="sm" 
                  style={{
                    padding: '0',
                    fontSize: '11px',
                    color: '#64B5F6',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                >
                  {insight.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Activities;