import pandas as pd
import numpy as np

class FeatureEngineer:
    @staticmethod
    def apply_features(df: pd.DataFrame) -> pd.DataFrame:
        # 1. Cyclic Time Features
        df['hour_sin'] = np.sin(2 * np.pi * df['order_time'].dt.hour / 24)
        df['hour_cos'] = np.cos(2 * np.pi * df['order_time'].dt.hour / 24)
        
        # 2. Weekend Flag
        df['is_weekend'] = df['order_time'].dt.dayofweek.isin([5, 6]).astype(int)
        
        # 3. Kitchen Load (Dynamic Window) - FIXED FOR PANDAS 3.0+
        df = df.sort_values('order_time')
        
        # To use '45T', the column must be the index
        df = df.set_index('order_time')
        
        # Calculate rolling count based on time index
        # We use '45min' (more explicit than '45T' in newer versions)
        df['kitchen_load'] = df.groupby('restaurant_id')['restaurant_id'] \
                               .rolling('45min').count().values - 1
        
        # Reset index to get 'order_time' back as a column
        df = df.reset_index()
        
        # 4. Categorical Encoding
        df['cuisine_cat'] = df['cuisine'].astype('category').cat.codes
        df['loc_cat'] = df['location'].astype('category').cat.codes
        
        # 5. Weather Pass-through
        if 'is_raining' not in df.columns:
            df['is_raining'] = 0
            
        return df