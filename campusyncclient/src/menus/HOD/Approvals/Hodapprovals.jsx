import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Badge, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Hodapprovals() {
  const [leaves, setLeaves] = useState([]);
  const [ods, setOds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const leaveRes = await axios.get("http://localhost:5000/getleaves");
      const odRes = await axios.get("http://localhost:5000/getods");
      
      const formattedLeaves = leaveRes.data.map(item => ({
        id: item.id, name: item.name, reg: item.reg, type: "Leave",
        date: `${item.sdata} to ${item.edata}`, reason: item.lreason,
        attendance: item.attendance || 90, cgpa: item.cgpa || 8.0, status: item.status
      }));

      const formattedOds = odRes.data.map(item => ({
        id: item.id, name: item.name, reg: item.reg, type: "OD",
        date: item.oddate, reason: item.odreason,
        attendance: item.attendance || 90, cgpa: item.cgpa || 8.0, status: item.status
      }));

      setLeaves(formattedLeaves);
      setOds(formattedOds);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id, type, newStatus) => {
    try {
      const endpoint = type === 'Leave' ? `/leave/${id}/status` : `/OD/${id}/status`;
      await axios.put(`http://localhost:5000${endpoint}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const allRequests = [...leaves, ...ods];

  // Helper function to render the table rows based on tab
  const renderTable = (filterType) => (
    <Table responsive hover align="middle" className="mt-3">
      <thead className="bg-light small text-muted">
        <tr>
          <th>STUDENT DETAILS</th>
          <th>METRICS (ATT% / CGPA)</th>
          <th>DURATION & REASON</th>
          <th className="text-center">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {allRequests
          .filter(r => (filterType === 'Approved' ? (r.status === 'Approved' || r.status === 'Rejected') : (r.type === filterType && r.status === 'Pending')))
          .map((req) => (
            <tr key={`${req.type}-${req.id}`}>
              <td>
                <div className="fw-bold">{req.name}</div>
                <small className="text-muted">{req.reg}</small>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Badge bg={req.attendance < 75 ? 'danger' : 'success'} className="bg-opacity-10 text-dark fw-normal border">
                    Att: {req.attendance}%
                  </Badge>
                  <Badge bg="primary" className="bg-opacity-10 text-primary fw-normal border">
                    CGPA: {req.cgpa}
                  </Badge>
                </div>
              </td>
              <td>
                <div className="small fw-bold">{req.date}</div>
                <div className="extra-small text-muted" style={{fontSize: '0.8rem'}}>{req.reason}</div>
              </td>
              <td className="text-center">
                {req.status === 'Pending' ? (
                  <>
                    <Button variant="success" size="sm" className="rounded-pill px-3 me-2" onClick={() => handleStatusUpdate(req.id, req.type, 'Approved')}>Approve</Button>
                    <Button variant="outline-danger" size="sm" className="rounded-pill px-3" onClick={() => handleStatusUpdate(req.id, req.type, 'Rejected')}>Reject</Button>
                  </>
                ) : (
                  <Badge bg={req.status === 'Approved' ? 'success' : 'danger'} className="px-3 py-2">{req.status}</Badge>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="mb-4">
        <h3 className="fw-bold">Request Approvals</h3>
        <p className="text-muted small">Manage student Leave and OD applications with academic insights.</p>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <Tabs defaultActiveKey="Leave" id="approval-tabs" className="custom-tabs mb-3 border-0">
            <Tab eventKey="Leave" title="Leave Requests">
              {renderTable('Leave')}
            </Tab>
            <Tab eventKey="OD" title="OD Requests">
              {renderTable('OD')}
            </Tab>
            <Tab eventKey="Approved" title="Approval History">
              {renderTable('Approved')}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}