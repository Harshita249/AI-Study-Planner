from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.engine import calculate_performance
from pydantic import BaseModel

app = FastAPI()

# THIS SECTION IS CRITICAL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # This allows your React app to talk to Python
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    hours: float
    attendance: float
    marks: float

@app.post("/predict")
async def predict(data: Data):
    return calculate_performance(data.hours, data.attendance, data.marks)