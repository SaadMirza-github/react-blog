import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = ({ token }) => {
    const [blogs, setBlogs] = useState([]);
    //const [token, setToken] = useState(null);
    useEffect(() => {
        //setToken(localStorage.getItem('token'));
        //console.log("BlogList.useeffect------Token:", token);
        fetchBlogs();

    }, [token]);

    const fetchBlogs = async () => {
        try {
            const apiUrl = "http://localhost:5000";
            const response = await axios.get(`${apiUrl}/api/blogs`);
            setBlogs(response.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const apiUrl = "http://localhost:5000";
            const token = localStorage.getItem('token');  // Get token from localStorage
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;  // Set the token in the header
            }
            await axios.delete(`${apiUrl}/api/blogs/${id}`);
            fetchBlogs(); // Refresh blog list after deletion
        } catch (err) {
            console.error('Error deleting blog:', err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {blogs.map(blog => (
                    <div className="col-md-4" key={blog._id}> {/* Use col-md-4 for 3 columns layout */}
                        <div className="card mb-4"> {/* Card component for blog entry */}
                            <div className="card-body">
                                {/* First Row: Center-aligned title */}
                                <div className="text-center mb-3">
                                    <h5 className="card-title">{blog.title}</h5>
                                </div>
    
                                {/* Second Row: Image */}
                                <div className="mb-3 text-center">
                                    <img 
                                        src={`http://localhost:5000${blog.image == null ? "/uploads/placeholder.jpg" : blog.images}`} // Use the correct path to your image
                                        alt={blog.title} // Alt text for accessibility
                                        className="img-fluid" // img-fluid makes the image responsive
                                        style={{ width: '100%' }} // Ensures the image takes full width
                                    />
                                </div>
    
                                {/* Third Row: Buttons center aligned */}
                                <div className="text-center">
                                    <Link to={`/${blog._id}`} className="btn btn-sm btn-primary  me-2">View</Link>
                                    
                                    {token && (
                                        <>
                                            <Link to={`/edit/${blog._id}`} className="btn btn-sm btn-secondary me-2">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default BlogList;