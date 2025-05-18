import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL/api/task/get-all);
      if (res.data.success) {
        setData(res.data.data);
      } else {
        throw new Error("Failed to fetch content");
      }
    } catch (err) {
      setError("Error loading data");
      console.error("Fetch error:", err);
    }
  };
  

  useEffect(() => {
    testApiConnection();
  }, []);
  
  const testApiConnection = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/task/get-all`);
      console.log("API Response:", res.data);
    } catch (err) {
      console.error("Direct API Error:", err);
    }
  };
  

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/task/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful!");
      fetchData(); // Refresh data after upload
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Task Management</h1>

      <div 
        style={{
          padding: "1rem",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0.2,0,0,0.1)",
          marginBottom: "1rem",
          width: "50%", 
          marginTop: "15px", 
        }}>
        <h4>Upload Task Excel File</h4>
        <input 
          type="file" 
          accept=".xlsx,.xls" 
          onChange={handleFileChange} 
          style={{ marginTop: "5px"}} 
        />
        <button 
          onClick={handleFileUpload} 
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
        <h3>All Entries</h3>

        {/* ✅ Loading State */}
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div style={{ overflowX: "auto", maxHeight: "400px" }}>
            <table className="table table-bordered table-sm" style={{ width: "100%" }}>
              <thead className="table-dark">
                <tr>
                  <th>Week</th>
                  <th>Task Owner</th>
                  <th>Task</th>
                  <th>MCQ 1</th>
                  <th>MCQ 2</th>
                  <th>MCQ 3</th>
                  <th>MCQ 1 Option 1</th>
                  <th>MCQ 1 Option 2</th>
                  <th>MCQ 1 Option 3</th>
                  <th>MCQ 1 Option 4</th>
                  <th>MCQ 2 Option 1</th>
                  <th>MCQ 2 Option 2</th>
                  <th>MCQ 2 Option 3</th>
                  <th>MCQ 2 Option 4</th>
                  <th>MCQ 3 Option 1</th>
                  <th>MCQ 3 Option 2</th>
                  <th>MCQ 3 Option 3</th>
                  <th>MCQ 3 Option 4</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.week}</td>
                      <td>{row.task_owner}</td>
                      <td>{row.task}</td>
                      <td>{row.mcq1}</td>
                      <td>{row.mcq2}</td>
                      <td>{row.mcq3}</td>
                      <td>{row.mcq1_opt1}</td>
                      <td>{row.mcq1_opt2}</td>
                      <td>{row.mcq1_opt3}</td>
                      <td>{row.mcq1_opt4}</td>
                      <td>{row.mcq2_opt1}</td>
                      <td>{row.mcq2_opt2}</td>
                      <td>{row.mcq2_opt3}</td>
                      <td>{row.mcq2_opt4}</td>
                      <td>{row.mcq3_opt1}</td>
                      <td>{row.mcq3_opt2}</td>
                      <td>{row.mcq3_opt3}</td>
                      <td>{row.mcq3_opt4}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="18">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
