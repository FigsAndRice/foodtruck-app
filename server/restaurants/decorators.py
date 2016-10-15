from flask import session
from functools import wraps

def login_required(f):
	@	wraps(f)
	def required_token(*args, **kwargs):
		if session['email'] is None:
			Response("Access denied")
		return f(*args, **kwargs)
	return required_token