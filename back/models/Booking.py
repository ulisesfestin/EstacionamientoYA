from database import db

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    espacio = db.Column(db.String(250))
    horario = db.Column(db.String(250))
    cliente = db.Column(db.String(250))

    def __str__(self):
        return (
            f'id: {self.id}, '
            f'espacio: {self.espacio}, '
            f'horario: {self.horario}, '
            f'cliente: {self.cliente}, '
        )
