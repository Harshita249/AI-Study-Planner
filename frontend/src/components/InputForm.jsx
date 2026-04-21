import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ setReport, setIsProcessing, isProcessing }) => {
    const [formData, setFormData] = useState({ hours: '', attendance: '', marks: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const res = await axios.post('http://127.0.0.1:8000/predict', {
                hours: parseFloat(formData.hours),
                attendance: parseFloat(formData.attendance),
                marks: parseFloat(formData.marks)
            });
            setReport(res.data);
        } catch (err) {
            alert("Connection error. Check backend terminal.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Study Hours</label>
                    <input type="number" value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} required />
                </div>
                <div className="input-group">
                    <label>Attendance %</label>
                    <input type="number" value={formData.attendance} onChange={(e) => setFormData({...formData, attendance: e.target.value})} required />
                </div>
                <div className="input-group">
                    <label>Previous Marks</label>
                    <input type="number" value={formData.marks} onChange={(e) => setFormData({...formData, marks: e.target.value})} required />
                </div>
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? "PROCESSING..." : "ANALYZE NOW"}
                </button>
            </form>
        </div>
    );
};

export default InputForm;