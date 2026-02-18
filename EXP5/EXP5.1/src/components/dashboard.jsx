import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"

function Dashboard() {
  return (
    <div className="layout">
      <div className="glass-card">
        <h1>Dashboard</h1>
        <p className="subtitle">Welcome back 👋</p>

        <div className="stats">
          <div className="stat-box">
            <h3>Projects</h3>
            <p>6</p>
          </div>
          <div className="stat-box">
            <h3>Skills</h3>
            <p>AI · Web · ML</p>
          </div>
          <div className="stat-box">
            <h3>Status</h3>
            <p>Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="layout">
      <div className="glass-card profile-card">
        <div className="avatar">
          <img src="/profile.jpg" alt="Profile" />
        </div>

        <h1>Hitanshu Kandpal</h1>
        <p className="subtitle">B.Tech Student</p>

        <div className="profile-info">
          <p><strong>Interest:</strong> Web Development</p>
          <p><strong>Focus:</strong> AI & Full Stack</p>
          <p><strong>College:</strong> Engineering</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
export { Profile };


