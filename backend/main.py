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
# This specific URL combines the stability of the direct API with the modern Chat format
API_URL = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Math-7B-Instruct/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

@app.get("/generate-aptitude/{company}")
async def generate_aptitude(company: str):
    print(f"--- Initializing Generation for {company} ---")
    
    payload = {
        "model": "Qwen/Qwen2.5-Math-7B-Instruct",
        "messages": [
            {
                "role": "system", 
                "content": f"You are a recruitment examiner for {company}. Generate exactly 10 aptitude MCQs as a raw JSON array. Return ONLY the JSON."
            },
            {
                "role": "user", 
                "content": "Generate the questions. Format: [{\"question\": \"...\", \"options\": [\"A\", \"B\", \"C\", \"D\"], \"answer\": \"...\"}]"
            }
        ],
        "max_tokens": 1500,
        "temperature": 0.7
    }

    try:
        # We use a 60-second timeout because Math models take time to 'think'
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=60)
        
        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Hugging Face API Error")

        result = response.json()
        raw_text = result['choices'][0]['message']['content']
        
        print("SYSTEM: Neural Response Received.")

        # Extracting the JSON array from the response string
        json_match = re.search(r'\[\s*{.*}\s*\]', raw_text, re.DOTALL)
        
        if json_match:
            return json.loads(json_match.group())
        else:
            print(f"Structure Conflict. Raw text: {raw_text[:200]}")
            raise HTTPException(status_code=500, detail="Incompatible Model Output")

    except Exception as e:
        print(f"CRITICAL SYSTEM ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
    