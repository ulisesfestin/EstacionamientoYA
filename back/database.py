from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# Cargar variables de entorno
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir,'.env'))

# Inicializar objeto sqlalchemy
db = SQLAlchemy()

# Configurar bd
USER_DB = os.getenv("USER_DB")
PASS_DB = os.getenv("PASS_DB")
URL_DB = os.getenv("URL_DB")
NAME_DB = os.getenv("NAME_DB")
FULL_URL_DB = f'postgresql://{USER_DB}:{PASS_DB}@{URL_DB}/{NAME_DB}'

print(FULL_URL_DB)