from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app
class Restaurant(db.Document):
  # name = db.StringField(
  #   verbose_name=u'Name',
  #   max_length=100,
  #   required=True
  # )
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

  # cuisine = db.StringField(
  # 	verbose_name=u'Cuisine',
  # 	max_length=100,
  #   required=True,
  # )
  # isOpen = db.BooleanField(
  # 	verbose_name=u'Open',
  # 	default=False
  # )
  # hours = db.IntField(
  # 	verbose_name=u'Hours'
  # )
  # lat = db.StringField(
  # 	verbose_name=u'Lat'
  # )
  # lng = db.StringField(
  # 	verbose_name=u'Lng'
  # )
  # menu = db.ListField(db.StringField(verbose_name=u'Menu', max_length=50))

  def __unicode__(self):
    return self.email

  def __init__(self, *args, **kwargs):
    password = kwargs.pop('pwd', None)
    super(Restaurant, self).__init__(*args, **kwargs)
    if password:
      self.set_password(password)
    kwargs['password'] = self.pwd
    for key in kwargs:
        print "another keyword arg: %s: %s" % (key, kwargs[key])

  def set_password(self, password):
    self.pwd = generate_password_hash(password, method=current_app.config['PROJECT_PASSWORD_HASH_METHOD'])

  def check_password(self, password):
    return check_password_hash(self.pw_hash, password)

