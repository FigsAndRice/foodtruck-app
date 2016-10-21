import boto
from uuid import uuid4
from flask import current_app
from werkzeug.utils import secure_filename
import os

def s3_upload(source_file):
	s3_url = 'https://s3.amazonaws.com/'
	source_filename = secure_filename(source_file.filename)
	source_extension = os.path.splitext(source_filename)[1]

	destination_filename = uuid4().hex + source_extension
	connect_s3 =  boto.connect_s3(current_app.config['AWS_ACCESS_KEY_ID'], current_app.config['AWS_SECRET_KEY'])
	print current_app.config['BUCKET_NAME']
	bucket = connect_s3.get_bucket(current_app.config['BUCKET_NAME'])

	key = bucket.new_key(destination_filename)
	key.set_contents_from_string(source_file.read())
	key.set_canned_acl('public-read')
	return s3_url + current_app.config['BUCKET_NAME'] +'/' + destination_filename