import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginScreen from "./componets/Logininterface/Login.jsx";
import HodLayout from "./menus/HOD/Hodlayout/HodLayout.jsx";
import StaffLayout from "./menus/Staff/StaffLayout.jsx";
import StudentLayout from "./menus/Student/StudentLayout.jsx";

export default function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/hod/*" element={<HodLayout />} />
        <Route path="/staff/*" element={<StaffLayout/>}/>
        <Route path="/student/*" element={<StudentLayout/>}/>
      </Routes>
    </>
  );
}