from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator

app = FastAPI()

# Enable CORS so your React frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model with strict validation rules
class StudySession(BaseModel):
    study_hours: float = Field(..., description="Daily study hours")
    attendance: float = Field(..., description="Attendance percentage")
    previous_marks: float = Field(..., description="Last exam score")

    # Custom Validations for your specific requirements
    @validator('study_hours')
    def hours_check(cls, v):
        if v > 24:
            raise ValueError('Time more than 24 hours cannot be added')
        return v

    @validator('attendance')
    def attendance_check(cls, v):
        if v > 100:
            raise ValueError('Attendance more than 100 percent cannot be added')
        return v

    @validator('previous_marks')
    def marks_check(cls, v):
        if v >= 100:
            raise ValueError('Previous marks 100 cannot be added')
        return v

@app.post("/predict")
async def predict_score(data: StudySession):
    # Simple logic to simulate a prediction score based on inputs
    # You can replace this with your actual ML model .predict() call later
    base_score = (data.study_hours * 3) + (data.attendance * 0.4) + (data.previous_marks * 0.3)
    predicted_score = min(99, round(base_score, 2))

    # Generate Dynamic Insights based on the data
    improvement_areas = []
    tips = []

    if data.attendance < 80:
        improvement_areas.append("Class Engagement")
        tips.append("Try to attend morning sessions to increase your attendance score.")
    
    if data.study_hours < 5:
        improvement_areas.append("Self-Study Consistency")
        tips.append("Increase daily deep-work sessions by at least 2 hours.")
    
    if not improvement_areas:
        improvement_areas.append("Advanced Concepts")
        tips.append("Focus on solving previous year's high-difficulty questions.")

    return {
        "score": predicted_score,
        "improvement_area": ", ".join(improvement_areas),
        "expert_tip": tips[0] if tips else "Keep up the consistent effort!",
        "status": "success"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)