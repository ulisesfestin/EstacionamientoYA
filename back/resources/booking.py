from flask_restful import Resource
from flask import request, jsonify
from models import Booking
from database import db
from models.User import User


class BookingCRUD(Resource):

    def get(self, user_id):

        bookings = db.session.query(Booking).filter(Booking.user_id == user_id).all()
        
        result = []
        for booking in bookings:
            result.append({
                'id': booking.id,
                'user_id': booking.user_id,
                'parking_id': booking.parking_id,
                'entry': booking.entry,
                'exit': booking.exit,
                'amount': booking.amount,
                'status': booking.status
            })
        response = jsonify(result)
        response.status_code = 200
        return response
    
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