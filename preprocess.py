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

    def handle_outliers(self, df: pd.DataFrame) -> pd.DataFrame:
        """Removes data noise like 1-minute or 5-hour prep times."""
        df['prep_time_actual'] = (df['pickup_time'] - df['order_time']).dt.total_seconds() / 60
        # Realistic bounds for Chennai kitchens
        return df[(df['prep_time_actual'] >= 3) & (df['prep_time_actual'] <= 90)].copy()