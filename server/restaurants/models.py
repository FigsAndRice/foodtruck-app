from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app
from itsdangerous import TimedSerializer

class Restaurant(db.Document):
  name = db.StringField(
    verbose_name=u'Name',
    max_length=100,
    required=True
  )
  email = db.EmailField (
  	verbose_name=u'Email',
    max_length=100,
    required=True,
    unique=True
  )

  pwd = db.StringField(
    verbose_name='Password',
    max_length=100,
  	required=True
  )

  cuisine = db.StringField(
  	verbose_name=u'Cuisine',
  	max_length=100,
    required=True,
  )
  isOpen = db.BooleanField(
  	verbose_name=u'Open',
  	default=False
  )
  hours = db.IntField(
  	verbose_name=u'Hours',
    default=0
  )
  lat = db.DecimalField(
  	verbose_name=u'Lat',
    default=0.00,
    precision=9
  )
  lng = db.DecimalField(
  	verbose_name=u'Lng',
    default=0.00,
    precision=9
  )
  menu = db.ListField(db.StringField(verbose_name=u'Menu', max_length=50))

  def __unicode__(self):
    return self.email

  def __init__(self, *args, **kwargs):  
    super(Restaurant, self).__init__(*args, **kwargs)

  def set_password(self, password):
    self.pwd = generate_password_hash(password, method=current_app.config['PROJECT_PASSWORD_HASH_METHOD'])

  def check_password(self, password):
    return check_password_hash(self.pwd, password)

  def get_token(self):
    serializer = TimedSerializer(current_app.config['SECRET_KEY'])
    token = serializer.dumps(self.email)
    return token

  def check_token_password(self, token):
    serializer = TimedSerializer(current_app.config['SECRET_KEY'])
    full_token = '"' + self.email + '".' + token

    return serializer.loads(full_token, max_age=1800)

  def change_password(self, new_password):
    self.set_password(new_password)

