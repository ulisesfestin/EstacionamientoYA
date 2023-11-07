from database import db

class Parking(db.Model):
    __tablename__ = 'parking'
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10))
    availability = db.Column(db.Boolean)
    price_per_hour = db.Column(db.Float)

    parking_booking = db.relationship('Booking', backref='parking', cascade='all, delete-orphan')

    def __str__(self):
        return (
            f'id: {self.id}, '
            f'code: {self.code}, '
            f'availability: {self.availability}, '
            f'price_per_hour: {self.price_per_hour}, '
        )