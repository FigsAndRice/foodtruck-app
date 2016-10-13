# Flask configuration 
DEBUG = True
TESTING = False
SECRET_KEY = '\xedaK\xb9\xfc\xf90&\x05(i\xe6XVB\x03\x04\xbf\xff\xd6$MP\xc4'

# flask wtf settings
WTF_CSRF_ENABLED = True

# flask mail settings
MAIL_DEFAULT_SENDER = 'figsandrice@gmail.com'
MAIL_USERNAME = 'figsandrice@gmail.com'
MAIL_PASSWORD = 'xA3g2@b4'
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True

#Mongo Settings
MONGODB_SETTINGS = {
	'db': 'food_truck_finder'
	# 'host': 'mongodb://juancafe2:admin@ds057066.mlab.com:57066/food_truck_finder'
}

#project settings
PROJECT_PASSWORD_HASH_METHOD = 'pbkdf2:sha1'