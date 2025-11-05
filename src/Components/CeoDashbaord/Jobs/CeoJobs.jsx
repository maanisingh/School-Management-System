import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CeoJobs.css';

const CeoJobs = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: "South Shore Estate - Phase 2",
      manager: "Sarah Johnson",
      client: "Chen Family",
      progress: 65,
      budgetUsed: 552500,
      budgetTotal: 850000,
      deadline: "03/12/2025",
      status: "IN PROGRESS"
    },
    {
      id: 2,
      title: "South Shore Estate - Phase 2",
      manager: "Sarah Johnson",
      client: "Chen Family",
      progress: 65,
      budgetUsed: 552500,
      budgetTotal: 850000,
      deadline: "03/12/2025",
      status: "Planning"
    },
    {
  id: 3,
  title: "South Shore Estate - Phase 2",
  manager: "Sarah Johnson",
  client: "Chen Family",
  progress: 65,
  budgetUsed: 552500,
  budgetTotal: 850000,
  deadline: "03/12/2025",
  status: "IN PROGRESS"
},
{
  id: 4,
  title: "Green Valley Apartments",
  manager: "Michael Roberts",
  client: "UrbanBuild Co.",
  progress: 90,
  budgetUsed: 720000,
  budgetTotal: 800000,
  deadline: "25/11/2025",
  status: "NEAR COMPLETION"
},
{
  id: 5,
  title: "Sunset Villas - Block A",
  manager: "Emily Davis",
  client: "Henderson Group",
  progress: 35,
  budgetUsed: 210000,
  budgetTotal: 600000,
  deadline: "15/01/2026",
  status: "IN DESIGN"
}

  ]);

  const jobStats = {
    activeProjects: 18,
    completed: 105,
    inPlanning: 3,
    upcomingDeadlines: 8
  };

  const aiInsights = [
    {
      type: "Quality Risk",
      level: "HIGH",
      description: "Weather conditions may impact concrete",
      action: "View Details",
      icon: "⚠️",
      color: "danger"
    },
    {
      type: "Deposits",
      level: "MEDIUM",
      description: "$245k in client deposits expected",
      action: "Process",
      icon: "💰",
      color: "success"
    },
    {
      type: "Documents",
      level: "NEW",
      description: "3 permit applications require",
      action: "Review",
      icon: "📄",
      color: "primary"
    }
  ];

  return (
    <div className="ceo-jobs-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <i className="bi bi-building"></i>
          </div>
          <h1 className="header-title">Organization Management</h1>
        </div>
        <i className="bi bi-chevron-down header-chevron"></i>
      </div>

      {/* Job Statistics */}
    <div className="job-statistics">
  <h2 className="section-title">Job Statistics</h2>
  <div className="stats-list">
    <div className="stat-row d-flex justify-content-between align-items-center">
      <span className="stat-label">Active Projects</span>
      <span className="stat-value text-end">{jobStats.activeProjects}</span>
    </div>
    <div className="stat-row d-flex justify-content-between align-items-center">
      <span className="stat-label">Completed</span>
      <span className="stat-value text-end">{jobStats.completed}</span>
    </div>
    <div className="stat-row d-flex justify-content-between align-items-center">
      <span className="stat-label">In Planning</span>
      <span className="stat-value text-end">{jobStats.inPlanning}</span>
    </div>
    <div className="stat-row d-flex justify-content-between align-items-center">
      <span className="stat-label">Upcoming Deadlines</span>
      <span className="stat-value text-end">{jobStats.upcomingDeadlines}</span>
    </div>
  </div>
</div>


      {/* Jobs Management Section */}
      <div className="jobs-management-section">
        <div className="section-header">
          <h2 className="section-title">Jobs Management & Setup</h2>
          <button className="btn-create-job">
            <i className="bi bi-plus-lg"></i> Create New Job
          </button>
        </div>

        {/* Job Cards */}
        {jobs.map((job, index) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div className="job-info">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-detail">Project Manager: {job.manager}</p>
                <p className="job-detail">Client: {job.client}</p>
              </div>
              <div className="job-actions">
                <button className="btn-download">Download Report</button>
                <button className={`btn-status ${job.status === "IN PROGRESS" ? "status-progress" : "status-planning"}`}>
                  {job.status}
                </button>
                <button className="btn-configure">
                  <i className="bi bi-gear"></i> Configure
                </button>
              </div>
            </div>

            <div className="job-metrics">
              <div className="metric-item progress-metric">
                <label className="metric-label">Progress</label>
                <div className="progress-bar-container">
                  <div className="progress-bar-custom">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="metric-item">
                <label className="metric-label">Budget Utilization</label>
                <p className="metric-value">${job.budgetUsed.toLocaleString()} / ${job.budgetTotal.toLocaleString()}</p>
                <p className="metric-subtext">{job.progress}% Used</p>
              </div>

              <div className="metric-item">
                <label className="metric-label">Deadline</label>
                <p className="metric-value">{job.deadline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Actions Section */}
      <div className="job-actions-section">
        <h2 className="section-title">Job Actions</h2>
        
        <div className="action-card">
          <div className="action-content">
            <i className="bi bi-plus-circle"></i>
            <span>New Project</span>
          </div>
        </div>

        <div className="action-card">
          <div className="action-content">
            <i className="bi bi-file-text"></i>
            <span>Reports</span>
          </div>
          <button className="btn-download-all">
            <i className="bi bi-download"></i> Download All Reports
          </button>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="ai-insights-section">
        <div className="insights-header">
          <div className="insights-title">
            <i className="bi bi-lightbulb"></i>
            <h2>AI Insights & Recommendations</h2>
          </div>
          <button className="btn-view-all">View All</button>
        </div>

        <div className="insights-grid">
          {aiInsights.map((insight, index) => (
            <div key={index} className={`insight-card insight-${insight.color}`}>
              <div className="insight-header">
                <div className="insight-type">
                  <span className="insight-icon">{insight.icon}</span>
                  <span className="insight-name">{insight.type}</span>
                </div>
                <span className={`insight-level level-${insight.color}`}>
                  {insight.level}
                </span>
              </div>
              <p className="insight-description">{insight.description}</p>
              <button className="btn-insight-action">{insight.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CeoJobs;