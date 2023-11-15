from database import db

class Booking(db.Model):
    __tablename__ = 'booking'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    parking_id = db.Column(db.Integer, db.ForeignKey('parking.id'))
    entry = db.Column(db.DateTime)
    exit = db.Column(db.DateTime)
    amount = db.Column(db.Float)
    status = db.Column(db.String(100))

    def __str__(self):
        return (
            f'id: {self.id}, '
            f'user_id: {self.user_id}, '
            f'parking_id: {self.parking_id}, '
            f'entry: {self.entry}, '
            f'exit: {self.exit}, '
            f'amount: {self.amount}, '
            f'status: {self.status}, '
        )
