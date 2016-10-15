from flask import current_app, render_template
from flask_mail import Message
from app import mail
from validators import email
import re

def password_check(password):
    """
    Verify the strength of 'password'
    Returns a dict indicating the wrong criteria
    A password is considered strong if:
        8 characters length or more
        1 digit or more
        1 symbol or more
        1 uppercase letter or more
        1 lowercase letter or more
    """

    # calculating the length
    short_length_error = len(password) < 8 
    long_length_error = len(password) > 16

    # searching for digits
    digit_error = re.search(r"\d", password) is None

    # searching for uppercase
    uppercase_error = re.search(r"[A-Z]", password) is None

    # searching for lowercase
    lowercase_error = re.search(r"[a-z]", password) is None

    # searching for symbols
    symbol_error = re.search(r"\W", password) is None

    # overall result
    password_ok = not ( short_length_error or long_length_error or digit_error or uppercase_error or lowercase_error or symbol_error )

    return {
        'password_ok' : password_ok,
        'short_length_error' : short_length_error,
        'long_length_error' : long_length_error,
        'digit_error' : digit_error,
        'uppercase_error' : uppercase_error,
        'lowercase_error' : lowercase_error,
        'symbol_error' : symbol_error,
    }


##Conditinons name email pwd cuisine
class Register():
    def __init__(self,  **kwargs):
        for (k, v) in kwargs.items():
         setattr(self, k, v)


    #Verifes if the email alredy exists and if the email is valid
    def check_email(self):
        if not email(self.email):
            return False
        return True
    
    #verifies if password meets the requirements
    def check_password(self):
        result = password_check(self.pwd)
        if result['short_length_error']:
            return 'Password must have at least 8 characters.'
        if result['long_length_error']:   
            return 'Password must be less than 16 characters.'
        if result['digit_error']:
            return 'Password must contain at least one digit.'
        if result['uppercase_error']:
            return 'Password must contain at least one uppercase letter.'
        if result['lowercase_error']:
            return 'Password must contain at least one lowercase letter.'
        if result['symbol_error']:
            return 'Password must contain at least one symbol !@#$%^&*()_+=-<>:"...'

        return ''
    #sends email
    def send_email(self):
        sender = current_app.config['MAIL_DEFAULT_SENDER']
        
        msg = Message(
            "Confirmation",
            sender=sender,
            recipients=[self.email]
        )

        context = dict(
            name=self.name,
            email=self.email
        )

        html = render_template(
            'confirmation.html', **context
        )
        msg.html = html
        mail.send(msg)


