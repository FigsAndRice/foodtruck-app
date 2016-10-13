from flask import (Blueprint, request, jsonify)

restaurants_app = Blueprint('restaurants_app', __name__)

@restaurants_app.route('/register', methods=['POST'])
def register():
	content = request.get_json()
	print content
	return "Hello";

@restaurants_app.route('/', methods=['GET'])
def users():
	return (jsonify({'username': "hyeinuXXX69"}), 200)


	
	