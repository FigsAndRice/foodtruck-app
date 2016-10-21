import boto
from flask import current_app
from werkzeug.utils import secure_filename
import os

def s3_upload(source_file):
	source_filename = secure_filename(source_file.filename)

	connect_s3 =  boto.connect_s3(current_app.config['AWS_ACCESS_KEY_ID'], current_app.config['AWS_SECRET_KEY'])
	#bucket = connect_s3.get_bucket(current_app.config["BUCKET_NAME "])

	for bucket in connect_s3.get_all_buckets():
		print "{name}\t{created}".format(
                name = bucket.name,
                created = bucket.creation_date,
        )