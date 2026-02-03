import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_chennai_data(records=5000):
    np.random.seed(42)
    
    # Expanded Chennai Neighborhoods (Spatially Diverse)
    locations = [
        'Adyar', 'Velachery', 'Anna Nagar', 'T. Nagar', 'OMR', 'Nungambakkam',
        'Mylapore', 'Besant Nagar', 'Alwarpet', 'Porur', 'Tambaram', 'Siruseri',
        'Guindy', 'Chromepet', 'Kilpauk', 'Royapettah', 'Purasaiwakkam'
    ]

    # Expanded Restaurant Logic (Diverse Cuisine Weights)
    restaurants = {
        # Biryani & High Volume (Complex)
        'Thalappakatti': {'cuisine': 'Biryani', 'avg_cost': 650},
        'Sukkubhai Biryani': {'cuisine': 'Biryani', 'avg_cost': 550},
        'Ya Mohideen': {'cuisine': 'Biryani', 'avg_cost': 500},
        
        # South Indian / Tiffin (Fast during morning, heavy load)
        'Sangeetha': {'cuisine': 'South Indian', 'avg_cost': 350},
        'A2B': {'cuisine': 'South Indian', 'avg_cost': 300},
        'Murugan Idli Shop': {'cuisine': 'South Indian', 'avg_cost': 250},
        'Rayar Mess': {'cuisine': 'South Indian', 'avg_cost': 150},
        
        # North Indian / Multi-Cuisine (Moderate Complexity)
        'Cream Centre': {'cuisine': 'North Indian', 'avg_cost': 900},
        'Copper Chimney': {'cuisine': 'North Indian', 'avg_cost': 1200},
        'Delhi Dhaba': {'cuisine': 'North Indian', 'avg_cost': 450},
        
        # Fast Food & Cafes (Quick Prep)
        'Writer’s Cafe': {'cuisine': 'Fast Food', 'avg_cost': 600},
        'Burgerman': {'cuisine': 'Fast Food', 'avg_cost': 400},
        'Zuka': {'cuisine': 'Dessert', 'avg_cost': 500},
        'Amethyst': {'cuisine': 'Cafe', 'avg_cost': 1000},
        
        # International (High Prep Time)
        'Toscano': {'cuisine': 'Italian', 'avg_cost': 1500},
        'Benjarong': {'cuisine': 'Thai', 'avg_cost': 1800}
    }
    rest_names = list(restaurants.keys())

    data = []
    start_date = datetime(2026, 1, 1, 10, 0) # Starting Jan 2026

    for i in range(records):
        name = np.random.choice(rest_names)
        res_info = restaurants[name]
        loc = np.random.choice(locations)
        
        # Random timestamp
        order_time = start_date + timedelta(
            days=np.random.randint(0, 30),
            hours=np.random.randint(0, 13),
            minutes=np.random.randint(0, 60)
        )
        
        # 1. GRANULAR CUISINE COMPLEXITY LOGIC
        # Tiered system based on typical Chennai kitchen workflows
        cuisine = res_info['cuisine']
        if cuisine in ['Thai', 'Italian']:
            complexity = 3.2  # Fine dining, multiple courses
        elif cuisine == 'Biryani':
            complexity = 2.8  # Large batches, but heavy packing/side-dish prep
        elif cuisine == 'North Indian':
            complexity = 2.4  # Tandoor/Gravy prep time
        elif cuisine in ['Fast Food', 'Cafe']:
            complexity = 1.8  # Standard assembly
        elif cuisine == 'South Indian':
            complexity = 1.2  # Fast turnaround (Idli/Dosa)
        else:
            complexity = 2.0  # Default
            
        # 2. DYNAMIC PEAK LOAD
        hour = order_time.hour
        # Chennai Peak: Lunch (12-3 PM) and Dinner (7-10 PM)
        is_peak = 1.6 if (12 <= hour <= 15 or 19 <= hour <= 22) else 1.0
        
        # 3. CHENNAI WEATHER FACTOR (Simulated)
        # 10% chance of heavy rain affecting kitchen staff/logistics
        is_raining = np.random.choice([1.0, 1.4], p=[0.9, 0.1]) 
        
        # 4. FINAL PREP TIME CALCULATION
        base_prep = 12 # Base minutes for a standard order
        
        # Formula: Base * Complexity * Peak * Weather + Gaussian Noise
        prep_time = (base_prep * complexity * is_peak * is_raining) + np.random.normal(3, 1.5)
        
        # Ensure prep time never drops below a realistic minimum (e.g., 5 mins)
        prep_time = max(5, prep_time)
        
        pickup_time = order_time + timedelta(minutes=prep_time)

        data.append({
            'order_id': f'ORD_{i}',
            'restaurant_id': name,
            'restaurant_name': name,
            'location': loc,
            'cuisine': cuisine,
            'avg_cost': res_info['avg_cost'],
            'order_time': order_time,
            'pickup_time': pickup_time,
            'is_raining': 1 if is_raining > 1.0 else 0 # New column for the model
        })

    df = pd.DataFrame(data)
    df.to_csv('data/chennai_delivery_merged.csv', index=False)
    print("✅ Created 'data/chennai_delivery_merged.csv' with 5000 records.")

if __name__ == "__main__":
    import os
    if not os.path.exists('data'): os.makedirs('data')
    generate_chennai_data()