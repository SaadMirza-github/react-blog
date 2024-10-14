// src/components/CreateBlog.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { API_URL } from './env';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to handle file and text data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image); // Append image if exists
        }


        try {
            
            const token = localStorage.getItem('token');  // Get token from localStorage
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;  // Set the token in the header
            }
            await axios.post(`${API_URL}/api/blogs`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necessary for file uploads
                },
            });
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
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
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
