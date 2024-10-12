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
                                <h5 className="card-title">{blog.title}</h5>
                                <Link to={`/${blog._id}`} className="btn btn-primary">View</Link>

                                {
                                    token ? (
                                        <>
                                            <Link to={`/edit/${blog._id}`} className="btn btn-sm btn-secondary float-end">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="btn btn-sm btn-danger float-end me-2"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : null // Or you can render something else or nothing
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;