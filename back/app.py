from flask import Flask
from flask_cors import CORS
from database import db, FULL_URL_DB
from flask_migrate import Migrate
from resources.auth.routes import auth

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = FULL_URL_DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# inicializar
db.init_app(app)

#configurar flask-migrate
migrate = Migrate()
migrate.init_app(app, db)

app.register_blueprint(auth)

# @app.route('/')
# def home():
#     print('home')
#     return jsonify({'mensaje': 'Home'})



if __name__ == '__main__':
    app.run(debug=True)