import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and data
df = pd.read_csv("Final_Project.csv")
with open('regression_model.pkl', 'rb') as f:
    reg = pickle.load(f)

def predict_price(Area_SqFt, Floor_No, Bedroom):
    x = np.zeros(7)
    x[0] = Area_SqFt
    x[1] = Floor_No
    x[2] = Bedroom
    return reg.predict([x])[0]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        Area_SqFt = data['Area_SqFt']
        Floor_No = data['Floor_No']
        Bedroom = data['Bedroom']
        prediction = predict_price(Area_SqFt, Floor_No, Bedroom)
        return jsonify({'prediction': prediction})
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': 'Failed to process request'}), 500

if __name__ == '__main__':
    app.run(debug=True)
