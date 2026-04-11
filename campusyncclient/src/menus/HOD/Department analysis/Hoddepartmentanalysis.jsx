import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';

export default function Hoddepartmentanalysis() {
  // Organized Data Structure
  const classData = [
    { year: "2nd Year", sections: [
      { name: "CSE - A", strength: 64, attendance: 88, performance: 82 },
      { name: "CSE - B", strength: 62, attendance: 84, performance: 78 },
      { name: "CSE - C", strength: 65, attendance: 91, performance: 85 }
    ]},
    { year: "3rd Year", sections: [
      { name: "CSE - A", strength: 60, attendance: 92, performance: 89 },
      { name: "CSE - B", strength: 58, attendance: 87, performance: 81 },
      { name: "CSE - C", strength: 61, attendance: 85, performance: 83 }
    ]}
  ];

  return (
    <Container fluid className="p-4">
      {/* ... (Keep your existing Header and KPI Cards here) ... */}

      {/* NEW SECTION: CLASS-WISE ANALYSIS */}
      <h5 className="fw-bold mb-4 mt-5 text-dark">Class-wise Performance</h5>
      
      {classData.map((yearGroup, idx) => (
        <div key={idx} className="mb-5">
          <div className="d-flex align-items-center mb-3">
            <h6 className="fw-bold text-secondary mb-0 me-3">{yearGroup.year} Overview</h6>
            <hr className="flex-grow-1 opacity-10" />
          </div>
          
          <Row className="g-4">
            {yearGroup.sections.map((section, sIdx) => (
              <Col key={sIdx} lg={4} md={6}>
                <Card className="border-0 shadow-sm rounded-4 p-2 h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div>
                        <h5 className="fw-bold mb-1">{section.name}</h5>
                        <small className="text-muted">{section.strength} Students Enrolled</small>
                      </div>
                      <Badge bg="primary" className="bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                        Active
                      </Badge>
                    </div>

                    {/* Attendance Metric */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1 small">
                        <span className="text-secondary fw-medium">Avg. Attendance</span>
                        <span className="fw-bold">{section.attendance}%</span>
                      </div>
                      <ProgressBar 
                        now={section.attendance} 
                        variant="info" 
                        style={{ height: '6px' }} 
                        className="rounded-pill" 
                      />
                    </div>

                    {/* Performance Metric */}
                    <div>
                      <div className="d-flex justify-content-between mb-1 small">
                        <span className="text-secondary fw-medium">Academic Score</span>
                        <span className="fw-bold text-success">{section.performance}%</span>
                      </div>
                      <ProgressBar 
                        now={section.performance} 
                        variant="success" 
                        style={{ height: '6px' }} 
                        className="rounded-pill" 
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 text-center pb-3">
                     <button className="btn btn-link text-decoration-none small p-0">View Detailed Class List</button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* ... (Keep your existing Faculty Performance Table below this) ... */}
    </Container>
  );
}