import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_absolute_error

class PrepTimeModel:
    def __init__(self):
        self.model = xgb.XGBRegressor(
            n_estimators=1500,
            learning_rate=0.02,
            max_depth=8,
            subsample=0.8,
            colsample_bytree=0.9,
            tree_method='hist',  # Fast & Memory efficient
            objective='reg:pseudohubererror', 
            early_stopping_rounds=50,
            n_jobs=-1
        )

    def train(self, df: pd.DataFrame):
        features = ['hour_sin', 'hour_cos', 'kitchen_load', 'cuisine_cat', 'loc_cat', 'avg_cost']
        X = df[features]
        y = df['prep_time_actual']
        
        # Split: 80% train, 20% test (Time-based)
        split_idx = int(len(df) * 0.8)
        X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
        
        self.model.fit(
            X_train, y_train,
            eval_set=[(X_test, y_test)],
            verbose=100
        )
        return X_test, y_test

    def get_metrics(self, X_test, y_test):
        preds = self.model.predict(X_test)
        return {"MAE": mean_absolute_error(y_test, preds)}