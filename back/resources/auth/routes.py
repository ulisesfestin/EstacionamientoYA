from flask import jsonify, request, Blueprint
from database import db
from models.User import User


auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    emailDb = User.query.filter_by(email=email).first()
    
    if emailDb and emailDb.password == password:
        response = {'Mensaje':'Inicio de sesión exitoso.'}
        return jsonify(response), 201
    else:
        response = {'Message':'Error'}
        return jsonify(response), 401

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    

    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario registrado con éxito.'}), 201