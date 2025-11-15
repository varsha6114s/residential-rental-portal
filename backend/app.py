from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db

def create_app():
    """Application factory"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    CORS(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.towers import towers_bp
    from routes.units import units_bp
    from routes.amenities import amenities_bp
    from routes.bookings import bookings_bp
    from routes.leases import leases_bp
    from routes.payments import payments_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(towers_bp, url_prefix='/api/towers')
    app.register_blueprint(units_bp, url_prefix='/api/units')
    app.register_blueprint(amenities_bp, url_prefix='/api/amenities')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(leases_bp, url_prefix='/api/leases')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')
    
    # Create tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
    
    @app.route('/')
    def index():
        return {
            'message': 'Residential Apartment Rental Portal API',
            'version': '1.0.0',
            'endpoints': {
                'auth': '/api/auth',
                'towers': '/api/towers',
                'units': '/api/units',
                'amenities': '/api/amenities',
                'bookings': '/api/bookings',
                'leases': '/api/leases',
                'payments': '/api/payments'
            }
        }
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
