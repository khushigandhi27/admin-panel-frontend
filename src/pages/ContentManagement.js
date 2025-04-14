import React, { useState, useEffect } from "react";
import axios from "axios";

const ContentManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: "",
    category: "",
    age_group: "",
  });

  // 🔁 Fetch questions on load
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/content/get-all");
      if (response.data.success) {
        const sorted = response.data.data.sort((a, b) => b.id - a.id); // newest first
        setQuestions(sorted);
      } else {
        throw new Error("Failed to fetch questions");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file to upload.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/content/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      fetchQuestions();
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload file.");
    }
  };

  const handleInputChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = async () => {
    const { question, answer, category, age_group } = newQuestion;
    if (!question || !answer || !category || !age_group) {
      return alert("All fields are required.");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/content/add", newQuestion);
      alert(response.data.message || "Question added!");
      setNewQuestion({ question: "", answer: "", category: "", age_group: "" });
      fetchQuestions();
    } catch (error) {
      console.error("Add Error:", error);
      alert(error.response?.data?.error || "Failed to add question.");
    }
  };

  return (
    <div className="content">
      <div className="container mt-4">
        <h1>Content Management</h1>

        <div className="row">
          {/* 📁 Upload Excel File */}
          <div className="col-12 col-md-6">
            <div className="card p-3 mb-4" style={{ width: "100%" }}>
              <h4>Upload Excel File</h4>
              <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
              <button className="btn btn-primary mt-2" onClick={handleFileUpload}>
                Upload
              </button>
            </div>
          </div>

          {/* ➕ Add a New Question */}
          <div className="col-12 col-md-6">
            <div className="card p-3 mb-4" style={{ width: "100%" }}>
              <h4>Add a New Question</h4>
              <input
                type="text"
                name="question"
                value={newQuestion.question}
                placeholder="Question"
                className="form-control mb-2"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="answer"
                value={newQuestion.answer}
                placeholder="Answer"
                className="form-control mb-2"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="category"
                value={newQuestion.category}
                placeholder="Category"
                className="form-control mb-2"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="age_group"
                value={newQuestion.age_group}
                placeholder="Age Group"
                className="form-control mb-2"
                onChange={handleInputChange}
              />
              <button className="btn btn-success" onClick={handleAddQuestion}>
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* 📋 All Questions (fixed height scrollable area) */}
        <div className="card p-3 mt-4" style={{ width: "100%", maxHeight: "350px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>All Questions</h3>
            <button className="btn btn-secondary" onClick={fetchQuestions}>
              🔄 Refresh
            </button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            <table className="table">
              <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Category</th>
                  <th>Age Group</th>
                </tr>
              </thead>
              <tbody>
                {questions.length ? (
                  questions.map((q, index) => (
                    <tr key={index}>
                      <td>{q.question}</td>
                      <td>{q.answer}</td>
                      <td>{q.category}</td>
                      <td>{q.age_group}</td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <tr>
                      <td colSpan="4">No questions available.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
