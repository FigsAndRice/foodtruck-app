from flask import (Blueprint)

restaurants_app = Blueprint('restaurants_app', __name__)

@restaurants_app.route('/')
def hello():
	return "Hello Restaurants";