import boto
from flask import current_app
from werkzeug.utils import secure_filename
import os

def s3_upload(source_file):
	source_filename = secure_filename(source_file.filename)

	connect_s3 =  boto.connect_s3(current_app.config['AWS_ACCESS_KEY_ID'], current_app.config['AWS_SECRET_KEY'])
	print current_app.config['BUCKET_NAME']
	bucket = connect_s3.get_bucket(current_app.config['BUCKET_NAME'])

	key = bucket.new_key(source_filename)
	key.set_contents_from_string(source_filename)