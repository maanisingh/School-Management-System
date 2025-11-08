import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  ProgressBar, 
  Button, 
  Form, 
  InputGroup, 
  Dropdown,
  Badge,
  Accordion,
  Modal,
  Alert,
  Pagination
} from 'react-bootstrap';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';

const StudentMySubjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [expandedSubjects, setExpandedSubjects] = useState(new Set());
  const itemsPerPage = 5;

  // Sample data for subjects
  const [subjectsData, setSubjectsData] = useState([
    { id: 1, name: 'Mathematics', teacher: 'Mr. R. Mehta', marks: 95, grade: 'A+', attendance: 98, remarks: 'Excellent', type: 'core', term: 'Term 1', topics: 'Algebra, Geometry, Statistics', assignments: '5/6', exams: 2, nextTest: '15 Nov 2025' },
    { id: 2, name: 'English', teacher: 'Mrs. P. Sharma', marks: 78, grade: 'B+', attendance: 90, remarks: 'Improve grammar', type: 'core', term: 'Term 1', topics: 'Literature, Writing, Grammar', assignments: '4/5', exams: 2, nextTest: '18 Nov 2025' },
    { id: 3, name: 'Science', teacher: 'Mr. T. Kumar', marks: 88, grade: 'A', attendance: 95, remarks: 'Very Good', type: 'core', term: 'Term 1', topics: 'Physics, Chemistry, Biology', assignments: '6/6', exams: 2, nextTest: '20 Nov 2025' },
    { id: 4, name: 'History', teacher: 'Ms. N. Singh', marks: 64, grade: 'C', attendance: 85, remarks: 'Needs attention', type: 'core', term: 'Term 1', topics: 'World History, Civics', assignments: '3/5', exams: 2, nextTest: '22 Nov 2025' },
    { id: 5, name: 'Computer Science', teacher: 'Mr. A. Patel', marks: 92, grade: 'A+', attendance: 96, remarks: 'Outstanding', type: 'elective', term: 'Term 1', topics: 'Programming, Algorithms', assignments: '5/5', exams: 2, nextTest: '25 Nov 2025' },
    { id: 6, name: 'Geography', teacher: 'Mrs. S. Gupta', marks: 76, grade: 'B', attendance: 92, remarks: 'Good', type: 'core', term: 'Term 2', topics: 'Physical Geography, Maps', assignments: '4/5', exams: 1, nextTest: '28 Nov 2025' },
    { id: 7, name: 'Physical Education', teacher: 'Mr. D. Singh', marks: 85, grade: 'A', attendance: 94, remarks: 'Excellent', type: 'elective', term: 'Term 2', topics: 'Sports, Fitness', assignments: '5/5', exams: 1, nextTest: '30 Nov 2025' },
    { id: 8, name: 'Economics', teacher: 'Mrs. K. Verma', marks: 70, grade: 'B-', attendance: 88, remarks: 'Can improve', type: 'elective', term: 'Term 2', topics: 'Microeconomics, Macroeconomics', assignments: '3/4', exams: 1, nextTest: '2 Dec 2025' }
  ]);

  // Sample data for resources
  const [resourcesData, setResourcesData] = useState([
    { id: 1, type: 'Notes', title: 'Algebra Formulas', uploadedOn: '5 Nov 2025', subject: 'Mathematics', url: '#', size: '2.3 MB' },
    { id: 2, type: 'Practice Test', title: 'Geometry Quiz', uploadedOn: '2 Nov 2025', subject: 'Mathematics', url: '#', size: '1.5 MB' },
    { id: 3, type: 'PDF', title: 'Trigonometry Guide', uploadedOn: '30 Oct 2025', subject: 'Mathematics', url: '#', size: '4.1 MB' },
    { id: 4, type: 'Video', title: 'Chemistry Lab Demo', uploadedOn: '28 Oct 2025', subject: 'Science', url: '#', size: '125 MB' },
    { id: 5, type: 'Notes', title: 'World War II Summary', uploadedOn: '25 Oct 2025', subject: 'History', url: '#', size: '1.8 MB' },
    { id: 6, type: 'PDF', title: 'Python Programming Basics', uploadedOn: '22 Oct 2025', subject: 'Computer Science', url: '#', size: '3.2 MB' }
  ]);

  // Calculate summary statistics
  const totalSubjects = subjectsData.length;
  const averageMarks = Math.round(subjectsData.reduce((sum, subject) => sum + subject.marks, 0) / totalSubjects);
  const highestMark = Math.max(...subjectsData.map(subject => subject.marks));
  const highestMarkSubject = subjectsData.find(subject => subject.marks === highestMark)?.name || '';
  const lowestMark = Math.min(...subjectsData.map(subject => subject.marks));
  const lowestMarkSubject = subjectsData.find(subject => subject.marks === lowestMark)?.name || '';

  // Filter and sort subjects
  const filteredSubjects = subjectsData.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         subject.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTerm = filterTerm === 'all' || subject.term === filterTerm;
    const matchesType = filterType === 'all' || subject.type === filterType;
    return matchesSearch && matchesTerm && matchesType;
  });

  // Sorting function
  const sortedSubjects = React.useMemo(() => {
    let sortableSubjects = [...filteredSubjects];
    if (sortConfig.key !== null) {
      sortableSubjects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableSubjects;
  }, [filteredSubjects, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSubjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSubjects.length / itemsPerPage);

  // Sample data for charts
  const barChartData = subjectsData.map(subject => ({
    name: subject.name,
    marks: subject.marks
  }));

  const gradeDistribution = [
    { name: 'A+', value: 2, color: '#7e3af2' },
    { name: 'A', value: 2, color: '#8b5cf6' },
    { name: 'B+', value: 1, color: '#a78bfa' },
    { name: 'B', value: 1, color: '#c4b5fd' },
    { name: 'B-', value: 1, color: '#ddd6fe' },
    { name: 'C', value: 1, color: '#ede9fe' }
  ];

  const trendData = [
    { term: 'Term 1', average: 78 },
    { term: 'Term 2', average: 82 },
    { term: 'Term 3', average: 85 },
    { term: 'Term 4', average: 87 }
  ];

  const resourceIconMap = {
    'Notes': '📄',
    'Practice Test': '🧠',
    'PDF': '📘',
    'Video': '🎬'
  };

  // Alert function
  const showAlertMessage = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Button click handlers
  const handleSearch = () => {
    showAlertMessage(`Searching for: ${searchTerm || 'all subjects'}`, 'info');
  };

  const handleViewDetails = (subject) => {
    setSelectedSubject(subject);
    setActiveAccordionKey('0');
    setExpandedSubjects(new Set([subject.id]));
    showAlertMessage(`Viewing details for ${subject.name}`, 'info');
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
    showAlertMessage(`Opening ${resource.title}`, 'info');
  };

  const handleDownloadResource = (resource) => {
    showAlertMessage(`Downloading ${resource.title} (${resource.size})`, 'success');
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'term') {
      setFilterTerm(value);
    } else if (type === 'type') {
      setFilterType(value);
    }
    setCurrentPage(1);
    showAlertMessage(`Filter applied: ${value}`, 'info');
  };

  const handleExpandSubject = (subjectId) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  const handleExportData = () => {
    showAlertMessage('Exporting subject data to Excel...', 'success');
  };

  const handlePrintReport = () => {
    showAlertMessage('Preparing printable report...', 'info');
  };

  const handleContactTeacher = (teacher) => {
    showAlertMessage(`Opening contact form for ${teacher}`, 'info');
  };

  const handleViewAssignments = (subject) => {
    showAlertMessage(`Viewing assignments for ${subject.name}`, 'info');
  };

  const handleViewExams = (subject) => {
    showAlertMessage(`Viewing exam history for ${subject.name}`, 'info');
  };

  // Custom styles
  const containerStyle = {
    backgroundColor: '#e2e8f0',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px'
  };

  const headerStyle = {
    marginBottom: '30px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #cbd5e1'
  };

  // Uniform summary card style with fixed height
  const summaryCardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #cbd5e1',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    height: '180px', // Fixed height for all cards
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const buttonPrimaryStyle = {
    backgroundColor: '#7e3af2',
    border: 'none',
    color: 'white'
  };

  const buttonSecondaryStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #7e3af2',
    color: '#7e3af2'
  };

  const tableHeaderStyle = {
    backgroundColor: '#f8fafc',
    color: '#1e2a38',
    cursor: 'pointer'
  };

  const iconStyle = {
    fontSize: '24px',
    color: '#7e3af2'
  };

  return (
    <div style={containerStyle}>
      {/* Alert Component */}
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          onClose={() => setShowAlert(false)} 
          dismissible
          style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, minWidth: '300px' }}
        >
          {alertMessage}
        </Alert>
      )}

      {/* Header Section */}
      <div style={headerStyle}>
        <h1 style={{ color: '#1e2a38', marginBottom: '10px' }}>My Subjects</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>View your enrolled subjects and performance details.</p>
        
        <Row>
          <Col md={6} lg={8}>
            <InputGroup>
              <Form.Control
                placeholder="Search subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderColor: '#cbd5e1' }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="primary" style={buttonPrimaryStyle} onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} lg={2}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" style={buttonSecondaryStyle} className="w-100">
                {filterTerm === 'all' ? 'All Terms' : filterTerm}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilterChange('term', 'all')}>All Terms</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange('term', 'Term 1')}>Term 1</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange('term', 'Term 2')}>Term 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} lg={2}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" style={buttonSecondaryStyle} className="w-100">
                {filterType === 'all' ? 'All Types' : filterType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilterChange('type', 'all')}>All Types</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange('type', 'core')}>Core</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange('type', 'elective')}>Elective</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      {/* Subject Summary Cards - Uniform Height and Width */}
      <Row className="mb-4">
        <Col md={3} sm={6} className="d-flex">
          <div 
            style={summaryCardStyle} 
            onClick={() => showAlertMessage('Total Subjects: Click to view all subjects', 'info')}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            className="w-100"
          >
            <div style={iconStyle}>📘</div>
            <h3 style={{ color: '#1e2a38', margin: '10px 0' }}>{totalSubjects}</h3>
            <p style={{ color: '#64748b', margin: 0 }}>Total Subjects</p>
            <ProgressBar now={100} variant="primary" style={{ height: '5px', marginTop: '10px', width: '100%' }} />
          </div>
        </Col>
        <Col md={3} sm={6} className="d-flex">
          <div 
            style={summaryCardStyle}
            onClick={() => showAlertMessage(`Average Marks: ${averageMarks}% across all subjects`, 'info')}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            className="w-100"
          >
            <div style={iconStyle}>📊</div>
            <h3 style={{ color: '#1e2a38', margin: '10px 0' }}>{averageMarks}%</h3>
            <p style={{ color: '#64748b', margin: 0 }}>Average Marks</p>
            <ProgressBar now={averageMarks} variant="primary" style={{ height: '5px', marginTop: '10px', width: '100%' }} />
          </div>
        </Col>
        <Col md={3} sm={6} className="d-flex">
          <div 
            style={summaryCardStyle}
            onClick={() => showAlertMessage(`Highest Score: ${highestMark} in ${highestMarkSubject}`, 'success')}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            className="w-100"
          >
            <div style={iconStyle}>🥇</div>
            <h3 style={{ color: '#1e2a38', margin: '10px 0' }}>{highestMark}</h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Highest Marks</p>
            <p style={{ color: '#7e3af2', margin: '0', fontSize: '12px', fontWeight: 'bold' }}>({highestMarkSubject})</p>
            <ProgressBar now={highestMark} variant="success" style={{ height: '5px', marginTop: '10px', width: '100%' }} />
          </div>
        </Col>
        <Col md={3} sm={6} className="d-flex">
          <div 
            style={summaryCardStyle}
            onClick={() => showAlertMessage(`Lowest Score: ${lowestMark} in ${lowestMarkSubject}. Focus needed!`, 'warning')}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            className="w-100"
          >
            <div style={iconStyle}>⚠</div>
            <h3 style={{ color: '#1e2a38', margin: '10px 0' }}>{lowestMark}</h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Lowest Marks</p>
            <p style={{ color: '#dc3545', margin: '0', fontSize: '12px', fontWeight: 'bold' }}>({lowestMarkSubject})</p>
            <ProgressBar now={lowestMark} variant="warning" style={{ height: '5px', marginTop: '10px', width: '100%' }} />
          </div>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row className="mb-4">
        <Col>
          <Button variant="primary" style={buttonPrimaryStyle} className="me-2" onClick={handleExportData}>
            📊 Export Data
          </Button>
          <Button variant="outline-primary" style={buttonSecondaryStyle} className="me-2" onClick={handlePrintReport}>
            🖨 Print Report
          </Button>
          <Button variant="outline-primary" style={buttonSecondaryStyle} onClick={() => showAlertMessage('Opening performance analytics...', 'info')}>
            📈 Analytics
          </Button>
        </Col>
      </Row>

      {/* Subjects Table */}
      <Card style={cardStyle}>
        <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #cbd5e1', color: '#1e2a38' }}>
          <h5 className="mb-0">Subjects Overview</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th onClick={() => handleSort('name')}>Subject {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
                  <th onClick={() => handleSort('teacher')}>Teacher {sortConfig.key === 'teacher' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
                  <th onClick={() => handleSort('marks')}>Marks {sortConfig.key === 'marks' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
                  <th onClick={() => handleSort('grade')}>Grade {sortConfig.key === 'grade' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
                  <th onClick={() => handleSort('attendance')}>Attendance {sortConfig.key === 'attendance' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(subject => (
                  <tr key={subject.id}>
                    <td style={{ color: '#1e2a38' }}>
                      <Button 
                        variant="link" 
                        style={{ color: '#7e3af2', padding: 0, textDecoration: 'none' }}
                        onClick={() => handleViewDetails(subject)}
                      >
                        {subject.name}
                      </Button>
                    </td>
                    <td style={{ color: '#1e2a38' }}>
                      <Button 
                        variant="link" 
                        style={{ color: '#7e3af2', padding: 0, textDecoration: 'none' }}
                        onClick={() => handleContactTeacher(subject.teacher)}
                      >
                        {subject.teacher}
                      </Button>
                    </td>
                    <td style={{ color: '#1e2a38' }}>{subject.marks}</td>
                    <td>
                      <Badge 
                        bg={
                          subject.grade === 'A+' ? 'primary' :
                          subject.grade === 'A' ? 'primary' :
                          subject.grade === 'B+' ? 'info' :
                          subject.grade === 'B' ? 'info' :
                          subject.grade === 'B-' ? 'warning' :
                          'secondary'
                        }
                      >
                        {subject.grade}
                      </Badge>
                    </td>
                    <td style={{ color: '#1e2a38' }}>{subject.attendance}%</td>
                    <td style={{ color: '#1e2a38' }}>{subject.remarks}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        style={buttonSecondaryStyle}
                        className="me-1"
                        onClick={() => handleViewDetails(subject)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="sm"
                        style={{ backgroundColor: 'transparent', border: '1px solid #0dcaf0', color: '#0dcaf0' }}
                        className="me-1"
                        onClick={() => handleViewAssignments(subject)}
                      >
                        Assignments
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        style={{ backgroundColor: 'transparent', border: '1px solid #198754', color: '#198754' }}
                        onClick={() => handleViewExams(subject)}
                      >
                        Exams
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.Prev 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Performance Charts */}
      <Row className="mb-4">
        <Col md={6}>
          <Card style={cardStyle}>
            <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #cbd5e1', color: '#1e2a38' }}>
              <h5 className="mb-0">Subject Performance</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="marks" fill="#7e3af2" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={cardStyle}>
            <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #cbd5e1', color: '#1e2a38' }}>
              <h5 className="mb-0">Grade Distribution</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card style={cardStyle}>
            <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #cbd5e1', color: '#1e2a38' }}>
              <h5 className="mb-0">Performance Trend</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke="#7e3af2" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Subject Details Accordion */}
      <Card style={cardStyle}>
        <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #cbd5e1', color: '#1e2a38' }}>
          <h5 className="mb-0">Subject Details</h5>
        </Card.Header>
        <Card.Body>
          <Accordion activeKey={activeAccordionKey} onSelect={(key) => setActiveAccordionKey(key)}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {selectedSubject ? selectedSubject.name : 'Select a subject to view details'}
              </Accordion.Header>
              <Accordion.Body>
                {selectedSubject ? (
                  <div>
                    <Row>
                      <Col md={6}>
                        <h5 style={{ color: '#1e2a38' }}>Subject Information</h5>
                        <p><strong>Subject Name:</strong> {selectedSubject.name}</p>
                        <p><strong>Teacher:</strong> 
                          <Button 
                            variant="link" 
                            style={{ color: '#7e3af2', padding: 0, marginLeft: '10px' }}
                            onClick={() => handleContactTeacher(selectedSubject.teacher)}
                          >
                            {selectedSubject.teacher}
                          </Button>
                        </p>
                        <p><strong>Marks:</strong> {selectedSubject.marks}%</p>
                        <p><strong>Grade:</strong> 
                          <Badge 
                            bg={
                              selectedSubject.grade === 'A+' ? 'primary' :
                              selectedSubject.grade === 'A' ? 'primary' :
                              selectedSubject.grade === 'B+' ? 'info' :
                              selectedSubject.grade === 'B' ? 'info' :
                              selectedSubject.grade === 'B-' ? 'warning' :
                              'secondary'
                            }
                            className="ms-2"
                          >
                            {selectedSubject.grade}
                          </Badge>
                        </p>
                        <p><strong>Attendance:</strong> {selectedSubject.attendance}%</p>
                        <p><strong>Remarks:</strong> {selectedSubject.remarks}</p>
                      </Col>
                      <Col md={6}>
                        <h5 style={{ color: '#1e2a38' }}>Additional Information</h5>
                        <p><strong>Topics Covered:</strong> {selectedSubject.topics}</p>
                        <p><strong>Assignments:</strong> 
                          <Button 
                            variant="link" 
                            style={{ color: '#7e3af2', padding: 0, marginLeft: '10px' }}
                            onClick={() => handleViewAssignments(selectedSubject)}
                          >
                            {selectedSubject.assignments} completed
                          </Button>
                        </p>
                        <p><strong>Exams:</strong> 
                          <Button 
                            variant="link" 
                            style={{ color: '#7e3af2', padding: 0, marginLeft: '10px' }}
                            onClick={() => handleViewExams(selectedSubject)}
                          >
                            {selectedSubject.exams} attempted
                          </Button>
                        </p>
                        <p><strong>Next Test Date:</strong> {selectedSubject.nextTest}</p>
                        <p><strong>Performance Comment:</strong> Excellent consistency.</p>
                        
                        <div className="mt-3">
                          <Button variant="primary" style={buttonPrimaryStyle} className="me-2">
                            📚 Study Materials
                          </Button>
                          <Button variant="outline-primary" style={buttonSecondaryStyle} className="me-2">
                            📝 Practice Tests
                          </Button>
                          <Button variant="outline-primary" style={buttonSecondaryStyle}>
                            💬 Ask Doubt
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <p>Please select a subject from the table above to view details.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      {/* Resources Section */}
      <Card style={cardStyle}>
        <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #cbd5e1', color: '#1e2a38' }}>
          <h5 className="mb-0">Learning Resources</h5>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table hover>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Uploaded On</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resourcesData.map(resource => (
                  <tr key={resource.id}>
                    <td style={{ color: '#1e2a38' }}>
                      <span style={{ marginRight: '8px' }}>{resourceIconMap[resource.type]}</span>
                      {resource.type}
                    </td>
                    <td style={{ color: '#1e2a38' }}>
                      <Button 
                        variant="link" 
                        style={{ color: '#7e3af2', padding: 0, textDecoration: 'none' }}
                        onClick={() => handleViewResource(resource)}
                      >
                        {resource.title}
                      </Button>
                    </td>
                    <td style={{ color: '#1e2a38' }}>{resource.subject}</td>
                    <td style={{ color: '#1e2a38' }}>{resource.uploadedOn}</td>
                    <td style={{ color: '#1e2a38' }}>{resource.size}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        style={buttonSecondaryStyle}
                        className="me-1"
                        onClick={() => handleViewResource(resource)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        style={{ backgroundColor: 'transparent', border: '1px solid #198754', color: '#198754' }}
                        onClick={() => handleDownloadResource(resource)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Resource Modal */}
      <Modal show={showResourceModal} onHide={() => setShowResourceModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resource Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResource && (
            <div>
              <h4>{selectedResource.title}</h4>
              <p><strong>Type:</strong> {selectedResource.type}</p>
              <p><strong>Subject:</strong> {selectedResource.subject}</p>
              <p><strong>Uploaded On:</strong> {selectedResource.uploadedOn}</p>
              <p><strong>Size:</strong> {selectedResource.size}</p>
              <hr />
              <div className="text-center">
                <div style={{ fontSize: '48px', margin: '20px 0' }}>
                  {resourceIconMap[selectedResource.type]}
                </div>
                <p>Resource preview would appear here</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResourceModal(false)}>
            Close
          </Button>
          <Button variant="primary" style={buttonPrimaryStyle} onClick={() => handleDownloadResource(selectedResource)}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentMySubjects;