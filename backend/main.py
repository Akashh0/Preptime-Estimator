import os
import re
import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
)

HF_TOKEN = os.getenv("HF_TOKEN")
# CHANGED: Using the flagship 7B model which is widely supported by the Router
MODEL_ID = "Qwen/Qwen2.5-7B-Instruct"
API_URL = "https://router.huggingface.co/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

@app.get("/generate-aptitude/{company}")
async def generate_aptitude(company: str):
    print(f"--- Generating 100% Verified Questions for {company} ---")
    
    system_content = """You are a precise Aptitude Validator. 
    Your goal is to generate 10 realistic aptitude questions with MATHEMATICALLY PROVEN answers.
    
    CRITICAL INSTRUCTIONS:
    1. VERIFICATION: Before providing the "answer", solve the problem step-by-step in your internal logic to ensure it is 100% correct.
    2. SCENARIOS: Use realistic situations (finance, travel, work). Do NOT mention specific companies.
    3. NO HALLUCINATION: If a math problem involves percentages or ratios, double-check the calculation.
    4. STRUCTURE: Return a JSON array. Each object must include an 'explanation' field showing the steps.
    """

    user_content = """Generate 10 questions. 
    Format: 
    [
      {
        "id": 1,
        "category": "Quantitative/Logical",
        "question": "Realistic scenario text...",
        "options": ["A", "B", "C", "D"],
        "answer": "The exact correct option string",
        "explanation": "Step 1: ... Step 2: ... Therefore, the answer is X."
      }
    ]"""

    payload = {
        "model": MODEL_ID,
        "messages": [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content}
        ],
        "max_tokens": 2500, # Increased for detailed explanations
        "temperature": 0.2, # Lower temperature = More accuracy/Less "creativity"
        "response_format": { "type": "json_object" } 
    }

    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=120)
        # ... (rest of your existing JSON extraction logic)
        
        if response.status_code != 200:
            print(f"Router Error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Router Handshake Failed")

        result = response.json()
        raw_text = result['choices'][0]['message']['content']
        
        print("SYSTEM: Neural Response Received.")

        # Clean JSON extraction
        json_match = re.search(r'\[\s*{.*}\s*\]', raw_text, re.DOTALL)
        
        if json_match:
            return json.loads(json_match.group())
        else:
            # Fallback for models that return raw JSON without brackets
            return json.loads(raw_text)

    except Exception as e:
        print(f"CRITICAL SYSTEM ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Generation Logic Failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)