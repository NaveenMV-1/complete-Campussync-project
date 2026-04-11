import React from 'react';
import { Routes, Route } from "react-router-dom";

import StaffHeader from '../../componets/StaffHeaader/Staffheader';
import StaffDashBoard from './StaffDashBoard';
import StaffApprovals from './StaffApprovals';
import StaffAnnouncement from './StaffAnnouncement';
import MarkAttendance from './MarkAttendance';
import StudentInfo from './StudentInfo';

export default function StaffLayout() {

  const sidebarWidth = "250px";

  return (
    <div style={{ display: "flex" }}>

      {/* ✅ SIDEBAR (FIXED ONLY THIS) */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: sidebarWidth,
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "#fff",
        borderRight: "1px solid #dee2e6"
      }}>
        <StaffHeader />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarWidth,
          minHeight: "100vh",
          padding: "40px",
          width: "100%"
        }}
      >
        <Routes>
          <Route path="dashboard" element={<StaffDashBoard />} />
          <Route path="approvals" element={<StaffApprovals />} />
         
          <Route path="announcement" element={<StaffAnnouncement />} />
          <Route path="markattend" element={<MarkAttendance />} />
          <Route path="studentinfo" element={<StudentInfo />} />
        </Routes>
      </div>

    </div>
  );
}