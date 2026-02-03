import sys
import pandas as pd
import xgboost as xgb
import sklearn

print(f"Python Version: {sys.version}")
print(f"Pandas: {pd.__version__}")
print(f"XGBoost: {xgb.__version__}")
print(f"Scikit-Learn: {sklearn.__version__}")

print(f"XGBoost Default Tree Method: {xgb.XGBRegressor().get_params()['tree_method']}")