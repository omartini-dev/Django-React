import os
from django.utils.crypto import get_random_string

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
length = 50

def get_secret():
    secret_file =  os.path.join(BASE_DIR, 'briteleader', '.secret.txts')
    secret = ''
    try:
        with open(secret_file) as file:
            secret = file.read()
    except FileNotFoundError as e:
        secret = get_random_string(length=length)
        with open(secret_file, 'w') as file:
            file.write(secret)
    return secret