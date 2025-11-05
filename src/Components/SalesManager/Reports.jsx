import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaUsers, FaFileAlt, FaRocket, FaMoneyBillWave, FaCheck, FaChartLine, FaPlay, FaExclamationTriangle, FaFolder, FaMoneyBill } from 'react-icons/fa';

const Reports = () => {
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

      {/* Main Content Area */}
      <Row className="g-3 mb-4">
        {/* Sales Performance Card */}
        <Col xs={12} lg={6}>
          <Card style={{
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '20px',
            height: '100%'
          }}>
            <h5 style={{ 
              fontWeight: '600', 
              color: '#333', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>Sales Performance</h5>
            
            {/* Last Month Sales */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#333' }}>Last Month Sales</span>
                <span style={{ fontSize: '13px', color: '#333' }}>$1,200,000</span>
              </div>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#E0E0E0', 
                borderRadius: '4px', 
                overflow: 'hidden',
                marginBottom: '5px'
              }}>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#FF9800', 
                  width: '71%', 
                  borderRadius: '4px 0 0 4px'
                }}></div>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#9C27B0', 
                  width: '29%', 
                  borderRadius: '0 4px 4px 0'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                <span>$850,000</span>
                <span>71% of Target</span>
              </div>
            </div>
            
            {/* Lead Conversion */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#333' }}>Lead Conversion</span>
              </div>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#E0E0E0', 
                borderRadius: '4px', 
                overflow: 'hidden',
                marginBottom: '5px'
              }}>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#FF9800', 
                  width: '68%', 
                  borderRadius: '4px 0 0 4px'
                }}></div>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#9C27B0', 
                  width: '32%', 
                  borderRadius: '0 4px 4px 0'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                <span>Any number</span>
                <span>68% of Target</span>
              </div>
            </div>
            
            {/* Proposal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#333' }}>Proposal</span>
              </div>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#E0E0E0', 
                borderRadius: '4px', 
                overflow: 'hidden',
                marginBottom: '5px'
              }}>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#FF9800', 
                  width: '50%', 
                  borderRadius: '4px 0 0 4px'
                }}></div>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#9C27B0', 
                  width: '50%', 
                  borderRadius: '0 4px 4px 0'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                <span>16</span>
                <span>50% Converted</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Lead Source Card */}
        <Col xs={12} lg={6}>
          <Card style={{
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '20px',
            height: '100%'
          }}>
            <h5 style={{ 
              fontWeight: '600', 
              color: '#333', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>Lead Source</h5>
            
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '250px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <div style={{ 
                width: '200px', 
                height: '200px', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Pie Chart using SVG with exact positioning */}
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Website segment (red) - 12.4% */}
                  <path 
                    d="M100,100 L100,0 A100,100 0 0,1 186.6,50 Z" 
                    fill="#FF5722"
                  />
                  <text x="143" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                    Website<br/>12.4%
                  </text>
                  
                  {/* Referrals segment (orange) - 12.4% */}
                  <path 
                    d="M100,100 L186.6,50 A100,100 0 0,1 186.6,150 Z" 
                    fill="#FF9800"
                  />
                  <text x="143" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                    Referrals<br/>12.4%
                  </text>
                  
                  {/* Trade shows segment (purple) - 0% detected */}
                  <path 
                    d="M100,100 L186.6,150 A100,100 0 0,1 100,200 Z" 
                    fill="#9C27B0"
                  />
                  <text x="100" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                    Trade shows<br/>0% detected
                  </text>
                  
                  {/* Social media segment (blue) - 3.1% */}
                  <path 
                    d="M100,100 L100,200 A100,100 0 0,1 13.4,150 Z" 
                    fill="#2196F3"
                  />
                  <text x="57" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                    Social media<br/>3.1%
                  </text>
                  
                  {/* Other segment (gray) - 0.8% */}
                  <path 
                    d="M100,100 L13.4,150 A100,100 0 0,1 13.4,50 Z" 
                    fill="#E0E0E0"
                  />
                  <text x="57" y="75" textAnchor="middle" fill="black" fontSize="12" fontWeight="600">
                    Other<br/>0.8%
                  </text>
                </svg>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

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
              icon: <FaMoneyBill size={14} color="#4CAF50" />,
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
                <span style={{ fontSize: '11px', color: '#64B5F6', textDecoration: 'underline', fontWeight: '500', cursor: 'pointer' }}>
                  {insight.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Reports;