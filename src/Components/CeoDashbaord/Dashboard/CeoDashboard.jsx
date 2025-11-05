import React, { useState } from 'react';

const CeoDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025
  const [ganttView, setGanttView] = useState('Month');
  
  const statsData = [
    { title: 'Total Users', value: '12', icon: '👥', bgColor: '#E8F4FD', iconColor: '#4A90E2' },
    { title: 'Active Projects', value: '8', icon: '📋', bgColor: '#F3E8FF', iconColor: '#9B59B6' },
    { title: 'Growth', value: '18.5%', icon: '🚀', bgColor: '#E8FDF5', iconColor: '#2ECC71' },
    { title: 'Completed Task', value: '45', icon: '💰', bgColor: '#E8F9F9', iconColor: '#16A085' },
    { title: 'Deadlines', value: '3', icon: '✓', bgColor: '#2D2D2D', iconColor: '#FFFFFF' }
  ];

  const recentJobs = [
    { name: 'Project 1', progress: 87, color: '#2ECC71' },
    { name: 'Project 2', progress: 100, color: '#3498DB' },
    { name: 'Project 3', progress: 75, color: '#9B59B6' },
    { name: 'Project 4', progress: 75, color: '#F1C40F' }
  ];

  const todoList = [
    { 
      title: 'Foundation Inspection', 
      time: '10:32 AM', 
      description: 'Scheduled inspection of Sunview project site A', 
      assignee: 'John Davis',
      priority: 'HIGH',
      avatar: 'JD',
      avatarColor: '#3498DB'
    },
    { 
      title: 'Material Delivery', 
      time: '9:15 AM', 
      description: 'Lumber shipment arrival for Aspen Living project', 
      assignee: 'Sarah Mitchell',
      priority: 'HIGH',
      avatar: 'SM',
      avatarColor: '#2ECC71'
    }
  ];

  const ganttTasks = [
    { 
      id: 1, 
      name: 'Planning Phase', 
      details: '5 tasks • 2 weeks',
      assignee: 'Sarah Johnson',
      startDate: '2025-03-10', 
      endDate: '2025-03-25', 
      status: 'Completed',
      color: '#3498DB'
    },
    { 
      id: 2, 
      name: 'Requirements Gathering', 
      details: 'Completed',
      assignee: 'Mike Chen',
      startDate: '2025-03-20', 
      endDate: '2025-04-10', 
      status: 'Completed',
      color: '#2ECC71'
    },
    { 
      id: 3, 
      name: 'User Research', 
      details: 'In Progress',
      assignee: 'Emma Wilson',
      startDate: '2025-04-05', 
      endDate: '2025-05-01', 
      status: 'In Progress',
      color: '#3498DB'
    },
    { 
      id: 4, 
      name: 'Competitive Analysis', 
      details: 'At Risk',
      assignee: 'David Park',
      startDate: '2025-05-01', 
      endDate: '2025-06-05', 
      status: 'At Risk',
      color: '#E67E22'
    },
    { 
      id: 5, 
      name: 'Design Phase', 
      details: '8 tasks • 3 weeks',
      assignee: 'Lisa Rodriguez',
      startDate: '2025-05-25', 
      endDate: '2025-07-15', 
      status: 'In Progress',
      color: '#9B59B6'
    },
    { 
      id: 6, 
      name: 'Wireframing', 
      details: 'Not Started',
      assignee: 'Alex Turner',
      startDate: '2025-07-01', 
      endDate: '2025-07-25', 
      status: 'Not Started',
      color: '#95A5A6'
    },
    { 
      id: 7, 
      name: 'Visual Design', 
      details: 'Not Started',
      assignee: 'Sophie Kim',
      startDate: '2025-07-20', 
      endDate: '2025-08-15', 
      status: 'Not Started',
      color: '#95A5A6'
    }
  ];

  const aiInsights = [
    {
      title: 'Quality Risk',
      description: 'Weather conditions may impact concrete',
      priority: 'HIGH',
      type: 'risk',
      icon: '⚠️'
    },
    {
      title: 'Deposits',
      description: '$245k in client deposits expected',
      priority: 'MEDIUM',
      type: 'financial',
      icon: '💰'
    },
    {
      title: 'Documents',
      description: '3 permit applications require',
      priority: 'NEW',
      type: 'docs',
      icon: '📄'
    }
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDays = getDaysInMonth(year, month - 1);
      days.push(
        <div key={`empty-${i}`} style={styles.calendarDay}>
          <span style={{...styles.dayNumber, color: '#CBD5E0'}}>{prevMonthDays - firstDayOfMonth + i + 1}</span>
        </div>
      );
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isHighlighted = day === 23;
      days.push(
        <div key={`day-${day}`} style={{
          ...styles.calendarDay,
          ...(isHighlighted ? styles.highlightedDay : {})
        }}>
          <span style={styles.dayNumber}>{day}</span>
        </div>
      );
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} style={styles.calendarDay}>
          <span style={{...styles.dayNumber, color: '#CBD5E0'}}>{i}</span>
        </div>
      );
    }
    
    return days;
  };

  const renderGanttTimeline = () => {
    const months = ['March 2025', 'April 2025', 'May 2025', 'June 2025', 'July 2025', 'August 2025', 'September 2025'];
    
    return (
      <div style={styles.ganttTimeline}>
        {months.map((month, index) => (
          <div key={index} style={styles.ganttMonth}>
            {month}
          </div>
        ))}
      </div>
    );
  };

  const renderGanttTasks = () => {
    return (
      <div style={styles.ganttTasksContainer}>
        {ganttTasks.map(task => {
          const startDate = new Date(task.startDate);
          const endDate = new Date(task.endDate);
          const startMonth = startDate.getMonth();
          const endMonth = endDate.getMonth();
          
          const left = ((startMonth - 2) * 100 / 7) + ((startDate.getDate() - 1) * 100 / (7 * 30));
          const width = ((endMonth - startMonth) * 100 / 7) + ((endDate.getDate() - startDate.getDate()) * 100 / (7 * 30));
          
          return (
            <div key={task.id} style={styles.ganttTaskRow}>
              <div style={styles.ganttTaskInfo}>
                <div style={styles.taskCheckbox}>
                  <input type="checkbox" checked={task.status === 'Completed'} readOnly />
                </div>
                <div style={styles.taskDetails}>
                  <div style={styles.taskName}>{task.name}</div>
                  <div style={styles.taskMeta}>{task.details}</div>
                </div>
                <div style={styles.taskAssignee}>{task.assignee}</div>
              </div>
              <div style={styles.ganttTaskTimeline}>
                <div 
                  style={{ 
                    ...styles.ganttTaskBar,
                    left: `${left}%`, 
                    width: `${width}%`,
                    backgroundColor: task.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const styles = {
    container: {
      backgroundColor: '#F7F9FC',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      backgroundColor: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
    backgroundColor:" #FFF8E6",
    border:" 1px solid #FFE4B5"

    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#8B5CF6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    logoText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1A202C'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    statIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px'
    },
    statContent: {
      flex: 1
    },
    statTitle: {
      fontSize: '13px',
      color: '#718096',
      marginBottom: '4px',
      fontWeight: '500'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1A202C'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1A202C',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cardSubtitle: {
      fontSize: '13px',
      color: '#718096',
      marginTop: '4px'
    },
    jobItem: {
      marginBottom: '20px'
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    jobName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1A202C',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    jobIcon: {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      display: 'inline-block'
    },
    jobPercentage: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1A202C'
    },
    progressBar: {
      height: '8px',
      backgroundColor: '#E2E8F0',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    todoItem: {
      padding: '16px',
      backgroundColor: '#FFFBEB',
      borderRadius: '8px',
      marginBottom: '12px',
      border: '1px solid #FEF3C7'
    },
    todoHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '8px'
    },
    todoTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1A202C',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    todoIcon: {
      fontSize: '18px'
    },
    priorityBadge: {
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      backgroundColor: '#FEE2E2',
      color: '#DC2626'
    },
    todoTime: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '8px'
    },
    todoDescription: {
      fontSize: '13px',
      color: '#4A5568',
      marginBottom: '12px'
    },
    todoFooter: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    avatar: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '11px',
      fontWeight: '600'
    },
    assigneeName: {
      fontSize: '13px',
      color: '#4A5568'
    },
    calendarContainer: {
      marginTop: '16px'
    },
    calendarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    calendarNav: {
      display: 'flex',
      gap: '8px'
    },
    navButton: {
      width: '32px',
      height: '32px',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      backgroundColor: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      color: '#4A5568'
    },
    weekDays: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '4px',
      marginBottom: '8px'
    },
    weekDay: {
      textAlign: 'center',
      fontSize: '12px',
      color: '#718096',
      fontWeight: '600',
      padding: '8px 0'
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '4px'
    },
    calendarDay: {
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    dayNumber: {
      fontSize: '13px',
      fontWeight: '500',
      color: '#1A202C'
    },
    highlightedDay: {
      backgroundColor: '#8B5CF6'
    },
    ganttSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    ganttHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    viewToggle: {
      display: 'flex',
      gap: '4px',
      backgroundColor: '#F7F9FC',
      padding: '4px',
      borderRadius: '8px'
    },
    viewButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      color: '#718096',
      transition: 'all 0.2s'
    },
    activeViewButton: {
      backgroundColor: 'white',
      color: '#1A202C',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    ganttTimeline: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      borderBottom: '1px solid #E2E8F0',
      marginBottom: '16px',
      paddingBottom: '12px'
    },
    ganttMonth: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#718096',
      textAlign: 'center'
    },
    ganttTasksContainer: {
      marginTop: '16px'
    },
    ganttTaskRow: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '16px',
      marginBottom: '16px',
      alignItems: 'center'
    },
    ganttTaskInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    taskCheckbox: {
      width: '18px',
      height: '18px'
    },
    taskDetails: {
      flex: 1
    },
    taskName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1A202C'
    },
    taskMeta: {
      fontSize: '12px',
      color: '#718096',
      marginTop: '2px'
    },
    taskAssignee: {
      fontSize: '12px',
      color: '#718096'
    },
    ganttTaskTimeline: {
      position: 'relative',
      height: '32px',
      backgroundColor: '#F7F9FC',
      borderRadius: '6px'
    },
    ganttTaskBar: {
      position: 'absolute',
      height: '24px',
      top: '4px',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '24px'
    },
    insightItem: {
      display: 'flex',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#F7F9FC',
      borderRadius: '8px',
      marginBottom: '12px',
      alignItems: 'start'
    },
    insightIcon: {
      fontSize: '24px'
    },
    insightContent: {
      flex: 1
    },
    insightHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    },
    insightTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1A202C'
    },
    insightBadge: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: '600'
    },
    insightDescription: {
      fontSize: '13px',
      color: '#4A5568'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    primaryButton: {
      backgroundColor: '#FCD34D',
      color: '#1A202C'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#718096',
      border: '1px solid #E2E8F0'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>📊</div>
          <div style={styles.logoText}>CEO</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{
              ...styles.statIcon,
              backgroundColor: stat.bgColor,
              color: stat.iconColor
            }}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <div style={styles.statTitle}>{stat.title}</div>
              <div style={styles.statValue}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Recent Jobs */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>
                <span>⏱️</span> Recent Jobs
              </div>
              <div style={styles.cardSubtitle}>Track project progress</div>
            </div>
            <span style={{fontSize: '13px', color: '#718096'}}>Apr 25</span>
          </div>
          <div>
            {recentJobs.map((job, index) => (
              <div key={index} style={styles.jobItem}>
                <div style={styles.jobHeader}>
                  <div style={styles.jobName}>
                    <span style={{...styles.jobIcon, backgroundColor: job.color}}></span>
                    {job.name}
                  </div>
                  <div style={styles.jobPercentage}>{job.progress}%</div>
                </div>
                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    width: `${job.progress}%`,
                    backgroundColor: job.color
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* To-Do List */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>
                <span>🏠</span> To Do List
              </div>
              <div style={styles.cardSubtitle}>Critical tasks requiring attention</div>
            </div>
            <div style={{display: 'flex', gap: '8px'}}>
              <button style={{...styles.button, ...styles.secondaryButton}}>View All</button>
              <button style={{...styles.button, ...styles.primaryButton}}>Add New</button>
            </div>
          </div>
          <div style={{marginBottom: '16px'}}>
            <input 
              type="text" 
              placeholder="🔍 Search" 
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
            <button style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #FCD34D',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>Today</button>
            <button style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #FCD34D',
              borderRadius: '8px',
              backgroundColor: '#FFFBEB',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>Week</button>
          </div>
          <div>
            {todoList.map((todo, index) => (
              <div key={index} style={styles.todoItem}>
                <div style={styles.todoHeader}>
                  <div style={styles.todoTitle}>
                    <span style={styles.todoIcon}>🏢</span>
                    {todo.title}
                  </div>
                  <div style={styles.priorityBadge}>{todo.priority}</div>
                </div>
                <div style={styles.todoTime}>{todo.time}</div>
                <div style={styles.todoDescription}>{todo.description}</div>
                <div style={styles.todoFooter}>
                  <div style={{
                    ...styles.avatar,
                    backgroundColor: todo.avatarColor
                  }}>{todo.avatar}</div>
                  <div style={styles.assigneeName}>{todo.assignee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div style={styles.card}>
          <div>
            <div style={styles.cardTitle}>
              <span>📅</span> September 2025
            </div>
            <div style={styles.cardSubtitle}>Project schedule overview</div>
          </div>
          <div style={styles.calendarContainer}>
            <div style={styles.calendarHeader}>
              <div></div>
              <div style={styles.calendarNav}>
                <button 
                  style={styles.navButton}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                >
                  &lt;
                </button>
                <button 
                  style={styles.navButton}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                >
                  &gt;
                </button>
              </div>
            </div>
            <div style={styles.weekDays}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={styles.weekDay}>{day}</div>
              ))}
            </div>
            <div style={styles.calendarGrid}>
              {renderCalendar()}
            </div>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div style={styles.ganttSection}>
        <div style={styles.ganttHeader}>
          <div>
            <h3 style={{margin: 0, fontSize: '18px', fontWeight: '600'}}>Tasks</h3>
          </div>
          <div style={styles.viewToggle}>
            <button 
              style={{
                ...styles.viewButton,
                ...(ganttView === 'Day' ? styles.activeViewButton : {})
              }}
              onClick={() => setGanttView('Day')}
            >
              Day
            </button>
            <button 
              style={{
                ...styles.viewButton,
                ...(ganttView === 'Week' ? styles.activeViewButton : {})
              }}
              onClick={() => setGanttView('Week')}
            >
              Week
            </button>
            <button 
              style={{
                ...styles.viewButton,
                ...(ganttView === 'Month' ? styles.activeViewButton : {})
              }}
              onClick={() => setGanttView('Month')}
            >
              Month
            </button>
          </div>
        </div>
        {renderGanttTimeline()}
        {renderGanttTasks()}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #E2E8F0'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '14px', color: '#718096', fontWeight: '500'}}>Project Progress:</span>
            <div style={{width: '120px', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden'}}>
              <div style={{width: '25%', height: '100%', backgroundColor: '#3498DB'}}></div>
            </div>
            <span style={{fontSize: '14px', fontWeight: '600'}}>25%</span>
          </div>
          <div style={{fontSize: '13px', color: '#718096'}}>
            Timeline: Mar 1 - July 30, 2025
          </div>
          <div style={{fontSize: '13px', color: '#DC2626', fontWeight: '500'}}>
            • Critical Path
          </div>
          <div style={{display: 'flex', gap: '16px', marginLeft: 'auto', fontSize: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span style={{width: '12px', height: '12px', backgroundColor: '#2ECC71', borderRadius: '2px', display: 'inline-block'}}></span>
              <span style={{color: '#718096'}}>Completed (3)</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span style={{width: '12px', height: '12px', backgroundColor: '#3498DB', borderRadius: '2px', display: 'inline-block'}}></span>
              <span style={{color: '#718096'}}>In Progress (5)</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span style={{width: '12px', height: '12px', backgroundColor: '#E67E22', borderRadius: '2px', display: 'inline-block'}}></span>
              <span style={{color: '#718096'}}>At Risk (2)</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span style={{width: '12px', height: '12px', backgroundColor: '#95A5A6', borderRadius: '2px', display: 'inline-block'}}></span>
              <span style={{color: '#718096'}}>Not Started (15)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Information and AI Insights */}
      <div style={styles.bottomGrid}>
        {/* Client Information */}
        <div style={styles.card}>
          <div style={{marginBottom: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={styles.cardTitle}>
                <span>💡</span> Client Information
              </div>
              <button style={{
                padding: '6px 12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#3498DB',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>View All</button>
            </div>
          </div>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <div style={{
              flex: '1 1 calc(50% - 6px)',
              minWidth: '150px',
              padding: '16px',
              backgroundColor: '#F7F9FC',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '13px', color: '#718096', marginBottom: '4px'}}>Sales Deposit</div>
            </div>
            <div style={{
              flex: '1 1 calc(50% - 6px)',
              minWidth: '150px',
              padding: '16px',
              backgroundColor: '#F7F9FC',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '13px', color: '#718096', marginBottom: '4px'}}>Client Name</div>
            </div>
            <div style={{
              flex: '1 1 calc(50% - 6px)',
              minWidth: '150px',
              padding: '16px',
              backgroundColor: '#F7F9FC',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '13px', color: '#718096', marginBottom: '4px'}}>Procurement</div>
            </div>
            <div style={{
              flex: '1 1 calc(50% - 6px)',
              minWidth: '150px',
              padding: '16px',
              backgroundColor: '#F7F9FC',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '13px', color: '#718096', marginBottom: '4px'}}>Title 4</div>
            </div>
            <div style={{
              flex: '1 1 calc(50% - 6px)',
              minWidth: '150px',
              padding: '16px',
              backgroundColor: '#F7F9FC',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '13px', color: '#718096', marginBottom: '4px'}}>Title 5</div>
            </div>
            <div style={{
              flex: '1 1 calc(50% - 6px)',
              minWidth: '150px',
              padding: '16px',
              backgroundColor: '#F7F9FC',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '13px', color: '#718096', marginBottom: '4px'}}>Title 6</div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div style={styles.card}>
          <div style={{marginBottom: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={styles.cardTitle}>
                <span>💡</span> AI Insights & Recommendations
              </div>
              <button style={{
                padding: '6px 12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#3498DB',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>View All</button>
            </div>
          </div>
          <div>
            {aiInsights.map((insight, index) => (
              <div key={index} style={styles.insightItem}>
                <div style={styles.insightIcon}>{insight.icon}</div>
                <div style={styles.insightContent}>
                  <div style={styles.insightHeader}>
                    <div style={styles.insightTitle}>{insight.title}</div>
                    <div style={{
                      ...styles.insightBadge,
                      backgroundColor: insight.priority === 'HIGH' ? '#FEE2E2' : insight.priority === 'MEDIUM' ? '#FEF3C7' : '#DBEAFE',
                      color: insight.priority === 'HIGH' ? '#DC2626' : insight.priority === 'MEDIUM' ? '#D97706' : '#2563EB'
                    }}>
                      {insight.priority}
                    </div>
                  </div>
                  <div style={styles.insightDescription}>{insight.description}</div>
                </div>
                <button style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: insight.priority === 'HIGH' ? '#FEE2E2' : insight.priority === 'MEDIUM' ? '#FEF3C7' : '#DBEAFE',
                  color: insight.priority === 'HIGH' ? '#DC2626' : insight.priority === 'MEDIUM' ? '#D97706' : '#2563EB',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  {insight.priority === 'HIGH' ? 'View Details' : insight.priority === 'MEDIUM' ? 'Process' : 'Review'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoDashboard;