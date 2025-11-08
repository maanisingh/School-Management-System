import React, { useState } from 'react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New assignment posted by Mr. Sharma', time: '2 hours ago', icon: '📝' },
    { id: 2, text: 'Holiday declared on 12 Nov', time: 'Yesterday', icon: '🎉' },
    { id: 3, text: 'Result for Term 1 released', time: '3 days ago', icon: '📊' }
  ]);

  // Sample data for charts
  const subjects = ['Math', 'Science', 'English', 'History', 'Geography', 'Computer Science'];
  const term1Scores = [85, 78, 92, 70, 88, 95];
  const term2Scores = [88, 82, 90, 75, 85, 92];
  
  const attendanceMonths = ['July', 'August', 'September', 'October', 'November'];
  const daysPresent = [22, 24, 20, 23, 18];
  const daysAbsent = [2, 1, 3, 1, 2];

  // Button click handlers
  const handleViewReportCard = () => {
    alert('Opening Full Report Card...');
  };

  const handleViewStudyMaterial = () => {
    alert('Opening Study Materials...');
  };

  const handleStartQuiz = () => {
    alert('Starting Quiz/Practice Test...');
  };

  const handleContactTeacher = () => {
    alert('Opening Teacher Contact Form...');
  };

  const handleActivityClick = (activity) => {
    alert(`Viewing details for: ${activity}`);
  };

  const handleNotificationClick = (notification) => {
    alert(`Opening: ${notification.text}`);
  };

  const handleGoalClick = (goal) => {
    alert(`Working on goal: ${goal}`);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Responsive viewport-based styles
  const getViewportStyles = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;
    
    return {
      container: {
        minHeight: '100vh',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        padding: isMobile ? '10px' : isTablet ? '15px' : '20px',
        width: '100%',
        maxWidth: isDesktop ? '1400px' : '100%',
        margin: '0 auto',
        boxSizing: 'border-box'
      },
      header: {
        backgroundColor: 'white',
        padding: isMobile ? '15px' : '20px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? '15px' : '0'
      },
      profile: {
        textAlign: isMobile ? 'center' : 'right',
        color: '#1e2a38'
      },
      card: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: isMobile ? '15px' : '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #cbd5e1',
        transition: 'transform 0.3s, box-shadow 0.3s',
        width: '100%',
        boxSizing: 'border-box'
      },
      buttonPrimary: {
        backgroundColor: '#7e3af2',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '25px',
        margin: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontSize: '14px',
        fontWeight: '500',
        width: isMobile ? '100%' : 'auto'
      },
      buttonSecondary: {
        backgroundColor: 'transparent',
        color: '#7e3af2',
        border: '1px solid #7e3af2',
        padding: '12px 24px',
        borderRadius: '25px',
        margin: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontSize: '14px',
        fontWeight: '500',
        width: isMobile ? '100%' : 'auto'
      },
      row: {
        display: 'flex',
        gap: isMobile ? '10px' : isTablet ? '15px' : '20px',
        flexWrap: 'wrap',
        width: '100%'
      },
      col: {
        flex: isMobile ? '1 1 100%' : isTablet ? '1 1 45%' : isDesktop ? '1 1 30%' : '1 1 30%',
        minWidth: isMobile ? '100%' : '300px'
      },
      listItem: {
        padding: isMobile ? '10px' : '15px',
        borderBottom: '1px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s',
        cursor: 'pointer'
      },
      tabContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #e2e8f0',
        overflowX: 'auto',
        width: '100%'
      },
      tabButton: (isActive) => ({
        padding: '10px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: isActive ? '2px solid #7e3af2' : '2px solid transparent',
        color: isActive ? '#7e3af2' : '#1e2a38',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontWeight: isActive ? '600' : '400',
        whiteSpace: 'nowrap'
      })
    };
  };

  const styles = getViewportStyles();

  // Simple bar chart component
  const SimpleBarChart = ({ data, labels, color, height = '200px' }) => {
    const maxValue = Math.max(...data);
    const isMobile = window.innerWidth <= 768;
    
    return (
      <div style={{ height, padding: '10px', width: '100%' }}>
        {data.map((value, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ 
              width: isMobile ? '60px' : '80px', 
              fontSize: isMobile ? '10px' : '12px', 
              color: '#1e2a38'
            }}>{labels[index]}</div>
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <div style={{ 
                height: '20px', 
                backgroundColor: '#e2e8f0', 
                borderRadius: '3px',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(value / maxValue) * 100}%`,
                  backgroundColor: color,
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '5px',
                  transition: 'width 0.5s ease'
                }}>
                  <span style={{ fontSize: '11px', color: 'white', fontWeight: 'bold' }}>{value}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Progress circle component
  const ProgressCircle = ({ percentage, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#7e3af2"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <div style={{ 
          position: 'absolute', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: size,
          height: size
        }}>
          <h3 style={{ margin: 0, color: '#1e2a38' }}>{percentage}%</h3>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <h1 style={{ color: '#1e2a38', margin: '0 0 5px 0', fontSize: window.innerWidth <= 768 ? '24px' : '28px' }}>Welcome, Ayanda 👋</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Here's your learning summary for this term.</p>
        </div>
        <div style={styles.profile}>
          <img 
            src="https://picsum.photos/seed/student123/80/80.jpg" 
            alt="Profile" 
            style={{ 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px',
              marginBottom: '10px',
              border: '3px solid #7e3af2'
            }} 
          />
          <h5 style={{ margin: '5px 0' }}>Ayanda Nkosi</h5>
          <p style={{ margin: '2px 0', fontSize: '14px' }}>Roll No: STU20231045</p>
          <p style={{ margin: '2px 0', fontSize: '14px' }}>Grade 10 - Science Stream</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.tabContainer}>
        <button 
          style={styles.tabButton(activeTab === 'overview')}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          style={styles.tabButton(activeTab === 'academics')}
          onClick={() => setActiveTab('academics')}
        >
          Academics
        </button>
        <button 
          style={styles.tabButton(activeTab === 'activities')}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </button>
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div style={{ width: '100%' }}>
          <div style={styles.row}>
            {/* Class Information Card */}
            <div style={{ ...styles.col, maxWidth: window.innerWidth <= 768 ? '100%' : '350px' }}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Class Information</h2>
                <div style={{ color: '#1e2a38' }}>
                  <div style={styles.listItem} onClick={() => alert('Viewing class details...')}>
                    <span style={{ flex: 1 }}>Class/Section:</span>
                    <strong>Grade 10 - A</strong>
                  </div>
                  <div style={styles.listItem} onClick={() => alert('Viewing teacher profile...')}>
                    <span style={{ flex: 1 }}>Class Teacher:</span>
                    <strong>Mr. Rahul Verma</strong>
                  </div>
                  <div style={styles.listItem}>
                    <span style={{ flex: 1 }}>Total Subjects:</span>
                    <strong>8</strong>
                  </div>
                  <div style={styles.listItem}>
                    <span style={{ flex: 1 }}>Attendance:</span>
                    <strong>92%</strong>
                  </div>
                  <div style={styles.listItem}>
                    <span style={{ flex: 1 }}>Average Grade:</span>
                    <strong>A</strong>
                  </div>
                  <div style={styles.listItem}>
                    <span style={{ flex: 1 }}>Current Term:</span>
                    <strong>Term 2 / Semester 1</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Progress Chart */}
            <div style={{ ...styles.col, flex: window.innerWidth <= 768 ? '1 1 100%' : '2 1 60%' }}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Academic Progress</h2>
                <div style={{ display: 'flex', gap: '20px', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
                  <div style={{ flex: 1, width: '100%' }}>
                    <h3 style={{ color: '#1e2a38', fontSize: '14px', marginBottom: '10px' }}>Term 1</h3>
                    <SimpleBarChart data={term1Scores} labels={subjects} color="#1e2a38" />
                  </div>
                  <div style={{ flex: 1, width: '100%' }}>
                    <h3 style={{ color: '#7e3af2', fontSize: '14px', marginBottom: '10px' }}>Term 2</h3>
                    <SimpleBarChart data={term2Scores} labels={subjects} color="#7e3af2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.row}>
            {/* Attendance Overview */}
            <div style={styles.col}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Attendance Overview</h2>
                <div style={{ display: 'flex', gap: '20px', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
                  <div style={{ flex: 1, width: '100%' }}>
                    <h3 style={{ color: '#1e2a38', fontSize: '14px', marginBottom: '10px' }}>Days Present</h3>
                    <SimpleBarChart data={daysPresent} labels={attendanceMonths} color="#7e3af2" height="150px" />
                  </div>
                  <div style={{ flex: 1, width: '100%' }}>
                    <h3 style={{ color: '#1e2a38', fontSize: '14px', marginBottom: '10px' }}>Days Absent</h3>
                    <SimpleBarChart data={daysAbsent} labels={attendanceMonths} color="#cbd5e1" height="150px" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                  <ProgressCircle percentage={92} />
                  <p style={{ color: '#1e2a38', marginTop: '10px' }}>Attendance Rate</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={styles.col}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Quick Actions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    style={styles.buttonPrimary}
                    onClick={handleViewReportCard}
                  >
                    📄 View Full Report Card
                  </button>
                  <button 
                    style={styles.buttonSecondary}
                    onClick={handleViewStudyMaterial}
                  >
                    📚 View Study Material
                  </button>
                  <button 
                    style={styles.buttonSecondary}
                    onClick={handleStartQuiz}
                  >
                    🧠 Start Quiz / Practice Test
                  </button>
                  <button 
                    style={styles.buttonSecondary}
                    onClick={handleContactTeacher}
                  >
                    💬 Contact Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academics' && (
        <div style={{ width: '100%' }}>
          <div style={styles.row}>
            {/* Goals & Recommendations */}
            <div style={styles.col}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Goals & Recommendations</h2>
                <div 
                  style={styles.listItem}
                  onClick={() => handleGoalClick('Improve average by 5%')}
                >
                  <span style={{ fontSize: '20px', marginRight: '15px' }}>🎯</span>
                  <div>
                    <strong style={{ color: '#1e2a38' }}>Set a goal to improve your average by 5% this month</strong>
                  </div>
                </div>
                <div 
                  style={styles.listItem}
                  onClick={() => handleGoalClick('Focus on History and English')}
                >
                  <span style={{ fontSize: '20px', marginRight: '15px' }}>📚</span>
                  <div>
                    <strong style={{ color: '#1e2a38' }}>Focus more on History and English</strong>
                  </div>
                </div>
                <div 
                  style={styles.listItem}
                  onClick={() => alert('Getting more tips...')}
                >
                  <span style={{ fontSize: '20px', marginRight: '15px' }}>💡</span>
                  <div>
                    <em style={{ color: '#64748b' }}>"Success is not final, failure is not fatal: It is the courage to continue that counts."</em>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div style={styles.col}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Subject Performance</h2>
                {subjects.map((subject, index) => (
                  <div key={subject} style={styles.listItem} onClick={() => alert(`Viewing ${subject} details...`)}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#1e2a38' }}>{subject}</strong>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Term 1: {term1Scores[index]}%</span>
                        <span style={{ fontSize: '12px', color: '#7e3af2' }}>Term 2: {term2Scores[index]}%</span>
                      </div>
                    </div>
                    <span style={{ 
                      color: term2Scores[index] > term1Scores[index] ? '#10b981' : '#ef4444',
                      fontSize: '20px'
                    }}>
                      {term2Scores[index] > term1Scores[index] ? '📈' : '📉'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div style={{ width: '100%' }}>
          <div style={styles.row}>
            {/* Upcoming Activities */}
            <div style={styles.col}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Upcoming Activities</h2>
                <div 
                  style={styles.listItem}
                  onClick={() => handleActivityClick('Math Unit Test - Nov 10')}
                >
                  <span style={{ fontSize: '20px', marginRight: '15px' }}>📘</span>
                  <div>
                    <strong style={{ color: '#1e2a38' }}>Math Unit Test</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Nov 10, 2023</p>
                  </div>
                </div>
                <div 
                  style={styles.listItem}
                  onClick={() => handleActivityClick('Science Lab - Nov 15')}
                >
                  <span style={{ fontSize: '20px', marginRight: '15px' }}>🧪</span>
                  <div>
                    <strong style={{ color: '#1e2a38' }}>Science Lab</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Nov 15, 2023</p>
                  </div>
                </div>
                <div 
                  style={styles.listItem}
                  onClick={() => handleActivityClick('Essay Submission - Nov 18')}
                >
                  <span style={{ fontSize: '20px', marginRight: '15px' }}>🗒</span>
                  <div>
                    <strong style={{ color: '#1e2a38' }}>Essay Submission</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Nov 18, 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications & Announcements */}
            <div style={styles.col}>
              <div style={styles.card}>
                <h2 style={{ color: '#1e2a38', fontSize: '18px', marginBottom: '15px' }}>Notifications & Announcements</h2>
                {notifications.map((notification) => (
                  <div key={notification.id} style={styles.listItem}>
                    <span style={{ fontSize: '20px', marginRight: '15px' }}>{notification.icon}</span>
                    <div style={{ flex: 1 }} onClick={() => handleNotificationClick(notification)}>
                      <strong style={{ color: '#1e2a38' }}>{notification.text}</strong>
                      <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>{notification.time}</p>
                    </div>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '5px'
                      }}
                      onClick={() => clearNotification(notification.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;