import React, { useState } from 'react';
import './ProjectManager.css'; 

// --- Mock Data: Old and Initial New Data ---
const mockTasks = [
    { id: 1, title: "Review electrical plans for Phase 2", project: "South Shore Estates", assigned: "Mike Chen", due: "15/01/2024", priority: "High", status: "In Progress" },
    { id: 2, title: "Schedule concrete pour for foundation", project: "Lakefront Custom", assigned: "Jane Doe", due: "20/12/2023", priority: "Urgent", status: "Open" },
    { id: 3, title: "Final structural sign-off", project: "Sunset Tower", assigned: "Team Lead", due: "05/11/2023", priority: "Medium", status: "Completed" },
    { id: 4, title: "Confirm material specs with supplier", project: "South Shore Estates", assigned: "Mike Chen", due: "25/01/2024", priority: "Low", status: "Open" },
];

const mockToDos = [
    { id: 1, title: "Foundation Inspection", time: "10:32 AM", project: "Sunview project site A", priority: "HIGH", icon: "🚨" },
    { id: 2, title: "Material Delivery", time: "9:15 AM", project: "Aspen Living project", priority: "HIGH", icon: "🚚" },
    { id: 3, title: "Client Walkthrough", time: "2:00 PM", project: "Pine Hills Phase 3", priority: "MED", icon: "🤝" },
    { id: 4, title: "Safety Audit", time: "3:30 PM", project: "All Sites", priority: "LOW", icon: "👷" },
];

const initialMockGanttData = [
    { title: "Planning Phase", status: "5 tasks • 2 weeks", assigned: "Sarah Johnson", color: "#4a86e8", dot: '•' },
    { title: "Requirements Gathering", status: "Completed", assigned: "Mike Chen", color: "#4caf50", dot: '•' },
    { title: "User Research", status: "In Progress", assigned: "Emma Wilson", color: "#2196f3", dot: '•' },
    { title: "Competitive Analysis", status: "At Risk", assigned: "David Park", color: "#ff9800", dot: '•' },
    { title: "Design Phase", status: "8 tasks • 3 weeks", assigned: "Lisa Rodriguez", color: "#9c27b0", dot: '•' },
    { title: "Wireframing", status: "Not Started", assigned: "Alex Turner", color: "#666666", dot: '•' },
    { title: "Visual Design", status: "Not Started", assigned: "Sophie Kim", color: "#f44336", dot: '•' },
];


// --- Helper Functions and Components ---

// Function to convert hex color to RGB (used for clear icon background)
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
};

const StatCard = ({ icon, label, value, iconColor }) => {
    // Background set using rgba(..., 0.1) for faint background, ensuring clear icon
    const rgb = iconColor.startsWith('#') ? hexToRgb(iconColor) : iconColor;
    const iconContainerStyle = { 
        backgroundColor: `rgba(${rgb}, 0.1)` 
    }; 
    const iconStyle = { color: iconColor }; 

    return (
        <div className="stat-card">
            <div className="icon-label-group">
                <div className="icon-wrapper-bg" style={iconContainerStyle}> 
                    <span className="icon-display" style={iconStyle}>{icon}</span>
                </div>
            </div>
            <p className="card-value">{value}</p>
            <span className="card-label">{label}</span> 
        </div>
    );
};


