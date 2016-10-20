from flask import Blueprint, request, jsonify, session
from restaurants.models import Restaurant
from restaurants.middlewares import Register
from decorators import login_required
from itsdangerous import BadData, SignatureExpired
restaurants_app = Blueprint('restaurants_app', __name__)

#Register route
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

#Get or Delete al the users
@restaurants_app.route('/', methods=['GET', 'DELETE'])
def users():
	#Deletes ALL users
	if request.method == 'DELETE':
		for res in Restaurant.objects:
			res.delete()
		return jsonify({'message': 'All Restaurants have been deleted'})

	if request.method == 'GET':
		users = []

		for res in Restaurant.objects:
			res.pwd = None
			users.append(res)
		return jsonify(results = users)

#Update user
@restaurants_app.route('/<id>', methods=['GET', 'DELETE', 'PUT'])
def update(id):
	user = 	Restaurant.objects(id=id).first()
	if not len(user):
		return jsonify({'error': 'Food Truck could not be found!'}), 400

	#get by id
	if request.method == 'GET':
		user['pwd'] = None
		return jsonify(results = user)
	#delete by id
	if request.method == 'DELETE':
		user.delete()
		return jsonify({'message': 'User has been deleted'}), 400
	#update by id
	if request.method == 'PUT':
		content = request.get_json()

		user.modify(**content)
		user = 	Restaurant.objects(id=id).first()
		return jsonify(results = user)


@restaurants_app.route('/login', methods=['POST'])
def login():
	content = request.get_json()
	email = content['email']

	if 'email' in session:
		return jsonify({'error': 'User alredy login.'})

	user = Restaurant.objects(email=email).first()

	if not user :
		return jsonify({"error": "Error logging in. Please try again."}), 401
	print user.check_password(content['pwd'])
	if not user.check_password(content['pwd']):
		return jsonify({"error": "Error logging in. Please try again."}), 401
	session['email'] = content['email']
	return jsonify({'message': 'You are login!'})

@restaurants_app.route('/logout', methods=['GET'])
def logout():
	session.clear()
	return jsonify({"message": "You have been logout"})


@restaurants_app.route('/profile', methods=['GET'])
@login_required
def profile():
	user =  Restaurant.objects(email=session['email']).first()
	id = str(user['id'])
	return jsonify(results = user)


#First user must login
#JSON requirements are email, old_pwd, new_pwd

@restaurants_app.route('/passowrd', methods=['POST'])
@login_required
def change_password():
	content = request.get_json()

	user = Restaurant.objects(email=content['email']).first()

	if not user:
		return jsonify({"error": "Invalid email address."}), 404
	if not user.check_password(content['old_pwd']):
		return jsonify({"error": "Old password is incorrect."}), 404

	register = Register(pwd = content['new_pwd'])
	check_password = register.check_password()
	if check_password:
		return (jsonify({'error': check_password}), 404)
	user.set_password(content['new_pwd'])

	user.save()

	return jsonify({'message': 'Password updated.'})


'''
	maxLatitude
	minLatitude
	maxLongitude
	minLongitude
'''
@restaurants_app.route('/location', methods=['PUT'])
def get_by_location():
	content = request.get_json()

	res = Restaurant.objects(lat__lte=content['maxLatitude'],
		lat__gte=content['minLatitude'], lng__lte=content['maxLongitude'],
		lng__gte=content['minLongitude'])

	return jsonify(results= res)


#Conditions email=email_address
#gets token from user 
@restaurants_app.route('/token', methods=['POST'])
def get_token():
	content = request.get_json()

	user = Restaurant.objects(email=content['email']).first()
	if user:
		token = user.get_token()
		token = token.split('.', 2)[2]
		return token

	return jsonify({'error': 'Email not found.'}), 404


#email, new_pwd, token
@restaurants_app.route('/secret', methods=['POST'])
def reset_password():
	content = request.get_json()

	user = Restaurant.objects(email=content['email']).first()

	if not user:
		return jsonify({'error': 'Email not found.'}), 404
	try:
		user.check_token_password(content['token'])
	except SignatureExpired:
		return jsonify({"error": "Your token has expired."}), 404
	except BadData:
		return jsonify({'error': 'Wrong token.'}), 404
	return 'good token'
