from flask import Flask, request, jsonify, Blueprint
import google.generativeai as genai
import logging
import os
app = Flask(__name__)
chat_bp = Blueprint('chat',__name__)
# Configuration
app.config.from_object('config')
# Logging
logging.basicConfig(filename='app.log', level=logging.DEBUG)
# Error handling
@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.error(f"Exception occurred: {e}")
    return jsonify({'error': 'An unexpected error occurred. Please try again later.'}), 500
@chat_bp.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json['message']
        genai.configure(api_key=app.config['API_KEY'])
        response = genai.chat(messages=[user_message])
        return jsonify({'response': response.last})
    except KeyError:
        app.logger.error("KeyError: Invalid request payload")
        return jsonify({'error': 'Invalid request payload'}), 400
app.register_blueprint(chat_bp)
if __name__ == '__main__':
    app.run()
