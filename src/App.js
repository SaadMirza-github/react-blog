import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import BlogList from './BlogList';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
import BlogDetails from './BlogDetails';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Update state to reflect logout

    navigate('/'); // Redirect to home page (or login page as per your logic)
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

  }, [token]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">My Blog</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {token === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/create">Create Blog</Link>
                </li>
              )}
            </ul>
            {token && (
              <button
                className="btn btn-danger ms-auto"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Blog Header */}
      <header className="bg-primary text-white text-center py-5 mb-4">
        <div className="container">
          <h1 className="fw-light">Welcome to My Blog</h1>
          <p className="lead">Share your stories with the world!</p>
        </div>
      </header>

      {/* Blog List or Content */}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<BlogList token={token} />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/:id" element={<BlogDetails />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="py-5 bg-light">
        <div className="container">
          <p className="m-0 text-center text-secondary">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Ensure to wrap the App component in Router when rendering
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
