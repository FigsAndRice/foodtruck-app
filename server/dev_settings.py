# Flask configuration 
DEBUG = True
TESTING = False
SECRET_KEY = '\xedaK\xb9\xfc\xf90&\x05(i\xe6XVB\x03\x04\xbf\xff\xd6$MP\xc4'

# flask wtf settings
WTF_CSRF_ENABLED = True

# flask mail settings
MAIL_DEFAULT_SENDER = 'admin@wherethefood.tk'

#Mongo Settings
MONGODB_SETTINGS = {
	'DB': 'food_truck_finder',
	 'HOST': 'mongodb://juancafe2:admin@ds057066.mlab.com:57066/food_truck_finder'
}