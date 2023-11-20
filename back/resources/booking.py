from flask_restful import Resource
from flask import request, jsonify
from models import Booking, User, Parking
from database import db


class BookingCRUD(Resource):

    def get(self, id):
        
        user = User.query.get(id)
        bookings = Booking.query.filter_by(user=user).all()
        
        result = []
        for booking in bookings:
            parking = Parking.query.get(booking.parking_id)
            result.append({
                'id': booking.id,
                'name': user.name,
                'parking_code': parking.code,
                'entry': booking.entry,
                'exit': booking.exit,
                'amount': booking.amount,
                'parking_id': parking.id
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
        status = 'En curso'

        user = User.query.get(user_id)
        parking = Parking.query.get(parking_id)

        booking = Booking(user=user, parking=parking, entry=entry, exit=exit, amount=amount, status=status)

        db.session.add(booking)
        db.session.commit()
        return jsonify({"mensaje": "Reserva creada con éxito."})
    
    def delete(self, id):
        booking = Booking.query.get(id)
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"mensaje": "Reserva eliminada con éxito."})
    
    def put(self, id):
        booking = Booking.query.get_or_404(id)
        booking.entry = request.json.get('entry', booking.entry)
        booking.exit = request.json.get('exit', booking.exit)
        booking.amount = request.json.get('amount', booking.amount)
        booking.status = request.json.get('status', booking.status)

        db.session.commit()
        return jsonify({'mensaje': 'Reserva editada con éxito.'})

class BookingsList(Resource):
    
    def get(self):
        bookings = Booking.query.all()
        result = []
        for booking in bookings:
            user = User.query.get(booking.user_id)
            parking = Parking.query.get(booking.parking_id)
            result.append({
                'id': booking.id,
                'name': user.name,
                'parking_code': parking.code,
                'entry': booking.entry,
                'exit': booking.exit,
                'amount': booking.amount,
                'status': booking.status,
                'parking_id': parking.id
            })
        response = jsonify(result)
        response.status_code = 200
        return response
    