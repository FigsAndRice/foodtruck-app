from app import db

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



