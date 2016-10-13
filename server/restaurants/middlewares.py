from flask import current_app
from flask_mail import Message
from app import mail

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
    length_error = len(password) < 8

    # searching for digits
    digit_error = re.search(r"\d", password) is None

    # searching for uppercase
    uppercase_error = re.search(r"[A-Z]", password) is None

    # searching for lowercase
    lowercase_error = re.search(r"[a-z]", password) is None

    # searching for symbols
    symbol_error = re.search(r"\W", password) is None

    # overall result
    password_ok = not ( length_error or digit_error or uppercase_error or lowercase_error or symbol_error )

    return {
        'password_ok' : password_ok,
        'length_error' : length_error,
        'digit_error' : digit_error,
        'uppercase_error' : uppercase_error,
        'lowercase_error' : lowercase_error,
        'symbol_error' : symbol_error,
    }

class Register():
    def __init__(self):
        sender = current_app.config['MAIL_DEFAULT_SENDER']

        msg = Message(
            "Confirmation",
            sender=sender,
            recipients=['danny.b.lim@gmail.com', 'hyeinu65@gmail.com', 'juancafe2@gmail.com', ]
        )

        msg.html = '<div><h3>Welcome Putos</h3> <img src="https://image.freepik.com/free-vector/retro-food-truck_23-2147530708.jpg" alt="" /></div>'
        mail.send(msg)
