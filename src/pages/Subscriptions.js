import React from "react";

const Subscription = () => {
  return (
    <div className="content">
      <div className="container mt-4">
        <h1>Subscription Management</h1>
        <div className="card">
          <div className="card-header">
            <h4 className="title">Current Subscription</h4>
          </div>
          <div className="card-body">
            <p>Plan: Premium</p>
            <p>Status: Active</p>
            <button className="btn btn-primary">Renew Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
