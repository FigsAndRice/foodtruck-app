import os

# Flask configuration 
DEBUG = True
TESTING = False
SECRET_KEY = '\xedaK\xb9\xfc\xf90&\x05(i\xe6XVB\x03\x04\xbf\xff\xd6$MP\xc4'

# flask wtf settings
WTF_CSRF_ENABLED = True


# flask mail settings
MAIL_DEFAULT_SENDER = 'figsandrice@gmail.com'
MAIL_PASSWORD = str(os.environ['EMAIL_PASSWORD'])
MAIL_USERNAME = str(os.environ['EMAIL_USERNAME'])
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True

#Mongo Settings
MONGODB = 'food_truck_finder'
MONGODB_SETTINGS = {
	'db': 'food_truck_finder',
	'host': 'mongodb://<dbuser>:<dbpassword>@ds057066.mlab.com:57066/food_truck_finder',
	'port': 57066,
	'username': 'juancafe2',
	'password': 'admin'
}

#project settings
PROJECT_PASSWORD_HASH_METHOD = 'pbkdf2:sha1'