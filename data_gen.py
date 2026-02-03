import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_chennai_data(records=5000):
    np.random.seed(42)
    
    # 1. Chennai Specific Locations & Restaurants
    locations = ['Adyar', 'Velachery', 'Anna Nagar', 'T. Nagar', 'OMR', 'Nungambakkam']
    restaurants = {
        'Thalappakatti': {'cuisine': 'Biryani', 'avg_cost': 600},
        'Sangeetha': {'cuisine': 'South Indian', 'avg_cost': 300},
        'A2B': {'cuisine': 'South Indian', 'avg_cost': 250},
        'Writer’s Cafe': {'cuisine': 'Fast Food', 'avg_cost': 500},
        'Cream Centre': {'cuisine': 'North Indian', 'avg_cost': 800}
    }
    rest_names = list(restaurants.keys())

    data = []
    start_date = datetime(2026, 1, 1, 10, 0) # Starting Jan 2026

    for i in range(records):
        # Random pick restaurant and its attributes
        name = np.random.choice(rest_names)
        res_info = restaurants[name]
        loc = np.random.choice(locations)
        
        # Random timestamp within a 30-day window
        order_time = start_date + timedelta(
            days=np.random.randint(0, 30),
            hours=np.random.randint(0, 13),
            minutes=np.random.randint(0, 60)
        )
        
        # LOGIC: Base Prep Time + Cuisine Complexity + Kitchen Load + Random Noise
        # Complexity: Biryani (3x) vs South Indian (1x)
        complexity = 3 if res_info['cuisine'] == 'Biryani' else 1.5
        
        # Kitchen Load Simulation (Higher during lunch/dinner hours)
        hour = order_time.hour
        is_peak = 1.5 if (12 <= hour <= 15 or 19 <= hour <= 22) else 1.0
        
        base_prep = 15 # minutes
        prep_time = (base_prep * complexity * is_peak) + np.random.normal(5, 2)
        
        pickup_time = order_time + timedelta(minutes=prep_time)

        data.append({
            'order_id': f'ORD_{i}',
            'restaurant_id': name,
            'restaurant_name': name,
            'location': loc,
            'cuisine': res_info['cuisine'],
            'avg_cost': res_info['avg_cost'],
            'order_time': order_time,
            'pickup_time': pickup_time
        })

    df = pd.DataFrame(data)
    df.to_csv('data/chennai_delivery_merged.csv', index=False)
    print("✅ Created 'data/chennai_delivery_merged.csv' with 5000 records.")

if __name__ == "__main__":
    import os
    if not os.path.exists('data'): os.makedirs('data')
    generate_chennai_data()