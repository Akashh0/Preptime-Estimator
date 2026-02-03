from preprocess import DataCleaner
from features import FeatureEngineer
from model import PrepTimeModel

def main():
    # 1. Pipeline Start
    cleaner = DataCleaner('data/chennai_delivery_merged.csv')
    df = cleaner.load_data()
    df = cleaner.handle_outliers(df)
    
    # 2. Feature Injection
    df = FeatureEngineer.apply_features(df)
    
    # 3. Model Training
    trainer = PrepTimeModel()
    X_test, y_test = trainer.train(df)
    
    # 4. Results
    results = trainer.get_metrics(X_test, y_test)
    print(f"🎯 Final Performance: {results}")

if __name__ == "__main__":
    main()