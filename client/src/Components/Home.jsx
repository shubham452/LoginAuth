import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';  // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .get('http://localhost:3000/api/auth/logout')
      .then((res) => {
        if (res.data.status) {
          navigate('/Login');
        } else {
          console.log('Logout failed.');
        }
      })
      .catch((err) => {
        console.log('Error during logout:', err);
      });
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Home</h1>

        {/* Dashboard Button */}
        <Link to="/dashboard" className="button dashboard-button">
          Go to Dashboard
        </Link>

        {/* Logout Button */}
        <button onClick={handleLogout} className="button logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
