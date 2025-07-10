from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

TRIPS_FILE = 'trips.json'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/trips', methods=['GET'])
def get_trips():
    if os.path.exists(TRIPS_FILE):
        with open(TRIPS_FILE, 'r') as f:
            data = json.load(f)
            return jsonify(data)
    return jsonify([])

@app.route('/api/trips', methods=['POST'])
def save_trips():
    data = request.get_json()
    with open(TRIPS_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    return jsonify({'status': 'success'})
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
