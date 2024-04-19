from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load the pickled model
with open('../models/best_rf_regressor_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Define a route for the home page
@app.route('/', methods=['GET', 'POST'])
def predict_sales():
    prediction = None

    if request.method == 'POST':
        # Get the form data
        quantity = int(request.form['quantity'])
        profit = float(request.form['profit'])
        category = int(request.form['category'])
        sub_category = int(request.form['sub_category'])

        # Create feature array
        features = [
            quantity, profit, category, sub_category
        ]

        print("Received array:", features)
        
        # Convert features to numpy array and reshape
        features_array = np.array(features).reshape(1, -1)

        # Make prediction
        prediction = model.predict(features_array)[0]

    # Render the HTML template with prediction
    return render_template('index.html', prediction=prediction)
    
if __name__ == '__main__':
    app.run(debug=True)
