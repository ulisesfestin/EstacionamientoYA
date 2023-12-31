from flask import Flask
from flask_cors import CORS
from database import db, FULL_URL_DB
from flask_migrate import Migrate
from resources.auth.routes import auth
from resources.parking import ParkingsList, ParkingList
from resources.booking import BookingCRUD, BookingsList
from flask_restful import Api

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = FULL_URL_DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# inicializar
db.init_app(app)

#configurar flask-migrate
migrate = Migrate()
migrate.init_app(app, db)

app.register_blueprint(auth)

# Resources
api.add_resource(ParkingsList, '/parkings')
api.add_resource(ParkingList, '/parking/<int:id>')
api.add_resource(BookingCRUD,'/booking', '/booking/<int:id>')
api.add_resource(BookingsList, '/bookings')

if __name__ == '__main__':
    app.run(debug=True)
