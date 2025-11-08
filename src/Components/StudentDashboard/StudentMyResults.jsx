import React, { useState } from 'react';
import { Card, Row, Col, Table, Dropdown } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const StudentMyResults = () => {
  const [selectedTerm, setSelectedTerm] = useState('all');

  const termPerformanceData = [
    { term: 'Term 1', percentage: 76 },
    { term: 'Term 2', percentage: 88 },
    { term: 'Term 3', percentage: 84 },
    { term: 'Final', percentage: 90 }
  ];

  const subjectMarksData = [
    { subject: 'Math', term1: 78, term2: 90, term3: 85, final: 92 },
    { subject: 'English', term1: 70, term2: 82, term3: 80, final: 85 },
    { subject: 'Science', term1: 75, term2: 88, term3: 85, final: 90 },
    { subject: 'History', term1: 65, term2: 78, term3: 72, final: 80 },
    { subject: 'Computer Science', term1: 85, term2: 92, term3: 88, final: 95 }
  ];

  const detailedMarksData = [
    { term: 'Term 1', subject: 'Math', marks: 78, grade: 'B+' },
    { term: 'Term 2', subject: 'Math', marks: 90, grade: 'A+' },
    { term: 'Term 3', subject: 'Math', marks: 85, grade: 'A' },
    { term: 'Final', subject: 'Math', marks: 92, grade: 'A+' }
    // Add other subjects similarly
  ];

  const gradeDistributionData = [
    { name: 'A+', value: 3, color: '#7e3af2' },
    { name: 'A', value: 2, color: '#8b5cf6' },
    { name: 'B+', value: 1, color: '#c4b5fd' },
    { name: 'B', value: 1, color: '#ddd6fe' }
  ];

  const filteredMarks = selectedTerm === 'all' ? detailedMarksData : detailedMarksData.filter(d => d.term === selectedTerm);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>My Results</h2>

      {/* Term Filter */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary">
          {selectedTerm === 'all' ? 'All Terms' : selectedTerm}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedTerm('all')}>All Terms</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedTerm('Term 1')}>Term 1</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedTerm('Term 2')}>Term 2</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedTerm('Term 3')}>Term 3</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedTerm('Final')}>Final</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Term-wise Performance */}
      <Row className="mb-4">
        {termPerformanceData.map((t, i) => (
          <Col md={3} key={i}>
            <Card className="text-center mb-2">
              <Card.Body>
                <h4>{t.percentage}%</h4>
                <p>{t.term}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Subject-wise Marks */}
      <Card className="mb-4 p-3">
        <h5>Subject-wise Marks</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Term 1</th>
              <th>Term 2</th>
              <th>Term 3</th>
              <th>Final</th>
            </tr>
          </thead>
          <tbody>
            {subjectMarksData.map((s, i) => (
              <tr key={i}>
                <td>{s.subject}</td>
                <td>{s.term1}%</td>
                <td>{s.term2}%</td>
                <td>{s.term3}%</td>
                <td>{s.final}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Detailed Marks */}
      <Card className="mb-4 p-3">
        <h5>Detailed Marks</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Term</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarks.map((d, i) => (
              <tr key={i}>
                <td>{d.term}</td>
                <td>{d.subject}</td>
                <td>{d.marks}%</td>
                <td>{d.grade}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Grade Distribution Pie Chart */}
      <Card className="mb-4 p-3">
        <h5>Grade Distribution</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={gradeDistributionData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {gradeDistributionData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default StudentMyResults;
