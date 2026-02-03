import pandas as pd
import xgboost as xgb
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_absolute_error

class PrepTimeModel:
    def __init__(self):
        # Optimized for XGBoost 3.1.x and Python 3.12
        # In model.py, update the XGBRegressor params:
        self.model = xgb.XGBRegressor(
            n_estimators=500,        # Reduced for faster debugging
            learning_rate=0.1,       # Increased to jump-start learning
            max_depth=6, 
            tree_method='hist', 
            objective='reg:absoluteerror', # Minimize direct minutes off
            early_stopping_rounds=20,
            n_jobs=-1
        )
        # Define features here to keep it consistent
        self.features = [
            'hour_sin', 'hour_cos', 'kitchen_load', 
            'cuisine_cat', 'loc_cat', 'avg_cost', 
            'is_weekend', 'is_raining'
        ]

    def train(self, df: pd.DataFrame):
        X = df[self.features]
        y = df['prep_time_actual']
        
        # Time-based split (80% Train, 20% Test)
        split_idx = int(len(df) * 0.8)
        X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
        
        print(f"Training on {len(X_train)} samples...")
        
        self.model.fit(
            X_train, y_train,
            eval_set=[(X_test, y_test)],
            verbose=100
        )
        
        # Save feature importance plot
        self.plot_importance()
        
        return X_test, y_test

    def get_metrics(self, X_test, y_test):
        preds = self.model.predict(X_test)
        mae = mean_absolute_error(y_test, preds)
        return {"MAE": round(mae, 2)}

    def plot_importance(self):
        """Generates a chart showing which factors influence prep time most."""
        plt.figure(figsize=(10, 6))
        # Get importance scores
        importance = self.model.feature_importances_
        # Create plot
        sns.barplot(x=importance, y=self.features, hue=self.features, palette='viridis', legend=False)
        plt.title('Chennai Prep-Time: Feature Importance')
        plt.xlabel('Importance Score')
        plt.tight_layout()
        plt.savefig('feature_importance.png')
        print("📈 Feature importance plot saved as 'feature_importance.png'")