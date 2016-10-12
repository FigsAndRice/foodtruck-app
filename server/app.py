from flask import Flask

def create_app(config_settings):
	app = Flask(__name__)
	app.config.from_object(config_settings)

	# from restaurants.routes import restaurants_app
	import restaurants
	print restaurants
	# app.register_blueprint(restaurants_app, url_prefix="/api")
	return app