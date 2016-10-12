from flask import Flask
from flask_mongoengine import MongoEngine

db = MongoEngine()

def create_app(config_settings):
	app = Flask(__name__)
	app.config.from_object(config_settings)
	
	db.init_app(app)

	
	# from restaurants.routes import restaurants_app
	from restaurants.routes import restaurants_app
	app.register_blueprint(restaurants_app, url_prefix="/api/restaurants")
	return app