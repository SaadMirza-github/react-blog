// src/components/EditBlog.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from 'axios';

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const fetchBlogDetails = async () => {
        try {
            const apiUrl = "http://localhost:5000";
            const response = await axios.get(`${apiUrl}/api/blogs/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (err) {
            console.error('Error fetching blog details:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = "http://localhost:5000";
            const token = localStorage.getItem('token');  // Get token from localStorage
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;  // Set the token in the header
            }
            await axios.put(`${apiUrl}/api/blogs/${id}`, { title, content });
            navigate('/'); // Redirect to blog list
        } catch (err) {
            console.error('Error updating blog:', err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent} // Update state with Quill content
                        modules={{
                            toolbar: [
                                [{ header: '1' }, { header: '2' }, { font: [] }],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['bold', 'italic', 'underline'],
                                ['image', 'link'],
                                ['clean'] // Remove formatting button
                            ]
                        }}
                        style={{ height: '300px' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-5">Update</button>
            </form>
        </div>
    );
};

export default EditBlog;
