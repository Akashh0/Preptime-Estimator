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
    allow_methods=["*"],
    allow_headers=["*"],
)

HF_TOKEN = os.getenv("HF_TOKEN")
MODEL_ID = "Qwen/Qwen2.5-7B-Instruct"
API_URL = "https://router.huggingface.co/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

@app.get("/generate-aptitude/{company}")
async def generate_aptitude(company: str):
    print(f"--- Engineering {company}-Specific Assessment with Diversified Scenarios ---")
    
    # SYSTEM PROMPT: Mixed Scenarios + Verified Logic
    system_content = f"""
    You are the Senior Assessment Architect for {company}. Generate 10 high-quality aptitude MCQs.
    
    SCENARIO MIXTURE RULES (MANDATORY):
    - 40% DAILY LIFE: Street markets, household budgeting, kitchen chemistry, or local commutes.
    - 30% SPORTS & HOBBIES: Cricket match scores, marathon pacing, library book sorting, or social gatherings.
    - 30% MODERN PROFESSIONAL: Freelance gigs, startup scaling, server uptime, or remote work productivity.
    
    STRICT COMPANY ARCHETYPES:
    1. ZOHO: Pure logical puzzles and human-compiler loops.
    2. DELOITTE/ACCENTURE: Professional Situational Logic.
    3. TCS/INFOSYS/WIPRO: Foundation quantitative and verbal logic.
    4. GOOGLE/AMAZON: Algorithmic thinking and large-scale data logic.

    VERIFICATION PROTOCOL:
    - Step 1: Solve the problem step-by-step internally.
    - Step 2: Ensure the correct answer is exactly one of the options.
    - Step 3: Write a 1-sentence mathematical proof in the 'explanation' field.
    - STRICTURE: DO NOT mention "{company}" in the questions. Use "A person," "A team," or "An entrepreneur."
    """

    user_content = f"""
    Generate 10 mixed-scenario questions mirroring the {company} style.
    Format: 
    [
      {{
        "id": 1,
        "category": "Quantitative/Logical",
        "question": "A scenario-based word problem...",
        "options": ["Opt A", "Opt B", "Opt C", "Opt D"],
        "answer": "Exact correct string",
        "explanation": "Mathematical proof..."
      }}
    ]
    """

    payload = {
        "model": MODEL_ID,
        "messages": [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content}
        ],
        "max_tokens": 2500,
        "temperature": 0.1, # Forced determinism for zero-hallucination math
        "response_format": { "type": "json_object" } 
    }

    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=120)
        
        if response.status_code != 200:
            print(f"Router Error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Router Handshake Failed")

        result = response.json()
        raw_text = result['choices'][0]['message']['content']
        
        print(f"SYSTEM: {company} Neutral Stream Received.")

        # Clean JSON extraction
        json_match = re.search(r'\[\s*{.*}\s*\]', raw_text, re.DOTALL)
        
        if json_match:
            return json.loads(json_match.group())
        else:
            data = json.loads(raw_text)
            return data if isinstance(data, list) else data.get("questions", data)

    except Exception as e:
        print(f"CRITICAL SYSTEM ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Generation Logic Failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)