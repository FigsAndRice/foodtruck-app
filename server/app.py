from flask import Flask

def create_app(config_settings):
	app = Flask(__name__)
	app.config.from_object(config_settings)
	return app