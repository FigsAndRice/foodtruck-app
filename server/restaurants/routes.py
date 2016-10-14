from flask import Blueprint, request, jsonify
from restaurants.models import Restaurant
from restaurants.middlewares import Register
restaurants_app = Blueprint('restaurants_app', __name__)

@restaurants_app.route('/register', methods=['POST'])
def register():
	content = request.get_json()
	
	register = Register(**content)

	#1. check email
	if not register.check_email():
		return (jsonify({'error': 'Not valid email address.'}), 404)
	#2. check password
	check_password = register.check_password()

	if check_password:
		return (jsonify({'error': check_password}), 404)
	#3. hash password
	res = Restaurant(**content)
	res.set_password(content['pwd'])
	register.send_email()
	#4. save
	#res.save()
	content.pop('pwd', None)
	# return (jsonify({'error': "Email alredy in used. Try logging in or use another email"}), 400)
	return (jsonify(content), 200)


@restaurants_app.route('/', methods=['GET'])
def users():
	#res = Register()

	# user = Restaurant.objects.get(email="juancafe2@gmail.com")

	# print 'user %s' %user.pwd
	# print user.check_password('admin')
	return (jsonify({'username': u"hyeinuXXX69"}), 200)


	
	