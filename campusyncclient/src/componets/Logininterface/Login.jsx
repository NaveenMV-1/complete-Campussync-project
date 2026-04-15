import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Mortarboard, People, ShieldCheck } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './Login.css'

const LoginScreen = () => {
  const roles = [
    {
      title: 'Student',
      desc: 'Access your dashboard, apply for leave & OD',
      icon: <Mortarboard size={24} className="text-primary" />,
      path: '/student/login',
    },
    {
      title: 'Faculty',
      desc: 'Manage approvals, view reports & announce',
      icon: <People size={24} className="text-primary" />,
      path: '/staff/login',
    },
    {
      title: 'HOD',
      desc: 'Department overview, analytics & management',
      icon: <ShieldCheck size={24} className="text-primary" />,
      path: '/hod/login', // This matches your App.js route
    },
  ];

  return (
    <Container fluid className="vh-100 p-0 overflow-hidden">
      <Row className="g-0 h-100">
        {/* Left Side: Branding */}
        <Col md={6} className="bg-primary text-white d-flex flex-column align-items-center justify-content-center p-5 text-center bg-gradient">
          <div className="mb-4 bg-white bg-opacity-25 p-3 rounded-4">
             <Mortarboard size={60} />
          </div>
          <h1 className="display-4 fw-bold">CampuSync</h1>
          <p className="lead px-md-5">
            Streamline leave requests, track attendance, and manage academic records — all in one place.
          </p>
        </Col>

        {/* Right Side: Role Selection */}
        <Col md={6} className="bg-light d-flex flex-column align-items-center justify-content-center p-5">
          <div style={{ maxWidth: '450px', width: '100%' }}>
            <h2 className="fw-bold mb-1">Welcome back</h2>
            <p className="text-muted mb-4">Select your role to continue</p>

            {roles.map((role, index) => (
              /* Wrap the Card in a Link to make it clickable and navigate */
              <Link to={role.path} key={index} className="text-decoration-none">
                <Card className="role-card mb-3 border-0 shadow-sm">
                  <Card.Body className="d-flex align-items-center p-3">
                    <div className="icon-box bg-light rounded-3 p-3 me-3 text-primary">
                      {role.icon}
                    </div>
                    <div className="flex-grow-1 text-dark">
                      <h6 className="mb-0 fw-bold">{role.title}</h6>
                      <small className="text-muted">{role.desc}</small>
                    </div>
                    <div className="text-muted ms-2">→</div>
                  </Card.Body>
                </Card>
              </Link>
            ))}

           
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;                 