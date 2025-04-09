from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Simple data
data = {
    "verbal": {"name": "Verbal Reasoning", "url": "https://example.com/verbal", "duration": "20 mins"},
    "logical": {"name": "Logical Reasoning", "url": "https://example.com/logical", "duration": "25 mins"},
}

@app.route("/search")
def search():
    query = request.args.get("q", "").lower()
    return jsonify(data.get(query, {"error": "No result found"}))

if __name__ == "__main__":
    app.run(debug=True)