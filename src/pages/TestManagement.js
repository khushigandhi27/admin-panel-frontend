import React, { useEffect, useState } from "react";
import axios from "axios";

const TestManagement = () => {
  const [tests, setTests] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://admin-panel-backend-zeta.vercel.app/api/test/get-all");
      if (res.data.success) setTests(res.data.data);
    } catch (err) {
      console.error("Failed to load tests", err);
      alert("Failed to load tests.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://admin-panel-backend-zeta.vercel.app/api/test/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Upload successful!");
      fetchTests();
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Test Management</h1>

      <div 
        style={{
          padding: "1rem",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0.2,0,0,0.1)",
          marginBottom: "1rem",
          width: "50%",
          marginBottom: "20px", 
          marginTop: "15px",
        }}>
        <h4>Upload Test Excel File</h4>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} style={{ marginTop: "5px"}} />
        <button 
          onClick={handleUpload} 
          style={{
            marginTop: "15px", 
            backgroundColor: "#007bff", 
            color: "#fff",  
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
            width: "100%"
          }}>
          Upload
        </button>
      </div>

      <div 
        style={{
          padding: "1rem",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0.2,0,0,0.1)",
          width: "100%",
        }}>
        <h3>All Test Questions</h3>
        <div style={{ overflowX: "auto", maxHeight: "400px" }}>
          <table className="table table-bordered table-sm" style={{ width: "100%" }}>
            <thead className="table-dark">
                <tr>
                  <th>Quarter</th>
                  <th>Age</th>
                  <th>Objective</th>
                  <th>Question</th>
                  <th>Option 1</th>
                  <th>Points 1</th>
                  <th>Option 2</th>
                  <th>Points 2</th>
                  <th>Option 3</th>
                  <th>Points 3</th>
                  <th>Option 4</th>
                  <th>Points 4</th>
                </tr>
              </thead>
              <tbody>
                {tests.length > 0 ? (
                  tests.map((t, i) => (
                    <tr key={t.id || i}>
                      <td>{t.quarter}</td>
                      <td>{t.age}</td>
                      <td>{t.objective}</td>
                      <td>{t.question}</td>
                      <td>{t.option1}</td>
                      <td>{t.points1}</td>
                      <td>{t.option2}</td>
                      <td>{t.points2}</td>
                      <td>{t.option3}</td>
                      <td>{t.points3}</td>
                      <td>{t.option4}</td>
                      <td>{t.points4}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center">
                      No test questions available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default TestManagement;
