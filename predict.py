import pandas as pd
import numpy as np
import xgboost as xgb
from datetime import datetime

# Load the trained model
model = xgb.XGBRegressor()
model.load_model("chennai_prep_model.json")

def get_manual_prediction():
    print("\n--- 🍲 Chennai Prep-Time AI Predictor ---")
    
    # Input simulation (In a real app, these come from dropdowns)
    avg_cost = float(input("Enter Restaurant Avg Cost (e.g., 600): "))
    is_raining = int(input("Is it raining? (1 for Yes, 0 for No): "))
    
    # Current time features
    now = datetime.now()
    hour_sin = np.sin(2 * np.pi * now.hour / 24)
    hour_cos = np.cos(2 * np.pi * now.hour / 24)
    is_weekend = 1 if now.weekday() >= 5 else 0
    
    # Static mocks for current demo (Matching feature count: 8)
    kitchen_load = 4  # Simulate a busy kitchen
    cuisine_cat = 2   # Assume Biryani for demo
    loc_cat = 5       # Assume Adyar for demo

    features = pd.DataFrame([[
        hour_sin, hour_cos, kitchen_load, 
        cuisine_cat, loc_cat, avg_cost, 
        is_weekend, is_raining
    ]], columns=['hour_sin', 'hour_cos', 'kitchen_load', 'cuisine_cat', 
                 'loc_cat', 'avg_cost', 'is_weekend', 'is_raining'])
    
    prediction = model.predict(features)[0]
    print(f"\n✅ AI Estimate: {prediction:.2f} minutes")

if __name__ == "__main__":
    get_manual_prediction()