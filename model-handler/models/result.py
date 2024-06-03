from datetime import datetime
from models import db

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    datetime = db.Column(db.DateTime, default=datetime.utcnow)
    result = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return f'<Result {self.id} - {self.username}>'
