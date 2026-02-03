class FeatureEngineer:
    @staticmethod
    def apply_features(df: pd.DataFrame) -> pd.DataFrame:
        # 1. Cyclic Time Features (Best for XGBoost)
        df['hour_sin'] = np.sin(2 * np.pi * df['order_time'].dt.hour / 24)
        df['hour_cos'] = np.cos(2 * np.pi * df['order_time'].dt.hour / 24)
        
        # 2. Kitchen Load (Dynamic Window)
        df = df.sort_values('order_time')
        # Count orders in the last 45 mins for each restaurant
        df['kitchen_load'] = df.groupby('restaurant_id')['order_time'] \
                               .rolling('45T').count().values - 1
        
        # 3. Categorical Encoding
        df['cuisine_cat'] = df['cuisine'].astype('category').cat.codes
        df['loc_cat'] = df['location'].astype('category').cat.codes
        
        return df