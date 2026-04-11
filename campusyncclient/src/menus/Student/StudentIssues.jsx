import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentIssues() {
  const [issueHistory, setIssueHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getissues");
      setIssueHistory(res.data);
    } catch (error) {
      console.error("Error fetching issue history:", error);
    }
  };
  const [issueType, setIssueType] = useState({
    issuetype: "",
    title: "",
    reason: ""
  });

  const handleChange = (idata) => {
    setIssueType({ ...issueType, [idata.target.name]: idata.target.value });
  };

  const handleSubmit = async (idata) => {
    idata.preventDefault();

    // 1. Validation
    if (!issueType.issuetype || !issueType.title || !issueType.reason) {
      alert("Please fill in all fields.");
      return;
    }
    else {
      console.log("Submitting Issue:", issueType);
    }

    // 2. API Call
    try {
      await axios.post("http://localhost:5000/issues", issueType);
      
      alert("Issue reported successfully! Database updated.");
      
      // 3. Clear form after success
      setIssueType({ issuetype: "", title: "", reason: "" });
      fetchHistory();
      console.log("Submitted Data:", issueType);
    } catch (error) {
      console.error("Error reporting issue:", error);
      alert("Failed to report issue. Is your Node.js server running on port 5000?");
    }
  };

  return (
    <section className="min-vh-100 py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2 className="fw-bold mb-4 text-dark">Welcome back, Arun 👋</h2>

            {/* Report Issue Form Card */}
            <div className="card border-0 shadow-sm p-4 mb-5 rounded-4">
              <h2 className="h4 fw-bold mb-4">Report Issues</h2>

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <select 
                      name="issuetype" 
                      className="form-select"
                      onChange={handleChange}
                      value={issueType.issuetype}
                    >
                      <option value="">Select category</option>
                      <option value="classroom">Classroom</option>
                      <option value="academic">Academic</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="title" 
                      placeholder="Issue title" 
                      onChange={handleChange} 
                      value={issueType.title} 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    name="reason"
                    placeholder="Describe the issue in detail..."
                    onChange={handleChange}
                    value={issueType.reason}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary px-4 py-2 fw-bold shadow-sm">
                  Submit Report
                </button>
              </form>
            </div>

            {/* My Issues Section (Static History) */}
            <div className="mt-5">
              <h2 className="h4 fw-bold mb-4">My Issues</h2>

              {issueHistory.map((issue, idx) => (
                <div key={idx} className="card border-0 shadow-sm p-4 mb-3 rounded-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="issue-content">
                      <h3 className="h5 fw-bold mb-2">{issue.title}</h3>
                      <p className="text-muted mb-3">
                        {issue.reason}
                      </p>
                      <small className="text-secondary opacity-75 fw-medium text-capitalize">
                        {issue.issuetype}
                      </small>
                    </div>
                    <span className={`badge ${issue.status === 'Resolved' || issue.status === 'Approved' ? 'bg-success-subtle text-success border border-success-subtle' : issue.status === 'In Progress' ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'} px-3 py-2`}>
                      {issue.status || 'Open'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}