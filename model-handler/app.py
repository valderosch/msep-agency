import logging
from flask import Flask
from config import Config
from models import db
from routes.calculate import calculate_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.register_blueprint(calculate_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        logger.info("  | 201 | DB Created.")
    app.run(debug=True)
