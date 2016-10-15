from flask import Blueprint, request, jsonify, session
from restaurants.models import Restaurant
from restaurants.middlewares import Register
from decorators import login_required
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
		return jsonify(users)


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
	return jsonify(Restaurant.objects(email=session['email']).first())
