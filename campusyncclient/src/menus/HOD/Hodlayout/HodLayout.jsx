import React from "react";
import { Routes, Route } from "react-router-dom";

import HodHeader from "../../../componets/Hodheader/Hodheader";
import HodDashboard from "../Dashboard/HodDashboard";
import Hodapprovals from "../Approvals/Hodapprovals";
import Hodannouncement from "../Announcement/Hodannouncement";
import Hoddepartmentanalysis from "../Department analysis/Hoddepartmentanalysis";

export default function HodLayout() {

  const sidebarWidth = "250px"; // ✅ FIX

  return (
    <div style={{ display: "flex" }}>
      
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
        <HodHeader />
      </div>

      
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
          <Route path="dashboard" element={<HodDashboard />} />
          <Route path="approvals" element={<Hodapprovals />} />
          <Route path="announcements" element={<Hodannouncement />} />
          <Route path="analysis" element={<Hoddepartmentanalysis />} />
        </Routes>
      </div>
    </div>
  );
}