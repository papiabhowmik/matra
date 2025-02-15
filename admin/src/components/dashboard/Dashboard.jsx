import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate(); // Move this outside the logout function

  function logout() {
    localStorage.removeItem('authToken');
    navigate('/'); // Use navigate here
  }

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={logout}>Logout</button>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
