// src/components/BlogDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const fetchBlogDetails = async () => {
        try {
            const apiUrl = "http://localhost:5000";
            const response = await axios.get(`${apiUrl}/api/blogs/${id}`);
            setBlog(response.data);
        } catch (err) {
            console.error('Error fetching blog details:', err);
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>{blog.title}</h2>
            {blog.image && (
                <div className="mt-4">
                    <h5>Image:</h5>
                    <img src={`http://localhost:5000${blog.image}`} alt={blog.title} className="img-fluid" />
                </div>
            )}
            <div>
                {/* Render HTML content safely */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
        </div>
    );
};

export default BlogDetails;
