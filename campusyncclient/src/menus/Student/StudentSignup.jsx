import React, { useState } from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";

function StudentSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reg: "",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "student" }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/student/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          
          <Link to="/" className="text-decoration-none text-muted mb-4 d-block">
            <small>← Back to role selection</small>
          </Link>

          <div className="card border-0 shadow-sm p-4">
            <div className="card-body">
              
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" 
                     style={{ width: "50px", height: "50px" }}>
                  <RiGraduationCapLine size={25} className="text-primary" />
                </div>
                <div>
                  <h2 className="h4 mb-0 fw-bold">Student Signup</h2>
                  <p className="text-muted small mb-0">Create your account</p>
                </div>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Full Name</label>
                  <input type="text" className="form-control" name="name" onChange={handleChange} required />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Register Number</label>
                    <input type="text" className="form-control" name="reg" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Department</label>
                    <input type="text" className="form-control" name="department" onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Email Adddress</label>
                  <input type="email" className="form-control" name="email" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-end-0"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                    <span 
                      className="input-group-text bg-white border-start-0 text-muted" 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <LuEyeOff /> : <LuEye />}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm">
                  Sign Up →
                </button>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted small">Already have an account? </span>
                <Link to="/student/login" className="text-primary small fw-bold text-decoration-none">
                  Sign In
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSignup;
