// src/Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="text-center">
      <h2>Welcome! Please login or register.</h2>
      <p>
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </p>
    </div>
  );
};

export default Welcome;