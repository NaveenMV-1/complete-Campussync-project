import React from "react";
import { Nav, ListGroup } from "react-bootstrap"; // Removed Navbar
import { FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LuGraduationCap } from "react-icons/lu";
import { HiSpeakerphone } from "react-icons/hi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hodheader.css';

export default function HodHeader() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/"); // Redirects to login
  };
  return (
    <div className="sidebar-wrapper bg-dark text-white d-flex flex-column shadow" style={{ width: '280px', height: '100vh' }}>
      
     
      <div className="p-4 d-flex align-items-center gap-3">
        <div className="bg-primary rounded d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', fontSize: '24px' }}>
          <LuGraduationCap />
        </div>
        <div>
          <h5 className="mb-0 fw-bold">Campusync</h5>
          <small className="text-secondary">HOD Portal</small>
        </div>
      </div>

      <hr className="mx-3 my-0 border-secondary" />

    
     <Nav className="flex-column flex-grow-1 px-3 mt-3">
      
        <Nav.Link as={Link} to="/hod/dashboard" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
          <RxDashboard size={20} /> Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to="/hod/approvals" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
          <IoMdCheckboxOutline size={20} /> Approvals
        </Nav.Link>

        <Nav.Link as={Link} to="/hod/announcements" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
          <HiSpeakerphone size={20} /> Announcements
        </Nav.Link>

        <Nav.Link as={Link} to="/hod/analysis" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
          <TbDeviceAnalytics size={20} /> Department Analysis
        </Nav.Link>
      </Nav>

     
      <div className="mt-auto p-3 border-top border-secondary bg-dark">
        <div className="px-2 mb-3">
          <h6 className="mb-0 text-truncate">Mr. Balaji Madhavan</h6>
          <small className="text-secondary text-uppercase" style={{ fontSize: '0.75rem' }}>Computer Science</small>
        </div>
        
        <ListGroup variant="flush">
         
          <button 
          className="btn btn-outline-danger w-100 d-flex align-items-center gap-3 border-0 text-start ps-2"
          onClick={handleSignOut}
          style={{ transition: '0.3s' }}
        >
          <FaSignOutAlt /> Sign Out
        </button>
        </ListGroup>
      </div>
    </div>
  );
}