"""
Tech Pulse - ML Prediction Model
Trains a simple model to predict trending technologies
"""

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pickle
from datetime import datetime, timedelta
import json
import os

class TechTrendPredictor:
    def __init__(self):
        self.model = LinearRegression()
        self.scaler = StandardScaler()
        self.tech_list = []
        self.is_trained = False

    def prepare_data_from_sheet(self, data):
        """
        Convert Google Sheets data to training format
        data: List of dictionaries from Google Sheets
        """
        if not data:
            print("No data available for training")
            return None

        # Extract technology usage over time
        tech_counts = {}
        dates = []
        
        for row in data:
            # Try to get timestamp
            timestamp = row.get('timestamp', '')
            if timestamp:
                try:
                    # Parse various date formats
                    if isinstance(timestamp, str):
                        date = pd.to_datetime(timestamp, errors='coerce')
                    else:
                        date = timestamp
                    dates.append(date)
                except:
                    dates.append(datetime.now())

            # Extract technologies
            tech_columns = [
                'which tools or frameworks do you use in your daily work?',
                'which of the following technology areas are you interested in?'
            ]
            
            for col in tech_columns:
                if row.get(col):
                    techs = str(row[col]).split(',')
                    for tech in techs:
                        tech = tech.strip().lower()
                        if tech:
                            if tech not in tech_counts:
                                tech_counts[tech] = []
                            tech_counts[tech].append(date if dates else datetime.now())

        # Create time series data
        if not dates:
            print("No valid timestamps found")
            return None

        # Get unique tech list
        self.tech_list = list(tech_counts.keys())[:20]  # Top 20 techs
        
        # Create features: day of week, day of month, tech counts
        X = []
        y = []
        
        for i, date in enumerate(sorted(set(dates))):
            features = [
                date.day,
                date.weekday(),
                date.month,
            ]
            
            # Add tech counts for this date
            for tech in self.tech_list:
                count = len([d for d in tech_counts.get(tech, []) if d.date() == date.date()])
                features.append(count)
            
            X.append(features)
            # Predict next day's total tech mentions
            y.append(sum(len(tech_counts.get(tech, [])) for tech in self.tech_list))

        return np.array(X), np.array(y), self.tech_list

    def train(self, data):
        """Train the model on historical data"""
        result = self.prepare_data_from_sheet(data)
        
        if result is None:
            print("Could not prepare data")
            return False

        X, y, tech_list = result
        
        if len(X) < 3:
            print("Not enough data points for training (need at least 3)")
            return False

        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train
        self.model.fit(X_scaled, y)
        self.is_trained = True
        
        print(f"✅ Model trained on {len(X)} data points")
        print(f"📊 Tracking {len(tech_list)} technologies")
        return True

    def predict_next_trend(self, last_date=None):
        """
        Predict trending technologies for next period
        """
        if not self.is_trained:
            return None

        if last_date is None:
            last_date = datetime.now()
        
        # Prepare features for next day
        next_date = last_date + timedelta(days=7)  # Predict next week
        
        features = [
            next_date.day,
            next_date.weekday(),
            next_date.month,
        ]
        
        # Add current tech counts (use recent average)
        # In real scenario, you'd use actual recent counts
        for _ in self.tech_list:
            features.append(0)  # Placeholder
        
        X = np.array([features])
        X_scaled = self.scaler.transform(X)
        
        prediction = self.model.predict(X_scaled)[0]
        
        return {
            'predicted_mentions': max(0, int(prediction)),
            'prediction_date': next_date.isoformat(),
            'trend_direction': 'up' if prediction > 0 else 'stable'
        }

    def predict_top_trending(self, current_counts, days_ahead=30):
        """
        Predict which technologies will trend in next N days
        current_counts: dict of {tech: count}
        """
        if not self.is_trained:
            return []

        # Simple linear projection based on current growth
        trends = []
        
        for tech, count in current_counts.items():
            if tech.lower() in [t.lower() for t in self.tech_list]:
                # Simple growth prediction (in real scenario, use time series)
                growth_rate = 1.1  # 10% growth assumption
                predicted = count * (growth_rate ** (days_ahead / 30))
                
                trends.append({
                    'tech': tech,
                    'current_count': count,
                    'predicted_count': int(predicted),
                    'growth_percentage': int(((predicted - count) / count) * 100) if count > 0 else 0
                })
        
        return sorted(trends, key=lambda x: x['predicted_count'], reverse=True)[:5]

    def save_model(self, filepath='model.pkl'):
        """Save trained model"""
        if not self.is_trained:
            return False
        
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'tech_list': self.tech_list,
            'trained_date': datetime.now().isoformat()
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        
        print(f"✅ Model saved to {filepath}")
        return True

    def load_model(self, filepath='model.pkl'):
        """Load trained model"""
        if not os.path.exists(filepath):
            return False
        
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.tech_list = model_data['tech_list']
        self.is_trained = True
        
        print(f"✅ Model loaded from {filepath}")
        return True


def train_from_json(json_file='../backend/data/export.json'):
    """
    Train model from exported JSON data
    """
    predictor = TechTrendPredictor()
    
    if os.path.exists(json_file):
        with open(json_file, 'r') as f:
            data = json.load(f)
        
        if predictor.train(data):
            predictor.save_model('model.pkl')
            return predictor
    else:
        print(f"⚠️  JSON file not found: {json_file}")
        print("💡 Export data from Google Sheets first, or use API endpoint")
    
    return None


if __name__ == '__main__':
    # Example usage
    print("🤖 Tech Pulse ML Model Trainer")
    print("=" * 50)
    
    # For demo, create sample data structure
    sample_data = [
        {
            'timestamp': '2024-01-01',
            'which tools or frameworks do you use in your daily work?': 'React, Node.js',
            'which of the following technology areas are you interested in?': 'Frontend Development'
        },
        {
            'timestamp': '2024-01-02',
            'which tools or frameworks do you use in your daily work?': 'Python, Flask',
            'which of the following technology areas are you interested in?': 'Backend / APIs'
        },
    ]
    
    predictor = TechTrendPredictor()
    
    if predictor.train(sample_data):
        prediction = predictor.predict_next_trend()
        print(f"\n📈 Next Week Prediction: {prediction}")
        
        current_counts = {'React': 10, 'Node.js': 8, 'Python': 12}
        trends = predictor.predict_top_trending(current_counts)
        print(f"\n🔥 Top Trending Predictions:")
        for trend in trends:
            print(f"  {trend['tech']}: {trend['current_count']} → {trend['predicted_count']} (+{trend['growth_percentage']}%)")
    else:
        print("⚠️  Training failed - need more data")

