from flask import (Blueprint, request, jsonify)
from restaurants.models import Restaurant
from restaurants.middlewares import Register
restaurants_app = Blueprint('restaurants_app', __name__)

@restaurants_app.route('/register', methods=['POST'])
def register():
	content = request.get_json()
	try:
		res = Restaurant(email="juancafe2@gmail.com", pwd="secret")
		res.save()
	except:
		return (jsonify({'error': "Email alredy in used. Try logging in or use another email"}), 400)
	print content
	return u"Hello";

@restaurants_app.route('/', methods=['GET'])
def users():
	res = Register()
	return (jsonify({'username': u"hyeinuXXX69"}), 200)


	
	