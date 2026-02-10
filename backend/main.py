import os
import re
import json
import requests
import subprocess
import tempfile
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Initialize environment and app
load_dotenv()
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Configuration
HF_TOKEN = os.getenv("HF_TOKEN")
MODEL_ID = "Qwen/Qwen2.5-7B-Instruct"
API_URL = "https://router.huggingface.co/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

# Data Models for Execution
class CodeExecutionRequest(BaseModel):
    code: str
    language: str

# --- ENDPOINT 1: APTITUDE GENERATOR (PROMPT UNCHANGED) ---
@app.get("/generate-aptitude/{company}")
async def generate_aptitude(company: str):
    """Generates 10 company-specific aptitude MCQs with verified logic."""
    print(f"--- Engineering {company}-Specific Assessment ---")
    
    system_content = f"""
    You are the Senior Assessment Architect for {company}. Generate 10 high-quality aptitude MCQs.
    
    SCENARIO MIXTURE RULES:
    - 40% DAILY LIFE: Street markets, household budgeting, or local commutes.
    - 30% SPORTS & HOBBIES: Cricket, marathons, or library sorting.
    - 30% MODERN PROFESSIONAL: Freelancing, startup scaling, or remote work.
    
    STRICT COMPANY ARCHETYPES:
    - ZOHO: Complex logical puzzles and 'human-compiler' logic.
    - DELOITTE/ACCENTURE: Professional Situational Logic and ethics.
    - TCS/INFOSYS/WIPRO: Foundation quantitative math and clear logic.
    - AMAZON/GOOGLE: Algorithmic thinking and scale-based estimation.

    VERIFICATION PROTOCOL:
    1. Solve the problem step-by-step internally.
    2. Ensure the correct answer is exactly one of the options.
    3. Write a 1-sentence mathematical proof in the 'explanation' field.
    4. NO BRANDING: Do not mention "{company}" in questions.
    """

    user_content = f"Generate 10 mixed-scenario questions mirroring the {company} style. Return raw JSON array."

    payload = {
        "model": MODEL_ID,
        "messages": [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content}
        ],
        "max_tokens": 2500,
        "temperature": 0.1,
        "response_format": { "type": "json_object" } 
    }

    return await call_huggingface_router(payload, "aptitude")

# --- ENDPOINT 2: CODING GENERATOR (PROMPT UNCHANGED) ---
@app.get("/generate-coding/{topic}")
async def generate_coding(topic: str):
    """Generates 5 DSA problems for a specific roadmap node."""
    print(f"--- Reconstructing Neural Thread: {topic} ---")
    
    system_content = f"""
    You are the Lead Technical Interviewer for a Tier-1 Tech Firm. 
    Generate 5 high-quality coding problems based on the topic: {topic}.
    
    COMPLEXITY DISTRIBUTION:
    - 40% FOUNDATION: Array manipulation, basic loops, and hash map lookups.
    - 40% MEDIUM: Sliding windows, two-pointers, or basic recursion.
    - 20% HARD: Optimization-heavy tasks (DP, Graphs, or Greedy).

    STRICT CODING PROTOCOLS:
    - CONSTRAINTS: Provide realistic memory/time limits (e.g., n < 10^5).
    - EXAMPLES: Include at least 2 Test Cases (Input/Output).
    - BOILERPLATE: Provide a Python 3 function signature.
    """

    user_content = f"Generate 5 coding problems for topic '{topic}' as a raw JSON array."

    payload = {
        "model": MODEL_ID,
        "messages": [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content}
        ],
        "max_tokens": 3000,
        "temperature": 0.2, 
        "response_format": { "type": "json_object" } 
    }

    return await call_huggingface_router(payload, "coding")

# --- NEW ENDPOINT 3: LOCAL CODE EXECUTION KERNEL ---
@app.post("/execute-code")
async def execute_code(request: CodeExecutionRequest):
    """Executes code locally and returns stdout/stderr."""
    print(f"--- Executing {request.language} Kernel ---")
    
    if request.language != "python3":
        return {"output": "Currently, only Python 3 execution is optimized for this node."}

    # Create temporary file for execution
    with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as tf:
        tf.write(request.code.encode())
        temp_file_path = tf.name

    try:
        # Run Python code with a 5-second safety timeout
        result = subprocess.run(
            ["python", temp_file_path],
            capture_output=True,
            text=True,
            timeout=5 
        )
        return {"output": result.stdout if result.stdout else result.stderr}

    except subprocess.TimeoutExpired:
        return {"output": "Kernel Error: Execution Timeout (5s limit reached)."}
    except Exception as e:
        return {"output": f"System Error: {str(e)}"}
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

# --- HELPER: ROUTER INTERFACE ---
async def call_huggingface_router(payload, context):
    try:
        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=120)
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Router Error")

        result = response.json()
        raw_text = result['choices'][0]['message']['content']
        
        json_match = re.search(r'\[\s*{.*}\s*\]', raw_text, re.DOTALL)
        
        if json_match:
            return json.loads(json_match.group())
        else:
            data = json.loads(raw_text)
            return data if isinstance(data, list) else data.get("questions" if context == "aptitude" else "problems", data)

    except Exception as e:
        print(f"CRITICAL SYSTEM ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Generation Logic Failed")

if __name__ == "__main__":
    import uvicorn
    # Optimized for local development on your RTX 4050 laptop
    uvicorn.run(app, host="0.0.0.0", port=8000)