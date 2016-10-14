from flask import (Blueprint, request, jsonify)
from restaurants.models import Restaurant
from restaurants.middlewares import Register
restaurants_app = Blueprint('restaurants_app', __name__)

@restaurants_app.route('/register', methods=['POST'])
def register():
	content = request.get_json()
	
	# res = Restaurant(email="juancafe2@gmail.com", pwd="admin")
	# res.set_password('admin')
	# res.save()
	
	# return (jsonify({'error': "Email alredy in used. Try logging in or use another email"}), 400)
	return (jsonify(content), 200)


@restaurants_app.route('/', methods=['GET'])
def users():
	#res = Register()

	user = Restaurant.objects.get(email="juancafe2@gmail.com")

	print 'user %s' %user.pwd
	print user.check_password('admin')
	return (jsonify({'username': u"hyeinuXXX69"}), 200)


	
	