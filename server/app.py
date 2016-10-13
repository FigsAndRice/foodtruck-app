from flask import Flask
from flask_mongoengine import MongoEngine
from flask_mail import Mail
from dotenv import load_dotenv, find_dotenv
    

db = MongoEngine()
mail = Mail()
load_dotenv(find_dotenv())

def create_app(config_settings):
	app = Flask(__name__)
	app.config.from_object(config_settings)
	
	db.init_app(app)
	mail.init_app(app)
	
	# from restaurants.routes import restaurants_app
	from restaurants.routes import restaurants_app
	app.register_blueprint(restaurants_app, url_prefix="/api/restaurants")
	return app