// 1. Left Section: Task Management
const TaskManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterProject, setFilterProject] = useState('All Projects');
    
    const filteredTasks = mockTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProject = filterProject === 'All Projects' || task.project === filterProject;
        return matchesSearch && matchesProject;
    });

    const projectOptions = ['All Projects', ...new Set(mockTasks.map(t => t.project))];

    const getTagClass = (priority) => {
        switch (priority) {
            case 'High': return 'high-tag';
            case 'Urgent': return 'urgent-tag';
            default: return 'low-tag';
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress': return 'in-progress';
            case 'Completed': return 'completed-status';
            default: return 'open-status';
        }
    };
    
    const handleAddTask = () => {
        alert("Add Task function is ready!");
    };


    return (
        <div className="task-management-panel panel">
            <h2 className="panel-title">Task Management</h2>
            
            {/* Search Bar */}
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Search Tasks..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>
            
            {/* Filter and Add Task Buttons */}
            <div className="action-row">
                <button className="filter-button">
                    <span className="filter-icon">▼</span> Filter
                </button>
                <select 
                    className="project-select"
                    value={filterProject}
                    onChange={(e) => setFilterProject(e.target.value)}
                >
                    {projectOptions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <button className="add-task-button" onClick={handleAddTask}>
                    + Add Task
                </button>
            </div>

            {/* Task List Items */}
            <div className="task-list">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <div key={task.id} className="task-list-item bordered-task">
                            <p className="task-title">{task.title}</p>
                            <p className="task-subtitle">{task.project}</p>
                            <p className="task-subtitle">Assigned to: {task.assigned}</p>
                            <div className="task-details">
                                <span className="task-due">Due: {task.due}</span>
                                <span className={`task-tag ${getTagClass(task.priority)}`}>{task.priority}</span>
                                <span className={`task-status ${getStatusClass(task.status)}`}>{task.status}</span>
                            </div>
                            <div className="task-actions">
                                <button>✏️</button>
                                <button>🗑️</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-tasks">No tasks found for "{searchTerm}" in {filterProject}.</p>
                )}
            </div>
        </div>
    );
};

// 2. Middle Section: To Do List
const ToDoList = () => {
    const [activeTab, setActiveTab] = useState('Today'); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(`Switched to tab: ${tab}`);
    };
    
    const handleAddNew = () => {
        alert("Add New To Do Item function is ready!");
    };


    return (
        <div className="todo-list-panel panel">
            <div className="todo-header">
                <h2 className="panel-title">To Do List</h2>
                <div className="todo-actions">
                    <span className="view-all">View All</span>
                    <button className="add-new-button" onClick={handleAddNew}>
                        Add New
                    </button>
                </div>
            </div>
            <p className="critical-tasks-text">Critical tasks requiring attention</p>
            
            {/* Search Bar */}
            <div className="search-box small-search">
                <input type="text" placeholder="Search" />
                <span className="search-icon">🔍</span>
            </div>

            {/* Today/Week Tabs */}
            <div className="time-tabs">
                <button 
                    className={`tab ${activeTab === 'Today' ? 'active-tab' : ''}`}
                    onClick={() => handleTabClick('Today')}
                >
                    Today
                </button>
                <button 
                    className={`tab ${activeTab === 'Week' ? 'active-tab' : ''}`}
                    onClick={() => handleTabClick('Week')}
                >
                    Week
                </button>
            </div>

            {/* To-Do Items */}
            <div className="todo-list">
                {mockToDos.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <span className="todo-icon">{todo.icon}</span>
                        <div className="todo-info">
                            <p className="todo-title">{todo.title}</p>
                            <p className="todo-subtitle">{todo.project}</p>
                        </div>
                        <div className="todo-meta">
                            <span className="todo-time">{todo.time}</span>
                            <span className="todo-tag high-tag-small">{todo.priority}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Right Section: Calendar/Schedule
const CalendarWidget = () => {
    // Current Date Logic
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); 

    const isToday = (year, month, day) => {
        return (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        );
    };

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const formatMonthYear = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const generateCalendarDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDayOfMonth = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const totalSlots = 35; 
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({ day: '', isCurrentMonth: false, isHighlight: false });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const highlight = isToday(year, month, day); 
            days.push({ day: day, isCurrentMonth: true, isHighlight: highlight });
        }
        
        while (days.length < totalSlots) {
            days.push({ day: '', isCurrentMonth: false, isHighlight: false });
        }

        return days.slice(0, totalSlots);
    };

    const days = generateCalendarDays(currentDate);

    return (
        <div className="calendar-panel panel">
            <div className="calendar-header">
                <span className="calendar-icon">📅</span>
                <span className="month-year">{formatMonthYear(currentDate)}</span>
                <span className="schedule-overview">Project schedule overview</span>
                <div className="nav-arrows">
                    <span className="arrow" onClick={handlePrevMonth}>{'<'}</span>
                    <span className="arrow" onClick={handleNextMonth}>{'>'}</span>
                </div>
            </div>
            
            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="day-name">{day}</div>
                ))}
                {days.map((day, index) => (
                    <div 
                        key={index} 
                        className={`day-number 
                            ${day.isHighlight ? 'highlight-day' : ''} 
                            ${day.isCurrentMonth ? '' : 'outside-month'}`
                        }
                    >
                        {day.day}
                    </div>
                ))}
            </div>
        </div>
    );
};


