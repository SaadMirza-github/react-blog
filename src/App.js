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
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(""); // Update state to reflect logout
    navigate('/'); // Redirect to home page (or login page as per your logic)
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); // Set the token state based on local storage
  }, [token]); // Only run this effect when token changes

  return (
    <div>
      <h1 className="text-center mt-2">Blog</h1>
      <div className="container mt-2 bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">My App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {/* Show Login and Register links only if not logged in */}
                {!token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                ) : null}
                {/* Show "Create Blog" link only if the token is present */}
                {token && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/create">Create Blog</Link>
                  </li>
                )}
              </ul>
              {token && (
                <button className="btn btn-danger ms-auto" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/:id" element={<BlogDetails />} />
      </Routes>
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
