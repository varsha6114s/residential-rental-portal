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
            phone='9876543210',
            role='admin'
        )
        admin.set_password('admin123')
        db.session.add(admin)
        
        # Create regular users
        print("Creating regular users...")
        user1 = User(
            email='rajesh.kumar@example.com',
            name='Rajesh Kumar',
            phone='9123456789',
            role='user'
        )
        user1.set_password('password123')
        db.session.add(user1)
        
        user2 = User(
            email='priya.sharma@example.com',
            name='Priya Sharma',
            phone='9234567890',
            role='user'
        )
        user2.set_password('password123')
        db.session.add(user2)
        
        # Create towers
        print("Creating towers...")
        tower_a = Tower(
            name='Skyline Residency',
            address='Bandra West, Mumbai, Maharashtra 400050',
            total_floors=15,
            description='Premium residential tower with sea view'
        )
        db.session.add(tower_a)
        
        tower_b = Tower(
            name='Green Valley Apartments',
            address='Whitefield, Bangalore, Karnataka 560066',
            total_floors=20,
            description='Luxury apartments in IT hub with modern amenities'
        )
        db.session.add(tower_b)
        
        tower_c = Tower(
            name='Royal Heights',
            address='Dwarka Sector 12, New Delhi 110075',
            total_floors=12,
            description='Spacious apartments with metro connectivity'
        )
        db.session.add(tower_c)
        
        db.session.commit()
        
        # Create units for Skyline Residency (Mumbai)
        print("Creating units for Skyline Residency...")
        units_a = [
            Unit(tower_id=tower_a.id, unit_number='101', floor=1, bedrooms=1, bathrooms=1, 
                 size_sqft=650, rent_amount=25000, status='available', 
                 description='Cozy 1BHK apartment on ground floor'),
            Unit(tower_id=tower_a.id, unit_number='201', floor=2, bedrooms=2, bathrooms=1, 
                 size_sqft=850, rent_amount=35000, status='available', 
                 description='Spacious 2BHK apartment'),
            Unit(tower_id=tower_a.id, unit_number='301', floor=3, bedrooms=2, bathrooms=2, 
                 size_sqft=950, rent_amount=42000, status='available', 
                 description='Modern 2BHK with balcony'),
            Unit(tower_id=tower_a.id, unit_number='401', floor=4, bedrooms=3, bathrooms=2, 
                 size_sqft=1200, rent_amount=55000, status='available', 
                 description='Large 3BHK family apartment'),
            Unit(tower_id=tower_a.id, unit_number='501', floor=5, bedrooms=3, bathrooms=2, 
                 size_sqft=1250, rent_amount=60000, status='occupied', 
                 description='Premium 3BHK with sea view'),
        ]
        
        # Create units for Green Valley (Bangalore)
        print("Creating units for Green Valley Apartments...")
        units_b = [
            Unit(tower_id=tower_b.id, unit_number='1001', floor=10, bedrooms=2, bathrooms=2, 
                 size_sqft=1000, rent_amount=30000, status='available', 
                 description='Luxury 2BHK with modern finishes'),
            Unit(tower_id=tower_b.id, unit_number='1101', floor=11, bedrooms=3, bathrooms=2, 
                 size_sqft=1400, rent_amount=45000, status='available', 
                 description='Penthouse-style 3BHK'),
            Unit(tower_id=tower_b.id, unit_number='1201', floor=12, bedrooms=4, bathrooms=3, 
                 size_sqft=1800, rent_amount=65000, status='available', 
                 description='Luxury 4BHK penthouse'),
        ]
        
        # Create units for Royal Heights (Delhi)
        print("Creating units for Royal Heights...")
        units_c = [
            Unit(tower_id=tower_c.id, unit_number='201', floor=2, bedrooms=2, bathrooms=1, 
                 size_sqft=900, rent_amount=28000, status='available', 
                 description='Well-ventilated 2BHK apartment'),
            Unit(tower_id=tower_c.id, unit_number='301', floor=3, bedrooms=2, bathrooms=2, 
                 size_sqft=1000, rent_amount=32000, status='available', 
                 description='Premium 2BHK apartment'),
            Unit(tower_id=tower_c.id, unit_number='401', floor=4, bedrooms=3, bathrooms=2, 
                 size_sqft=1300, rent_amount=48000, status='available', 
                 description='Spacious 3BHK with metro view'),
        ]
        
        for unit in units_a + units_b + units_c:
            db.session.add(unit)
        
        # Create amenities
        print("Creating amenities...")
        amenities = [
            Amenity(
                name='Swimming Pool',
                description='Temperature-controlled swimming pool',
                availability_hours='6:00 AM - 10:00 PM',
                is_active=True
            ),
            Amenity(
                name='Gymnasium',
                description='Fully equipped gym with modern equipment',
                availability_hours='24/7',
                is_active=True
            ),
            Amenity(
                name='Covered Parking',
                description='Secure covered parking facility',
                availability_hours='24/7',
                is_active=True
            ),
            Amenity(
                name='Community Hall',
                description='Community hall for events and gatherings',
                availability_hours='8:00 AM - 11:00 PM',
                is_active=True
            ),
            Amenity(
                name='Children Play Area',
                description='Safe outdoor play area for children',
                availability_hours='7:00 AM - 9:00 PM',
                is_active=True
            ),
            Amenity(
                name='Power Backup',
                description='24x7 power backup for common areas',
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
        print("   User 1: rajesh.kumar@example.com / password123")
        print("   User 2: priya.sharma@example.com / password123")

if __name__ == '__main__':
    seed_database()
