from flask_restful import Resource
from flask import request, jsonify
from models import Booking
from database import db


class BookingCRUD(Resource):
    
    def post(self):
        entry = request.json['entry']
        exit = request.json['exit']
        parking_id = request.json['parking_id']
        user_id = request.json['user_id']
        amount = request.json['amount']
        status = 'ocupado'

        booking = Booking(entry=entry, exit=exit, parking_id=parking_id, user_id=user_id, amount=amount, status=status)

        db.session.add(booking)
        db.session.commit()
        return jsonify({"mensaje": "Reserva creada con éxito."})