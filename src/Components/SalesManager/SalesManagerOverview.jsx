import React from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Badge, ProgressBar } from 'react-bootstrap';
import { FaPhone, FaCheck, FaUser, FaCalendar, FaSearch, FaPlus, FaChevronLeft, FaChevronRight, FaEye, FaEnvelope, FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { FiTrendingUp, FiDollarSign, FiFileText, FiUsers, FiTarget, FiCheckCircle, FiAlertTriangle, FiClock, FiMapPin, FiMail, FiVideo } from 'react-icons/fi';
import { MdOutlineCalendarToday, MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { BsGraphUp, BsPersonFill, BsBuilding, BsBoxSeam, BsCheckLg, BsExclamationTriangle } from 'react-icons/bs';

const SalesManagerOverview = () => {
  const currentMonth = "September 2025";
  const daysInMonth = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', padding: '20px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px', 
        padding: '12px 20px', 
        backgroundColor: '#fff9db', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            backgroundColor: '#6c5ce7', 
            borderRadius: '4px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            fontSize: '14px', 
            fontWeight: 'bold'
          }}>S</div>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>Sales Management</span>
        </div>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '4px', 
          backgroundColor: '#e9ecef', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer'
        }}>
          <FaChevronLeft size={12} color="#6c757d" />
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {[
          { icon: <FiUsers size={24} color="#6c5ce7" />, title: 'Total Leads', value: '156', change: '+11.01%', trend: 'up' },
          { icon: <FiFileText size={24} color="#6c5ce7" />, title: 'Active Proposals', value: '23', change: '+11.01%', trend: 'up' },
          { icon: <FiTarget size={24} color="#6c5ce7" />, title: 'Conversion Rate', value: '68%', change: '+11.01%', trend: 'up' },
          { icon: <FiDollarSign size={24} color="#6c5ce7" />, title: 'Average Deal Size', value: '$485K', change: '+11.01%', trend: 'up' },
          { icon: <FiCheckCircle size={24} color="#6c5ce7" />, title: 'Closed Deals', value: '12', change: '+11.01%', trend: 'up' },
          { icon: <FiTrendingUp size={24} color="#6c5ce7" />, title: 'Revenue', value: '$850K', change: '+11.01%', trend: 'up' }
        ].map((item, index) => (
          <Card key={index} style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            border: '1px solid #e9ecef', 
            padding: '16px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                backgroundColor: '#f0f0ff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                {item.icon}
              </div>
              <div style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>{item.title}</div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  marginTop: '4px'
                }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#2d3436' }}>{item.value}</span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: item.trend === 'up' ? '#2ecc71' : '#e74c3c', 
                    fontWeight: '600'
                  }}>
                    {item.change}
                  </span>
                  <FaChevronLeft size={10} color={item.trend === 'up' ? '#2ecc71' : '#e74c3c'} style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Recent Activities */}
        <Card style={{ 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h5 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>Recent Activities</h5>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { 
                icon: <FaPhone size={16} color="#6c5ce7" />, 
                title: 'Follow-up call with Chen Family', 
                description: 'Positive response, site visit scheduled', 
                time: '2 hours ago' 
              },
              { 
                icon: <FaCheck size={16} color="#2ecc71" />, 
                title: 'Proposal sent to Wilson Estate', 
                description: 'Delivered and opened', 
                time: '4 hours ago' 
              },
              { 
                icon: <FaUser size={16} color="#6c5ce7" />, 
                title: 'Initial consultation with Thompson', 
                description: 'Budget confirmed, needs qualified', 
                time: '1 day ago' 
              }
            ].map((activity, index) => (
              <div key={index} style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef', 
                backgroundColor: '#fafafa',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '4px', 
                  backgroundColor: activity.icon.props.color === '#6c5ce7' ? '#f0f0ff' : '#e8f5e8',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3436', marginBottom: '4px' }}>{activity.title}</div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>{activity.description}</div>
                  <div style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* To Do List */}
        <Card style={{ 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '4px', 
                backgroundColor: '#fff0f0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <FaCalendar size={14} color="#e74c3c" />
              </div>
              <h5 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>To Do List</h5>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline-secondary" size="sm" style={{ 
                fontSize: '12px', 
                padding: '4px 12px', 
                borderRadius: '6px',
                borderColor: '#dee2e6',
                color: '#6c757d'
              }}>View All</Button>
              <Button variant="warning" size="sm" style={{ 
                fontSize: '12px', 
                padding: '4px 12px', 
                borderRadius: '6px',
                backgroundColor: '#ffc107',
                borderColor: '#ffc107',
                color: '#212529'
              }}>Add New</Button>
            </div>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Search" 
            style={{ 
              marginBottom: '16px', 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #dee2e6',
              fontSize: '14px'
            }}
          />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button variant="light" size="sm" style={{ 
              flex: 1,
              fontSize: '12px', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backgroundColor: '#fff',
              borderColor: '#dee2e6',
              color: '#2d3436'
            }}>Today</Button>
            <Button variant="light" size="sm" style={{ 
              flex: 1,
              fontSize: '12px', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backgroundColor: '#fff9db',
              borderColor: '#dee2e6',
              color: '#2d3436'
            }}>Week</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Foundation Inspection', time: '10:32 AM', description: 'Scheduled inspection for Sunview project site A', assignee: 'John Davis', priority: 'HIGH' },
              { title: 'Material Delivery', time: '9:15 AM', description: 'Lumber shipment arrival for Aspen Living project', assignee: 'Sarah Mitchell', priority: 'HIGH' }
            ].map((task, index) => (
              <div key={index} style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef', 
                backgroundColor: '#fafafa',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '4px', 
                  backgroundColor: '#e8f5e8',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <BsCheckLg size={14} color="#2ecc71" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3436' }}>{task.title}</div>
                    <div style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>{task.time}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>{task.description}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '12px', 
                      backgroundColor: '#e8f5e8',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center'
                    }}>
                      <FaUser size={12} color="#2ecc71" />
                    </div>
                    <span style={{ fontSize: '12px', color: '#6c757d' }}>{task.assignee}</span>
                    {task.priority && (
                      <Badge bg="danger" style={{ 
                        fontSize: '10px', 
                        padding: '2px 6px', 
                        borderRadius: '12px',
                        fontWeight: '600'
                      }}>{task.priority}</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Calendar */}
        <Card style={{ 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef', 
          padding: '20px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '4px', 
                backgroundColor: '#fff0f0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <MdOutlineCalendarToday size={16} color="#e74c3c" />
              </div>
              <h5 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>{currentMonth}</h5>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '4px', 
                backgroundColor: '#e9ecef', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer'
              }}>
                <FaChevronLeft size={12} color="#6c757d" />
              </div>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '4px', 
                backgroundColor: '#e9ecef', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer'
              }}>
                <FaChevronRight size={12} color="#6c757d" />
              </div>
            </div>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '4px', 
            marginBottom: '8px'
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{ 
                textAlign: 'center', 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#6c757d',
                padding: '4px'
              }}>{day}</div>
            ))}
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '4px'
          }}>
            {daysInMonth.map((day, index) => (
              <div key={index} style={{ 
                textAlign: 'center', 
                fontSize: '12px', 
                padding: '8px', 
                borderRadius: '4px',
                backgroundColor: index === 22 ? '#6c5ce7' : 'transparent',
                color: index === 22 ? 'white' : '#2d3436',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
                {day}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sales Pipeline */}
      <Card style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        border: '1px solid #e9ecef', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <h5 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>Sales Pipeline</h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { stage: 'Initial Contact', leads: 45, progress: 60 },
            { stage: 'Qualification', leads: 32, progress: 50 },
            { stage: 'Proposal', leads: 23, progress: 40 },
            { stage: 'Negotiation', leads: 12, progress: 30 },
            { stage: 'Closed Won', leads: 8, progress: 20 }
          ].map((pipeline, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#2d3436', 
                minWidth: '120px'
              }}>{pipeline.stage}</div>
              <div style={{ 
                flex: 1, 
                height: '8px', 
                borderRadius: '4px', 
                backgroundColor: '#e9ecef',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${pipeline.progress}%`, 
                  height: '100%', 
                  backgroundColor: '#ffc107',
                  borderRadius: '4px 0 0 4px'
                }}></div>
                <div style={{ 
                  width: `${100 - pipeline.progress}%`, 
                  height: '100%', 
                  backgroundColor: '#6c5ce7',
                  borderRadius: '0 4px 4px 0'
                }}></div>
              </div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#2d3436'
              }}>{pipeline.leads} Leads</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hot Leads */}
      <Card style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        border: '1px solid #e9ecef', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '20px'
      }}>
        <h5 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>Hot Leads - Immediate Action Required</h5>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '16px', 
          borderRadius: '8px', 
          border: '1px solid #e9ecef', 
          backgroundColor: '#fafafa',
          gap: '16px'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3436', marginBottom: '4px' }}>Robert & Maria Chen</div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>robert.chen@mail.com | (604) 55-0123</div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>
                <strong>Value:</strong> $675,000
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>
                <strong>Source:</strong> Website
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>
              <strong>Last Contact:</strong> 25/08/2025
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="warning" size="sm" style={{ 
              fontSize: '12px', 
              padding: '4px 12px', 
              borderRadius: '6px',
              backgroundColor: '#ffc107',
              borderColor: '#ffc107',
              color: '#212529'
            }}>Hot Lead</Button>
            <Button variant="outline-primary" size="sm" style={{ 
              fontSize: '12px', 
              padding: '4px 12px', 
              borderRadius: '6px',
              borderColor: '#6c5ce7',
              color: '#6c5ce7'
            }}>Proposal</Button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ 
              padding: '8px', 
              borderRadius: '6px', 
              backgroundColor: '#e9ecef',
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px'
            }}>
              <FaPhoneAlt size={14} color="#6c757d" />
              <span style={{ fontSize: '12px', color: '#6c757d' }}>Call</span>
            </div>
            <div style={{ 
              padding: '8px', 
              borderRadius: '6px', 
              backgroundColor: '#e9ecef',
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px'
            }}>
              <FaEnvelope size={14} color="#6c757d" />
              <span style={{ fontSize: '12px', color: '#6c757d' }}>Email</span>
            </div>
            <div style={{ 
              padding: '8px', 
              borderRadius: '6px', 
              backgroundColor: '#e9ecef',
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px'
            }}>
              <FaVideo size={14} color="#6c757d" />
              <span style={{ fontSize: '12px', color: '#6c757d' }}>Video</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Client Information */}
      <Card style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        border: '1px solid #e9ecef', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '4px', 
              backgroundColor: '#fff0f0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <FaUser size={14} color="#e74c3c" />
            </div>
            <h5 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>Client Information</h5>
          </div>
          <Button variant="link" size="sm" style={{ 
            fontSize: '12px', 
            padding: '0', 
            color: '#6c5ce7',
            textDecoration: 'none'
          }}>View All</Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Sales Deposit', 'Client Name', 'Procurement', 'Title 4', 'Title 5', 'Title 6'].map((title, index) => (
            <Button key={index} variant="outline-secondary" size="sm" style={{ 
              fontSize: '12px', 
              padding: '6px 12px', 
              borderRadius: '6px',
              borderColor: '#dee2e6',
              color: '#6c757d',
              minWidth: '120px',
              textAlign: 'center'
            }}>{title}</Button>
          ))}
        </div>
      </Card>

      {/* AI Insights & Recommendations */}
      <Card style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        border: '1px solid #e9ecef', 
        padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '4px', 
              backgroundColor: '#fff0f0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <FaUser size={14} color="#e74c3c" />
            </div>
            <h5 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#2d3436' }}>AI Insights & Recommendations</h5>
          </div>
          <Button variant="link" size="sm" style={{ 
            fontSize: '12px', 
            padding: '0', 
            color: '#6c5ce7',
            textDecoration: 'none'
          }}>View All</Button>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { 
              icon: <BsExclamationTriangle size={16} color="#e74c3c" />, 
              title: 'Quality Risk', 
              status: 'HIGH', 
              description: 'Weather conditions may impact concrete', 
              action: 'View Details' 
            },
            { 
              icon: <BsBoxSeam size={16} color="#2ecc71" />, 
              title: 'Deposits', 
              status: 'MEDIUM', 
              description: '$245k in client deposits expected', 
              action: 'Process' 
            },
            { 
              icon: <BsBuilding size={16} color="#6c5ce7" />, 
              title: 'Documents', 
              status: 'NEW', 
              description: '3 permit applications require', 
              action: 'Review' 
            }
          ].map((insight, index) => (
            <div key={index} style={{ 
              flex: 1, 
              minWidth: '280px',
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #e9ecef', 
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '4px', 
                backgroundColor: insight.icon.props.color === '#e74c3c' ? '#fff0f0' : 
                                insight.icon.props.color === '#2ecc71' ? '#e8f5e8' : '#f0f0ff',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                {insight.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3436' }}>{insight.title}</div>
                  <Badge bg={insight.status === 'HIGH' ? 'danger' : insight.status === 'MEDIUM' ? 'success' : 'primary'} style={{ 
                    fontSize: '10px', 
                    padding: '2px 6px', 
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>{insight.status}</Badge>
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>{insight.description}</div>
                <Button variant="link" size="sm" style={{ 
                  fontSize: '12px', 
                  padding: '0', 
                  color: '#6c5ce7',
                  textDecoration: 'none'
                }}>{insight.action}</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SalesManagerOverview;