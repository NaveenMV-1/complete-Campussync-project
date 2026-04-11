import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Badge, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default function StaffApprovals() {
  const [leaves, setLeaves] = useState([]);
  const [ods, setOds] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leavesRes, odsRes] = await Promise.all([
          axios.get("http://localhost:5000/getleaves"),
          axios.get("http://localhost:5000/getods")
        ]);
        setLeaves(leavesRes.data.map(l => ({ ...l, type: 'Leave', date: l.sdata, reason: l.lreason })));
        setOds(odsRes.data.map(o => ({ ...o, type: 'OD', date: o.oddate, reason: o.odreason })));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [refresh]);

  const handleAction = async (type, id, status) => {
    try {
      const endpoint = type === 'Leave' ? 'leave' : 'OD';
      await axios.put(`http://localhost:5000/${endpoint}/${id}/status`, { status });
      setRefresh(prev => prev + 1);
    } catch(err) {
      console.error(err);
    }
  };

  const requests = [...leaves, ...ods];

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
        {requests
          .filter(r => filterType === 'Approved' ? (r.status === 'Approved' || r.status === 'Rejected') : r.type === filterType && r.status === 'Pending')
          .map((req) => (
            <tr key={req.id}>
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
                    <Button variant="success" size="sm" className="rounded-pill px-3 me-2" onClick={() => handleAction(req.type, req.id, 'Approved')}>Approve</Button>
                    <Button variant="outline-danger" size="sm" className="rounded-pill px-3" onClick={() => handleAction(req.type, req.id, 'Rejected')}>Reject</Button>
                  </>
                ) : (
                  <Badge bg={req.status === 'Approved' ? "success" : "danger"} className="px-3 py-2">{req.status}</Badge>
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