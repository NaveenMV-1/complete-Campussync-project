import React, { useState } from "react";
import { ShieldCheck } from "react-bootstrap-icons";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";

function HodLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role: "hod" }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/hod/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          
          <Link to="/" className="text-decoration-none text-muted mb-4 d-block">
            <small>← Back to role selection</small>
          </Link>

          <div className="card border-0 shadow-sm p-4">
            <div className="card-body">
              
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" 
                     style={{ width: "50px", height: "50px" }}>
                  <ShieldCheck size={25} className="text-primary" />
                </div>
                <div>
                  <h2 className="h4 mb-0 fw-bold">HOD Login</h2>
                  <p className="text-muted small mb-0">Enter your credentials to continue</p>
                </div>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Employee ID or Email</label>
                  <input
                    type="text"
                    className="form-control form-control-lg fs-6"
                    placeholder="e.g. HOD109 or hod@college.edu"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg fs-6 border-end-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm">
                  Sign In →
                </button>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted small">Don't have an account? </span>
                <Link to="/hod/signup" className="text-primary small fw-bold text-decoration-none">
                  Sign Up
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HodLogin;
