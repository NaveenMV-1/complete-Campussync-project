import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
  

export default function Hodannouncement() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getannouncements");
      // Filter for HOD announcements written by this user
      setHistory(res.data.filter(ann => ann.role === "HOD" && ann.author === "Mr. Balaji"));
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/announcements/${id}`);
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcement.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Title and content are required.");
    try {
      await axios.post("http://localhost:5000/announcements", {
        role: "HOD",
        author: "Mr. Balaji",
        title: formData.title,
        content: formData.content
      });
      alert("Announcement posted successfully!");
      setFormData({ title: '', content: '' });
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Failed to post announcement.");
    }
  };

  return (
    <Container fluid className="px-4">
      {/* Header Section */}
      <header className="welcome d-flex justify-content-between align-items-center py-3 border-bottom">
        <h4 className="mb-0">Welcome back Mr. Balaji</h4>
        <div className="profile-circle">B</div>
      </header>

      {/* Main Announcement Section */}
      <Row className=" mt-5">
        <Col md={8} lg={6}>
          <div className="Anunocesec">
            <h1 className="mb-4">Announcements</h1>
            
            <Card className="p-4 shadow-sm border-primary-custom">
              <Form onSubmit={handleSubmit}>
                <h5 className="mb-4 d-flex align-items-center gap-2">
                  <HiSpeakerphone className="text-primary-custom" size={22} /> 
                  Announcement
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label className="text-primary-custom fw-bold">Title:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Announcement title" 
                    className="bg-light-custom" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-primary-custom fw-bold">Content:</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Write Your Announcement"
                    style={{ height: '100px' }}
                    className="bg-light-custom"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-primary-custom fw-bold">Add File:</Form.Label>
                  <Form.Control type="file" className="bg-light-custom" />
                </Form.Group>

                <Button type="submit" variant="primary" className="btn-primary-custom d-flex align-items-center gap-2">
                  <IoIosSend /> Post
                </Button>
              </Form>
            </Card>
          </div>
        </Col>

        {/* Announcement History Column */}
        <Col md={8} lg={6}>
          <div className="Anunocesec mt-4 mt-lg-0">
            <h1 className="mb-4 text-transparent" style={{ color: 'transparent' }}>History</h1>
            <Card className="p-4 shadow-sm border-0 bg-light">
              <h5 className="mb-4 d-flex align-items-center gap-2 fw-bold text-secondary">
                 Announcement History
              </h5>
              
              <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                {history.length > 0 ? (
                  history.map((ann) => (
                    <Card key={ann.id} className="mb-3 border-0 shadow-sm">
                      <Card.Body className="d-flex justify-content-between align-items-start">
                        <div className="me-3">
                          <h6 className="fw-bold mb-1 text-dark">{ann.title}</h6>
                          <p className="small text-muted mb-2">{ann.content}</p>
                          <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>
                            {new Date(ann.created_at).toLocaleString()}
                          </small>
                        </div>
                        <Button 
                          variant="link" 
                          className="text-danger p-0" 
                          onClick={() => handleDelete(ann.id)}
                        >
                          <FaTrash />
                        </Button>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted small text-center my-4">No previous announcements found.</p>
                )}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}