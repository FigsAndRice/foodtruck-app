from flask import session, abort
from functools import wraps

def login_required(f):
	@wraps(f)
	def required_token(*args, **kwargs):
		if not 'email' in session:
			return ('Access Denied', 401)
		return f(*args, **kwargs)
	return required_token
