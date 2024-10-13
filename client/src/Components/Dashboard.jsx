import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/verify', { withCredentials: true })
      .then(res => {
        if (res.data.status) {
          // User is authenticated
        } else {
          console.log('User not authenticated, redirecting...');
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Verification error:', error.response ? error.response.data : error.message);
        navigate('/');
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600">
          This is your secure area. You are successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
