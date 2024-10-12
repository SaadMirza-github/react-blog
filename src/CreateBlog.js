// src/components/CreateBlog.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = "http://localhost:5000";
            const token = localStorage.getItem('token');  // Get token from localStorage
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;  // Set the token in the header
            }
            await axios.post(`${apiUrl}/api/blogs`, { title, content });
            navigate('/'); // Redirect to blog list
        } catch (err) {
            console.error('Error creating blog:', err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Blog</h2>
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
                        onChange={setContent} // Store content in state
                        modules={{
                            toolbar: [
                                [{ header: '1' }, { header: '2' }, { font: [] }],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['bold', 'italic', 'underline'],
                                ['image', 'link'],
                                ['clean'] // Remove formatting button
                            ]
                        }}
                        style={{ height: '200px' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-5">Create</button>
            </form>
        </div>
    );
};

export default CreateBlog;
