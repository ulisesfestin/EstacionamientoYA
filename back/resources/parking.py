from flask_restful import Resource
from flask import request, jsonify
from models import Parking
from database import db


class ParkingsList(Resource):
    def get(self):
        parkings = db.session.query(Parking).all()
        result = []
        for parking in parkings:
            result.append({
                'id': parking.id,
                'code': parking.code,
                'availability': parking.availability,
                'price_per_hour': parking.price_per_hour,
            })
        response = jsonify(result)
        response.status_code = 200
        return response

    def post(self):
        code = request.json['code']
        availability = True
        price_per_hour = request.json['price_per_hour']

        # Verificamos que no haya otro estacionamiento con el mismo code
        query = db.session.query(Parking).filter(Parking.code == code)
        parking = query.first()
        if parking is not None:
            # Ya existe un estacionamiento con ese code
            return jsonify({"mensaje": "Ya existe un estacionamiento con ese code."})

        parking = Parking(code=code, availability=availability, price_per_hour=price_per_hour)

        db.session.add(parking)
        db.session.commit()
        return jsonify({"mensaje": "Estacionamiento creado con éxito."})


class ParkingList(Resource):
    def delete(self, id):
        parking = Parking.query.get_or_404(id)
        db.session.delete(parking)
        db.session.commit()
        return jsonify({"mensaje": "Estacionamiento eliminado con éxito."})