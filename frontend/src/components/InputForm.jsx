import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ setResults }) => {
    const [formData, setFormData] = useState({
        study_hours: '',
        attendance: '',
        previous_marks: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Strict Validation Rules
        if (formData.study_hours > 24) return alert("Time cannot exceed 24 hours!");
        if (formData.attendance > 100) return alert("Attendance cannot exceed 100%!");
        if (formData.previous_marks > 100) return alert("Previous marks cannot exceed 100!");

        try {
            const response = await axios.post('http://127.0.0.1:8000/predict', formData);
            setResults(response.data);
        } catch (error) {
            console.error("Backend Error:", error);
            alert("Make sure the Backend Server is running!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-form">
            <h2 className="glow-text">Study Analysis</h2>
            <input 
                type="number" 
                placeholder="Study Hours (Max 24)" 
                onChange={(e) => setFormData({...formData, study_hours: e.target.value})} 
                required 
            />
            <input 
                type="number" 
                placeholder="Attendance % (Max 100)" 
                onChange={(e) => setFormData({...formData, attendance: e.target.value})} 
                required 
            />
            <input 
                type="number" 
                placeholder="Previous Marks (Max 100)" 
                onChange={(e) => setFormData({...formData, previous_marks: e.target.value})} 
                required 
            />
            <button type="submit" className="aurora-btn">Generate Plan</button>
        </form>
    );
};

export default InputForm;