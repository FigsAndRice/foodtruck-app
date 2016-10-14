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
	if len(Restaurant.objects(email=content['email'])):
		return (jsonify({'error': 'Email is alredy in used.'}), 404)
	#2. check password
	check_password = register.check_password()
	if check_password:
		return (jsonify({'error': check_password}), 404)
	#3. hash password
	res = Restaurant(**content)
	res.set_password(content['pwd'])
	register.send_email()
	#4. save
	try:
		res.save()
	except Exception as e:
		return (jsonify({'error': "There is an error at the database. Please try later..."}), 500)
	
	content.pop('pwd', None)
	return (jsonify(content), 200)


@restaurants_app.route('/', methods=['GET', 'DELETE'])
def users():
	if request.method == 'DELETE':
		for res in Restaurant.objects:
			res.delete()
		return jsonify({'message': 'All Restaurants have been deleted'})
	#res = Register()

	# user = Restaurant.objects.get(email="juancafe2@gmail.com")

	# print 'user %s' %user.pwd
	# print user.check_password('admin')
	return (jsonify({'username': u"hyeinuXXX69"}), 200)


	
	