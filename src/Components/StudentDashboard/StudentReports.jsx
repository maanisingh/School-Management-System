import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Dropdown,
  Table,
  Alert,
  ProgressBar
} from 'react-bootstrap';

const StudentReports = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isGenerating, setIsGenerating] = useState(false);

  const performanceData = [
    { subject: 'Math', marks: 90, grade: 'A+' },
    { subject: 'English', marks: 78, grade: 'B+' },
    { subject: 'Science', marks: 85, grade: 'A' },
    { subject: 'History', marks: 70, grade: 'B' },
    { subject: 'Computer', marks: 95, grade: 'A+' }
  ];

  const showAlertMessage = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDownloadReport = () => {
    setIsGenerating(true);
    showAlertMessage('Generating report...', 'info');
    setTimeout(() => {
      setIsGenerating(false);
      showAlertMessage('Report downloaded successfully!', 'success');
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh' }}>
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          onClose={() => setShowAlert(false)} 
          dismissible
          style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}
        >
          {alertMessage}
        </Alert>
      )}

      <h2 style={{ marginBottom: '20px' }}>Academic Reports</h2>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={6} sm={12} className="mb-2">
          <Dropdown>
            <Dropdown.Toggle className="w-100" variant="secondary">
              {selectedTerm}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {['Term 1', 'Term 2', 'Term 3', 'Final Exam'].map(term => (
                <Dropdown.Item key={term} onClick={() => { setSelectedTerm(term); showAlertMessage(`Filter: ${term}`, 'info'); }}>
                  {term}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={6} sm={12} className="mb-2">
          <Dropdown>
            <Dropdown.Toggle className="w-100" variant="secondary">
              Academic Year {selectedYear}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {['2024-2025','2023-2024','2022-2023'].map(year => (
                <Dropdown.Item key={year} onClick={() => { setSelectedYear(year); showAlertMessage(`Filter: ${year}`, 'info'); }}>
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Report Summary */}
      <Card style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px' }}>
        <h5>Report Summary</h5>
        <Row>
          <Col md={6}><strong>Student Name:</strong> Ayanda Khanna</Col>
          <Col md={6}><strong>Student ID:</strong> STU-2025-015</Col>
          <Col md={6}><strong>Class / Grade:</strong> Grade 10 – A</Col>
          <Col md={6}><strong>Academic Year:</strong> 2024–2025</Col>
          <Col md={6}><strong>Average Score:</strong> 84%
            <ProgressBar now={84} style={{ height: '5px', marginTop: '5px' }} />
          </Col>
          <Col md={6}><strong>Rank in Class:</strong> 4 / 40
            <ProgressBar now={90} variant="info" style={{ height: '5px', marginTop: '5px' }} />
          </Col>
        </Row>
      </Card>

      {/* Subject-wise Performance Table */}
      <Card style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px' }}>
        <h5>Subject-wise Performance</h5>
        <Table striped hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.marks}%</td>
                <td>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    color: 'white',
                    backgroundColor:
                      item.grade === 'A+' ? '#7e3af2' :
                      item.grade === 'A' ? '#8b5cf6' :
                      item.grade === 'B+' ? '#a78bfa' :
                      '#c4b5fd'
                  }}>
                    {item.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Download Report */}
      <Card style={{ padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <h5>Download Report</h5>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleDownloadReport} 
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '📄 Download PDF'}
        </Button>
      </Card>
    </div>
  );
};

export default StudentReports;
