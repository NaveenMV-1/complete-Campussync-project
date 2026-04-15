import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginScreen from "./componets/Logininterface/Login.jsx";
import HodLayout from "./menus/HOD/Hodlayout/HodLayout.jsx";
import StaffLayout from "./menus/Staff/StaffLayout.jsx";
import StudentLayout from "./menus/Student/StudentLayout.jsx";
import Studentlogin from "./menus/Student/Studentlogin.jsx";
import StudentSignup from "./menus/Student/StudentSignup.jsx";
import StaffLogin from "./menus/Staff/StaffLogin.jsx";
import StaffSignup from "./menus/Staff/StaffSignup.jsx";
import HodLogin from "./menus/HOD/HodLogin.jsx";
import HodSignup from "./menus/HOD/HodSignup.jsx";

export default function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        
        {/* Auth Routes */}
        <Route path="/student/login" element={<Studentlogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/signup" element={<StaffSignup />} />
        <Route path="/hod/login" element={<HodLogin />} />
        <Route path="/hod/signup" element={<HodSignup />} />

        {/* Layout Routes */}
        <Route path="/hod/*" element={<HodLayout />} />
        <Route path="/staff/*" element={<StaffLayout/>}/>
        <Route path="/student/*" element={<StudentLayout/>}/>
      </Routes>
    </>
  );
}