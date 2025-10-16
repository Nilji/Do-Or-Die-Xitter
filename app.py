from flask import Flask, request, jsonify
from dotenv import load_dotenv
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']
    
    # Configure DeepSeek API
    openai.api_key = os.getenv("sk-78d5a56b30414d0d890874ee3348d702")
    openai.api_base = "https://api.deepseek.com/v1"  # Verify correct API endpoint
    
    try:
        response = openai.ChatCompletion.create(
            model="deepseek-chat",
            messages=[{"role": "user", "content": user_message}],
            stream=False
        )
        return jsonify({
            "response": response.choices[0].message['content']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)