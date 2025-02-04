import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/service');
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <img
          src="https://media.istockphoto.com/id/1201210238/vector/digital-health-illustration.jpg?s=612x612&w=0&k=20&c=NLWjgHZqoJGctoihaa_6JfyEsdShLQR_75uFBHblP94="
          alt="Medicine Reminder App"
          className="app-image"
        />
      </div>
      <div className="right-section">
        <h1 className="app-title">Medicine Reminder & Health Monitoring</h1>
        <p className="app-description">
          Welcome to our <span className="highlight">Medicine Reminder and Mobile Health Monitoring</span> app. It helps you manage medications effectively and monitor your health seamlessly.
        </p>
        <ul className="feature-list">
          <li>Set <span className="highlight">reminders</span> for your medications.</li>
          <li>Track your <span className="highlight">medication intake</span>.</li>
          <li>Monitor <span className="highlight">health metrics</span> and generate reports.</li>
          <li>Resolve <span className="highlight">medication-related queries</span>.</li>
        </ul>
        <button className="proceed-button" onClick={handleProceed}>
          Proceed to Data
        </button>
      </div>
    </div>
  );
};

export default Home;
