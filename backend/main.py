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
    print(f"--- Triggering Generation for {company} ---")
    
    payload = {
        "model": MODEL_ID,
        "messages": [
            {
                "role": "system", 
                "content": f"You are a recruitment examiner for {company}. Generate 10 aptitude MCQs as a raw JSON array. Return ONLY valid JSON."
            },
            {
                "role": "user", 
                "content": "Generate 10 questions. Format: [{\"question\": \"...\", \"options\": [\"A\", \"B\", \"C\", \"D\"], \"answer\": \"...\"}]"
            }
        ],
        "max_tokens": 1500,
        "temperature": 0.7,
        # Telling the router we expect JSON helps with stability
        "response_format": { "type": "json_object" } 
    }

    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=90)
        
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