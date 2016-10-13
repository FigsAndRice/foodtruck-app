from flask import (Blueprint, request, jsonify)
from restaurants.models import Restaurant
restaurants_app = Blueprint('restaurants_app', __name__)

@restaurants_app.route('/register', methods=['POST'])
def register():
	content = request.get_json()
	res = Restaurant(email="juancafe4@g.com", pwd="secret")
	# res.save()	
	print content
	return u"Hello";

@restaurants_app.route('/', methods=['GET'])
def users():
	for res in Restaurant.objects:
		print res
	return (jsonify({'username': u"hyeinuXXX69"}), 200)


	
	