import React from "react";
import { Nav } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LuGraduationCap } from "react-icons/lu";
import { HiSpeakerphone } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Staffheader.css';

export default function StaffHeader() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/"); 
  };

  return (
    <div className="sidebar-wrapper bg-dark text-white d-flex flex-column shadow" style={{ width: '280px', height: '100vh' }}>
      
      {/* Brand Section */}
      <div className="p-4 d-flex align-items-center gap-3">
        <div className="bg-primary rounded d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', fontSize: '24px' }}>
          <LuGraduationCap />
        </div>
        <div>
          <h5 className="mb-0 fw-bold">Campusync</h5>
          <small className="text-secondary text-uppercase" style={{ fontSize: '0.7rem' }}>Faculty Portal</small>
        </div>
      </div>

      <hr className="mx-3 my-0 border-secondary" />

      {/* Menu - Paths must match StaffLayout exactly */}
     <Nav className="flex-column flex-grow-1 px-3 mt-3">
  {/* PATHS MUST MATCH YOUR LAYOUT EXACTLY (Capital B, A, R, A) */}
  
  <Nav.Link as={Link} to="/staff/dashBoard" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
    <RxDashboard size={20} /> Dashboard
  </Nav.Link>

   <Nav.Link as={Link} to="/staff/markattend" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
    <RxDashboard size={20} /> Attendance
  </Nav.Link>

  <Nav.Link as={Link} to="/staff/Approvals" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
    <IoMdCheckboxOutline size={20} /> Approvals
  </Nav.Link>

  <Nav.Link as={Link} to="/staff/Announcement" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
    <HiSpeakerphone size={20} /> Announcements
  </Nav.Link>


  <Nav.Link as={Link} to="/staff/studentinfo" className="nav-link-custom mb-2 d-flex align-items-center gap-3 p-2 rounded text-white">
     <PiStudentBold size={20}/> Student Info
  </Nav.Link>

</Nav>

      {/* Profile & Sign Out */}
      <div className="mt-auto p-3 border-top border-secondary bg-dark">
        <div className="px-2 mb-3">
          <h6 className="mb-0 text-truncate">Mr. Balaji Madhavan</h6>
          <small className="text-secondary text-uppercase" style={{ fontSize: '0.75rem' }}>Computer Science</small>
        </div>
        
        <button 
          className="btn btn-outline-danger w-100 d-flex align-items-center gap-3 border-0 text-start ps-2"
          onClick={handleSignOut}
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );
}