"""Seed script to populate initial data"""
from app import create_app
from models import db, User, Tower, Unit, Amenity
from datetime import datetime

def seed_database():
    """Populate database with initial data"""
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        print("Clearing existing data...")
        db.drop_all()
        db.create_all()
        
        # Create admin user
        print("Creating admin user...")
        admin = User(
            email='admin@rental.com',
            name='Admin User',
            phone='1234567890',
            role='admin'
        )
        admin.set_password('admin123')
        db.session.add(admin)
        
        # Create regular users
        print("Creating regular users...")
        user1 = User(
            email='john@example.com',
            name='John Doe',
            phone='5551234567',
            role='user'
        )
        user1.set_password('password123')
        db.session.add(user1)
        
        user2 = User(
            email='jane@example.com',
            name='Jane Smith',
            phone='5559876543',
            role='user'
        )
        user2.set_password('password123')
        db.session.add(user2)
        
        # Create towers
        print("Creating towers...")
        tower_a = Tower(
            name='Tower A',
            address='123 Main Street, Downtown',
            total_floors=15,
            description='Modern residential tower with city views'
        )
        db.session.add(tower_a)
        
        tower_b = Tower(
            name='Tower B',
            address='456 Park Avenue, Midtown',
            total_floors=20,
            description='Luxury apartments with premium amenities'
        )
        db.session.add(tower_b)
        
        tower_c = Tower(
            name='Tower C',
            address='789 Lake Drive, Waterfront',
            total_floors=12,
            description='Waterfront living with stunning lake views'
        )
        db.session.add(tower_c)
        
        db.session.commit()
        
        # Create units for Tower A
        print("Creating units for Tower A...")
        units_a = [
            Unit(tower_id=tower_a.id, unit_number='101', floor=1, bedrooms=1, bathrooms=1, 
                 size_sqft=650, rent_amount=1200, status='available', 
                 description='Cozy studio apartment on ground floor'),
            Unit(tower_id=tower_a.id, unit_number='201', floor=2, bedrooms=2, bathrooms=1, 
                 size_sqft=850, rent_amount=1500, status='available', 
                 description='Spacious 2-bedroom apartment'),
            Unit(tower_id=tower_a.id, unit_number='301', floor=3, bedrooms=2, bathrooms=2, 
                 size_sqft=950, rent_amount=1800, status='available', 
                 description='Modern 2-bed, 2-bath with balcony'),
            Unit(tower_id=tower_a.id, unit_number='401', floor=4, bedrooms=3, bathrooms=2, 
                 size_sqft=1200, rent_amount=2200, status='available', 
                 description='Large 3-bedroom family apartment'),
            Unit(tower_id=tower_a.id, unit_number='501', floor=5, bedrooms=3, bathrooms=2, 
                 size_sqft=1250, rent_amount=2400, status='occupied', 
                 description='Premium 3-bedroom with city views'),
        ]
        
        # Create units for Tower B
        print("Creating units for Tower B...")
        units_b = [
            Unit(tower_id=tower_b.id, unit_number='1001', floor=10, bedrooms=2, bathrooms=2, 
                 size_sqft=1000, rent_amount=2000, status='available', 
                 description='Luxury 2-bedroom with modern finishes'),
            Unit(tower_id=tower_b.id, unit_number='1101', floor=11, bedrooms=3, bathrooms=2, 
                 size_sqft=1400, rent_amount=2800, status='available', 
                 description='Penthouse-style 3-bedroom'),
            Unit(tower_id=tower_b.id, unit_number='1201', floor=12, bedrooms=4, bathrooms=3, 
                 size_sqft=1800, rent_amount=3500, status='available', 
                 description='Luxury 4-bedroom penthouse'),
        ]
        
        # Create units for Tower C
        print("Creating units for Tower C...")
        units_c = [
            Unit(tower_id=tower_c.id, unit_number='201', floor=2, bedrooms=2, bathrooms=1, 
                 size_sqft=900, rent_amount=1700, status='available', 
                 description='Waterfront 2-bedroom with lake view'),
            Unit(tower_id=tower_c.id, unit_number='301', floor=3, bedrooms=2, bathrooms=2, 
                 size_sqft=1000, rent_amount=1900, status='available', 
                 description='Premium waterfront apartment'),
            Unit(tower_id=tower_c.id, unit_number='401', floor=4, bedrooms=3, bathrooms=2, 
                 size_sqft=1300, rent_amount=2500, status='available', 
                 description='Spacious 3-bedroom with panoramic views'),
        ]
        
        for unit in units_a + units_b + units_c:
            db.session.add(unit)
        
        # Create amenities
        print("Creating amenities...")
        amenities = [
            Amenity(
                name='Swimming Pool',
                description='Olympic-size heated swimming pool',
                availability_hours='6:00 AM - 10:00 PM',
                is_active=True
            ),
            Amenity(
                name='Fitness Center',
                description='Fully equipped gym with modern equipment',
                availability_hours='24/7',
                is_active=True
            ),
            Amenity(
                name='Parking Garage',
                description='Secure underground parking',
                availability_hours='24/7',
                is_active=True
            ),
            Amenity(
                name='Clubhouse',
                description='Community clubhouse for events',
                availability_hours='8:00 AM - 11:00 PM',
                is_active=True
            ),
            Amenity(
                name='Children\'s Playground',
                description='Safe outdoor play area for kids',
                availability_hours='7:00 AM - 9:00 PM',
                is_active=True
            ),
            Amenity(
                name='Business Center',
                description='Co-working space with high-speed internet',
                availability_hours='24/7',
                is_active=True
            ),
        ]
        
        for amenity in amenities:
            db.session.add(amenity)
        
        db.session.commit()
        
        print("\n✅ Database seeded successfully!")
        print("\n📊 Summary:")
        print(f"   - Users: {User.query.count()} (1 admin, 2 regular users)")
        print(f"   - Towers: {Tower.query.count()}")
        print(f"   - Units: {Unit.query.count()}")
        print(f"   - Amenities: {Amenity.query.count()}")
        print("\n🔑 Login Credentials:")
        print("   Admin: admin@rental.com / admin123")
        print("   User 1: john@example.com / password123")
        print("   User 2: jane@example.com / password123")

if __name__ == '__main__':
    seed_database()
