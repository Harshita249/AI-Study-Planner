# 🚀 AI Study Planner

An interactive, full-stack web application that predicts student performance and provides actionable study insights. This project features a modern **Aurora-themed** glassmorphism UI with a high-performance FastAPI backend.

---

## ✨ Key Features
* **Predictive Analytics:** Calculates expected exam scores based on study hours, attendance, and previous academic data.
* **Performance Categorization:** * **Excellent (90%+):** High-level focus with advanced expert tips.
    * **Good (75-89%):** Balanced feedback for steady improvement.
    * **Average (Below 75%):** Specific actionable areas of improvement.
* **Dynamic UI:** The interface changes based on results—"Areas of Improvement" automatically hide when you reach the "Excellent" tier.
* **Data Integrity:** Integrated Pydantic validators to prevent unrealistic data entry (e.g., >24 study hours).
* **Aurora Design:** Sleek, modern glassmorphism UI with glowing gradients and responsive layout.

---

## 🛠️ Tech Stack

---
### 🎨 Frontend
- React.js
- Axios (API Integration)
- CSS3 (Custom Glassmorphism & Aurora animations)

### ⚙️ Backend
- Python 3.x
- FastAPI
- Pydantic (Data Validation)
- Scikit-learn (Linear Regression)
---

## 🚀 Installation & Setup

### 1. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Activate your virtual environment
.\venv\Scripts\Activate.ps1

# Install required packages
pip install fastapi uvicorn pydantic scikit-learn

# Start the FastAPI server
uvicorn app.main:app --reload

### 🎨 2. Frontend Setup

# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
