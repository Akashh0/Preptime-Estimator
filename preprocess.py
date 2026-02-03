import pandas as pd
import numpy as np
from typing import Tuple

class DataCleaner:
    def __init__(self, file_path: str):
        self.file_path = file_path

    def load_data(self) -> pd.DataFrame:
        df = pd.read_csv(self.file_path)
        # Standardize timestamp formats immediately
        df['order_time'] = pd.to_datetime(df['order_time'])
        df['pickup_time'] = pd.to_datetime(df['pickup_time'])
        return df

    # In preprocess.py, inside handle_outliers:
    def handle_outliers(self, df: pd.DataFrame) -> pd.DataFrame:
        df['prep_time_actual'] = (df['pickup_time'] - df['order_time']).dt.total_seconds() / 60
    
        # CRITICAL: Keep only orders between 2 and 90 minutes
        df = df[(df['prep_time_actual'] > 2) & (df['prep_time_actual'] < 90)].copy()
    
        # Debug print to check the average prep time
        print(f"Average Prep Time in Dataset: {df['prep_time_actual'].mean():.2f} mins")
        return df