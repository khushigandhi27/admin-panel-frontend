import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ContentManagement from "./pages/ContentManagement";
import UserProfile from "./pages/UserProfile";
import Subscriptions from "./pages/Subscriptions";
import Navbar from "./components/Navbar"; // Ensure navbar is included
import "./assets/css/styles.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/ContentManagement" element={<ContentManagement />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Subscriptions" element={<Subscriptions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
