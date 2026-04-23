const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side check to prevent the 422 error in the first place
    if (formData.study_hours > 24 || formData.attendance > 100 || formData.previous_marks >= 100) {
        alert("Please enter valid data: Hours <= 24, Attendance <= 100, Marks < 100");
        return;
    }

    try {
        // 2. Ensure keys match the Python "StudySession" class exactly
        const response = await axios.post('http://127.0.0.1:8000/predict', {
            study_hours: parseFloat(formData.study_hours),
            attendance: parseFloat(formData.attendance),
            previous_marks: parseFloat(formData.previous_marks)
        });
        setResults(response.data);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log("Validation Error Details:", error.response.data.detail);
            alert("Backend rejected the data. Check the console for details.");
        }
    }
};