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

        // New Validation Rules
        if (formData.study_hours > 24) return alert("Time more than 24 hours cannot be added.");
        if (formData.attendance > 100) return alert("Attendance more than 100 percent cannot be added.");
        if (formData.previous_marks >= 100) return alert("Previous marks 100 cannot be added.");

        try {
            const response = await axios.post('http://127.0.0.1:8000/predict', {
                study_hours: parseFloat(formData.study_hours),
                attendance: parseFloat(formData.attendance),
                previous_marks: parseFloat(formData.previous_marks)
            });
            setResults(response.data);
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Ensure backend is running on port 8000");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-form">
            <h2 className="glow-text">AI Study Planner</h2>
            <input 
                type="number" 
                placeholder="Study Hours (Max 24)" 
                value={formData.study_hours}
                onChange={(e) => setFormData({...formData, study_hours: e.target.value})} 
                required 
            />
            <input 
                type="number" 
                placeholder="Attendance % (Max 100)" 
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: e.target.value})} 
                required 
            />
            <input 
                type="number" 
                placeholder="Previous Marks (Max 100)" 
                value={formData.previous_marks}
                onChange={(e) => setFormData({...formData, previous_marks: e.target.value})} 
                required 
            />
            <button type="submit" className="aurora-btn">Generate Analysis</button>
        </form>
    );
};

export default InputForm;