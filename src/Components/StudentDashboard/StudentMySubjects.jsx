import React, { useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';

const StudentMySubjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('all');

  const subjectsData = [
    { id: 1, name: 'Mathematics', teacher: 'Mr. R. Mehta', marks: 95, grade: 'A+' },
    { id: 2, name: 'English', teacher: 'Mrs. P. Sharma', marks: 78, grade: 'B+' },
    { id: 3, name: 'Science', teacher: 'Mr. T. Kumar', marks: 88, grade: 'A' },
    { id: 4, name: 'History', teacher: 'Ms. N. Singh', marks: 64, grade: 'C' },
    { id: 5, name: 'Computer Science', teacher: 'Mr. A. Patel', marks: 92, grade: 'A+' },
  ];

  const filteredSubjects = subjectsData.filter(subject => 
    (subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterTerm === 'all' || subject.grade === filterTerm)
  );

  return (
    <div className="p-4">
      <h2>My Subjects</h2>
      <p>View your subjects and performance details</p>

      {/* Search and Filter */}
      <div className="d-flex mb-3 gap-2">
        <InputGroup>
          <Form.Control
            placeholder="Search subject or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            {filterTerm === 'all' ? 'All Grades' : filterTerm}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilterTerm('all')}>All Grades</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterTerm('A+')}>A+</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterTerm('A')}>A</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterTerm('B+')}>B+</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterTerm('B')}>B</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterTerm('C')}>C</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Subjects Table */}
      <Card>
        <Card.Body className="p-0">
          <Table hover className="mb-0">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map(subject => (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>{subject.teacher}</td>
                    <td>{subject.marks}</td>
                    <td>{subject.grade}</td>
                    <td>
                      <Button size="sm" variant="primary">View</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No subjects found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentMySubjects;
