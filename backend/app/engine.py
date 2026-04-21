import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def calculate_performance(hours, attendance, marks):
    # Core Calculation
    norm_hours = min((hours / 8) * 100, 100)
    score = round((marks * 0.5) + (attendance * 0.3) + (norm_hours * 0.2), 2)
    
    # Visual Status Mapping
    if score >= 85:
        visual = {"pLabel": "Exceptional", "pClass": "status-success"}
    elif score >= 65:
        visual = {"pLabel": "Needs Attention", "pClass": "status-warning"}
    else:
        visual = {"pLabel": "Priority Risk", "pClass": "status-danger"}

    # Faster AI Configuration
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"Student Profile: Study {hours}h/day, {attendance}% attendance, {marks}% marks. Provide 3 extremely brief, bold, actionable academic improvements."

    try:
        # Lower temperature and max_tokens for speed
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=100,
                temperature=0.5
            )
        )
        insights = [i.strip('* ').strip('- ') for i in response.text.strip().split('\n') if i.strip()]
    except:
        insights = ["Check API key in .env file", "Ensure internet connection", "Restart backend server"]

    return {
        "score": score,
        "visual": visual,
        "insights": insights[:3]
    }