from flask import jsonify, request, Blueprint
from database import db
from models.User import User


auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    userDB = User.query.filter_by(email=email).first()
    
    if userDB and userDB.password == password:
        return jsonify(role=userDB.role), 200
    else:
        response = {'Message':'Error'}
        return jsonify(response), 400

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = '2'

    # Verificamos si el correo electrónico ya existe
    query = db.session.query(User).filter(User.email == email)
    user = query.first()
    
    if user is not None:
        # El correo electrónico ya existe
        return jsonify({'mensaje': 'El correo electrónico ya está registrado.'}), 400

    user = User(name=name, email=email, password=password, role=role)
    db.session.add(user)
    db.session.commit()
    return jsonify(role=role), 200
