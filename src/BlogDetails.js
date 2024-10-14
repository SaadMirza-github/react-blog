// src/components/BlogDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './env';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const fetchBlogDetails = async () => {
        try {
            
            const response = await axios.get(`${API_URL}/api/blogs/${id}`);
            
            
            setBlog(response.data);
        } catch (err) {
            console.error('Error fetching blog details:', err);
        }
    };

    // Function to format date in DD/MM/YYYY format
    const formatDate = (dateString) => {
        const updatedAt = new Date(dateString);
        return `${updatedAt.getDate().toString().padStart(2, '0')}/${(updatedAt.getMonth() + 1).toString().padStart(2, '0')}/${updatedAt.getFullYear()}`;
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>{blog.title}</h2>
            <h5 className="fw-bold fst-italic mb-5" style={{ fontSize: '14px' }}>
                Author: {blog.author.username}  Date: {formatDate(blog.updatedAt)} {/* Call formatDate function */}
            </h5>
            {blog.image && (
                <div className="mt-4">
                    
                    <img src={`${API_URL}${blog.image}`} alt={blog.title} className="img-fluid" />
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