// 4. New Section: Gantt Chart Widget
const GanttChartWidget = () => {
    const [activeView, setActiveView] = useState('Day');
    // Gantt Task Data को State में बदलें ताकि वह अपडेट हो सके
    const [ganttTasks, setGanttTasks] = useState(initialMockGanttData); 

    // Functionality: Add Task to Gantt Chart
    const handleAddTask = () => {
        const taskTitle = prompt("Please Add a Naw Task:");
        
        if (taskTitle && taskTitle.trim() !== "") {
            const newTask = {
                title: taskTitle.trim(),
                status: "New Task • 1 day",
                assigned: "Unassigned",
                color: "#ffc107", // Yellow color for new tasks
                dot: '•'
            };

            // State को अपडेट करें, नए टास्क को लिस्ट के अंत में जोड़ें
            setGanttTasks(prevTasks => [...prevTasks, newTask]);
            alert(`टास्क '${taskTitle.trim()}' सफलतापूर्वक जोड़ दिया गया है।`);
        } else if (taskTitle !== null) {
            alert("टास्क का नाम खाली नहीं हो सकता।");
        }
    };

    const getGanttBarStyle = (index, color) => {
        // Simplified positioning logic to mimic the image
        let left, width;
        const totalInitial = initialMockGanttData.length;
        
        if (index < totalInitial) {
            // Positions for initial mock data
            switch(index) {
                case 0: left = '15%'; width = '10%'; break;
                case 1: left = '25%'; width = '3%'; break;
                case 2: left = '35%'; width = '10%'; break;
                case 3: left = '50%'; width = '12%'; break;
                case 4: left = '55%'; width = '18%'; break;
                case 5: left = '70%'; width = '20%'; break;
                case 6: left = '85%'; width = '10%'; break;
                default: left = '5%'; width = '5%';
            }
        } else {
             // Default bar position for newly added tasks
            // Position them slightly later and use a fixed width
            left = `${5 + (index - totalInitial) * 5}%`; // Example: 5%, 10%, 15%...
            width = '15%'; 
            color = '#ffc107'; 
        }
        
        // Special styling for the task 'Visual Design' (index 6)
        const isDiamond = index === 6;
        
        return {
            backgroundColor: isDiamond ? '#f44336' : color,
            left: left,
            width: width,
            borderRadius: isDiamond ? '0' : '4px',
            transform: isDiamond ? 'rotate(45deg) skew(7deg, 7deg)' : 'none', 
            height: isDiamond ? '18px' : '10px',
            margin: isDiamond ? '4px 0 0 0' : '8px 0',
            position: 'absolute',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: isDiamond ? 20 : 10
        };
    };

    return (
        <div className="gantt-chart-panel panel">
            {/* Header: Day/Week/Month Tabs and Task "+" */}
            <div className="gantt-header">
                <div className="gantt-tabs">
                    {['Day', 'Week', 'Month'].map(tab => (
                        <button 
                            key={tab} 
                            className={`gantt-tab ${activeView === tab ? 'active-gantt-tab' : ''}`}
                            onClick={() => setActiveView(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {/* Add Task onClick handler */}
                <div className="gantt-title-tasks" onClick={handleAddTask}>
                    Tasks <span className="add-task-icon">+</span>
                </div>
            </div>

            {/* Timeline Header (Months) */}
            <div className="gantt-timeline-header">
                <div className="gantt-timeline-dates">
                    {['March 2025', 'April 2025', 'May 2025', 'June 2025', 'July 2025', 'August 2025', 'September 2025'].map(month => (
                        <span key={month} className="gantt-month">{month}</span>
                    ))}
                </div>
            </div>

            {/* Gantt Body: Task List and Bars */}
            <div className="gantt-body">
                {/* Left Side: Task List */}
                <div className="gantt-task-list">
                    {ganttTasks.map((task, index) => (
                        <div key={index} className="gantt-task-item">
                            <span className="gantt-task-dot" style={{ backgroundColor: task.color }}>{task.dot}</span>
                            <div className="gantt-task-info">
                                <p className="gantt-task-title">{task.title}</p>
                                <p className="gantt-task-status">{task.status}</p>
                            </div>
                            <span className="gantt-task-assigned">{task.assigned}</span>
                        </div>
                    ))}
                </div>
                
                {/* Right Side: Timeline Bars */}
                <div className="gantt-timeline-bars">
                    {/* The days header from 10 to 30 (Simplified) */}
                    <div className="gantt-day-numbers">
                        {Array.from({ length: 21 }, (_, i) => 10 + i).map(day => (
                            <span key={day} className="gantt-day-num">{day}</span>
                        ))}
                    </div>
                    {/* Bar visualization area */}
                    <div className="gantt-bars-container">
                        {/* Red vertical line (Critical Path Line) */}
                        <div className="critical-path-line"></div> 
                        
                        {ganttTasks.map((task, index) => (
                            <div key={index} className="gantt-bar-row">
                                <div className="gantt-bar" style={getGanttBarStyle(index, task.color)}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer: Progress and Legend */}
            <div className="gantt-footer">
                <div className="gantt-progress-bar-container">
                    <div className="gantt-progress-bar-fill" style={{ width: '25%' }}></div>
                </div>
                <span className="gantt-progress-text">Project Progress: **25%**</span>
                <span className="gantt-timeline-text">Timeline: Mar 1 - July 30, 2025</span>
                <span className="gantt-legend-item critical-path-legend">Critical Path</span>
                <div className="gantt-legend-status">
                    <span className="gantt-legend-item completed-legend">Completed (3)</span>
                    <span className="gantt-legend-item in-progress-legend">In Progress (5)</span>
                    <span className="gantt-legend-item at-risk-legend">At Risk (2)</span>
                    <span className="gantt-legend-item not-started-legend">Not Started (15)</span>
                </div>
            </div>
        </div>
    );
};

// --- New Components: Client Info and AI Insights ---

// Helper component for the information cards
const InfoCard = ({ title, value, status, icon, iconColor, statusColor, actionText, onAction }) => {
    // Determine the CSS class for the status chip
    const getStatusClass = (status) => {
        if (!status) return '';
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === 'high' || lowerStatus === 'urgent') return 'high-tag';
        if (lowerStatus === 'medium') return 'medium-tag';
        if (lowerStatus === 'new') return 'new-tag';
        return '';
    };

    const statusClass = getStatusClass(status);

    // Style for the icon wrapper background 
    // hexToRgb function is available at the top.
    const rgb = iconColor && iconColor.startsWith('#') ? hexToRgb(iconColor) : iconColor;
    const iconContainerStyle = iconColor ? { 
        backgroundColor: `rgba(${rgb}, 0.1)` 
    } : {};
    const iconStyle = iconColor ? { color: iconColor } : {};
    
    // For the simple boxes in Client Information
    if (!icon) {
        return (
            <div className="info-box simple-card">
                {title}
            </div>
        );
    }

    // For AI Insights cards
    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            alert("Default action clicked!");
        }
    };

    return (
        <div className="ai-insight-card">
            <div className="insight-icon-group">
                <div className="icon-wrapper-bg" style={iconContainerStyle}> 
                    <span className="icon-display" style={iconStyle}>{icon}</span>
                </div>
                <span className={`insight-status-tag ${statusClass}`}>{status}</span>
            </div>
            <div className="insight-details">
                {value}
            </div>
            {actionText && (
                <button className="insight-action-button" onClick={handleAction}>
                    {actionText}
                </button>
            )}
        </div>
    );
};


// 5. New Section: Client Information
const ClientInfoSection = () => {
    // Mock data for the info boxes
    const clientInfoCards = [
        { title: "Sales Deposit" },
        { title: "Client Name" },
        { title: "Procurement" },
        { title: "Title 4" },
        { title: "Title 5" },
        { title: "Title 6" },
    ];

    return (
        <div className="client-info-panel panel">
            <div className="panel-header-row">
                <h2 className="panel-title-with-icon">
                    <span className="panel-icon-bg">💡</span> Client Information
                </h2>
                <span className="view-all">View All</span>
            </div>
            
            <div className="client-info-cards-grid">
                {clientInfoCards.map((card, index) => (
                    <InfoCard key={index} title={card.title} />
                ))}
            </div>
        </div>
    );
};

// 6. New Section: AI Insights & Recommendations
const AIInsightsSection = () => {
    const handleAction = (insight) => {
        alert(`${insight} action clicked!`);
    };

    // Mock data for AI Insight cards
    const aiInsightCards = [
        { 
            icon: '⚠️', 
            status: 'HIGH', 
            iconColor: '#ff7b63', // Reddish color
            value: 'Quality Risk. Weather conditions may impact concrete', 
            actionText: 'View Details',
            onAction: () => handleAction('Quality Risk')
        },
        { 
            icon: '💰', 
            status: 'MEDIUM', 
            iconColor: '#4caf50', // Green color
            value: '$245K in client deposits expected', 
            actionText: 'Process',
            onAction: () => handleAction('Deposits')
        },
        { 
            icon: '📄', 
            status: 'NEW', 
            iconColor: '#4a86e8', // Blue color
            value: '3 permit applications require', 
            actionText: 'Review',
            onAction: () => handleAction('Permit Applications')
        },
    ];

    return (
        <div className="ai-insights-panel panel">
             <div className="panel-header-row">
                <h2 className="panel-title-with-icon">
                    <span className="panel-icon-bg">💡</span> AI Insights & Recommendations
                </h2>
                <span className="view-all">View All</span>
            </div>
            
            <div className="ai-insights-cards-grid">
                {aiInsightCards.map((insight, index) => (
                    <InfoCard 
                        key={index}
                        icon={insight.icon}
                        status={insight.status}
                        iconColor={insight.iconColor}
                        value={insight.value}
                        actionText={insight.actionText}
                        onAction={insight.onAction}
                    />
                ))}
            </div>
        </div>
    );
};


// --- MAIN ProjectManager Component ---

const ProjectManager = () => {
  return (
    <div className="project-dashboard-container">
      {/* 1. Header Bar */}
      <div className="header-bar">
        <div className="project-selector">
          <span role="img" aria-label="project icon">📄</span> Project Management
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>

      {/* 2. Statistics Cards Grid (First Row) */}
      <div className="stats-grid">
        <StatCard icon="📋" label="Active To-Dos" value="23" iconColor="#4a86e8" />
        <StatCard icon="📜" label="Pending RFIs" value="8" iconColor="#ff7b63" />
        <StatCard icon="📅" label="Today's Task" value="12" iconColor="#4caf50" />
        <StatCard icon="✅" label="Completed" value="45" iconColor="#00c853" />
        <StatCard icon="⏱️" label="Milestones" value="5" iconColor="#9c27b0" />
        <StatCard icon="👥" label="Team Members" value="15" iconColor="#607d8b" />
      </div>

      {/* 3. Three-Column Content Section (Second Row) */}
      <div className="content-grid-3-col">
          <TaskManagement />
          <ToDoList />
          <CalendarWidget />
      </div>
      
      {/* 4. Gantt Chart Widget (Third Row) */}
      <GanttChartWidget />

      {/* 5. Client Information Section (NEW) */}
      <ClientInfoSection />

      {/* 6. AI Insights & Recommendations Section (NEW) */}
      <AIInsightsSection />

    </div>
  );
}

export default ProjectManager;