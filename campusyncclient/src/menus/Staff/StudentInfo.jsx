import React, { useState } from "react";
import { Modal, Button, Container, Table, Card } from "react-bootstrap";

export default function StudentInfo() {

  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  const students = [
    {
      id: 1,
      name: "Arun Kumar",
      reg: "9123128001",
      section: "Section A",
      attendance: 91,
      cgpa: 8.7,
      status: "Good Standing",
      leaves: ["12 Mar - Sick", "5 Feb - Personal"]
    },
    {
      id: 2,
      name: "Eswaran K",
      reg: "9123128005",
      section: "Section A",
      attendance: 74,
      cgpa: 6.8,
      status: "Low Attendance",
      leaves: ["2 Mar - Leave"]
    }
  ];

  return (
    <Container fluid className="p-4">

      <h3>Student Information</h3>

      <Card className="p-3">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>CGPA</th>
              <th>Attendance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.cgpa}</td>
                <td>{student.attendance}%</td>
                <td>
                  <Button onClick={() => handleShow(student)}>
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* ✅ Modal OUTSIDE map */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedStudent && (
            <>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Section:</strong> {selectedStudent.section}</p>
              <p><strong>CGPA:</strong> {selectedStudent.cgpa}</p>
              <p><strong>Attendance:</strong> {selectedStudent.attendance}%</p>

              <p><strong>Leaves:</strong></p>
              <ul>
                {selectedStudent.leaves.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}