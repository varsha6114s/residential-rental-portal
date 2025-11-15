from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timedelta
from models import db, Booking, Unit, Lease

bookings_bp = Blueprint('bookings', __name__)

def admin_required():
    """Check if user is admin"""
    claims = get_jwt()
    return claims.get('role') == 'admin'


@bookings_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    """Create new booking request"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate input
        if not data.get('unit_id') or not data.get('requested_move_in_date'):
            return jsonify({'error': 'Unit ID and move-in date are required'}), 400
        
        # Check if unit exists and is available
        unit = Unit.query.get(data['unit_id'])
        if not unit:
            return jsonify({'error': 'Unit not found'}), 404
        
        if unit.status != 'available':
            return jsonify({'error': 'Unit is not available'}), 400
        
        # Parse date
        move_in_date = datetime.fromisoformat(data['requested_move_in_date']).date()
        
        # Create booking
        booking = Booking(
            user_id=user_id,
            unit_id=data['unit_id'],
            requested_move_in_date=move_in_date,
            status='pending'
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify({
            'message': 'Booking request submitted successfully',
            'booking': booking.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('', methods=['GET'])
@jwt_required()
def get_bookings():
    """Get bookings (filtered by user or all for admin)"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        role = claims.get('role', 'user')
        
        if role == 'admin':
            # Admin sees all bookings
            query = Booking.query
            
            # Optional status filter
            status = request.args.get('status')
            if status:
                query = query.filter_by(status=status)
            
            bookings = query.order_by(Booking.created_at.desc()).all()
        else:
            # User sees only their bookings
            bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.created_at.desc()).all()
        
        return jsonify([booking.to_dict() for booking in bookings]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    """Get single booking"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        role = claims.get('role', 'user')
        
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        if role != 'admin' and booking.user_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify(booking.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('/<int:booking_id>/approve', methods=['PUT'])
@jwt_required()
def approve_booking(booking_id):
    """Approve booking and create lease (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        if booking.status != 'pending':
            return jsonify({'error': 'Booking already processed'}), 400
        
        # Start transaction
        # Update booking status
        booking.status = 'approved'
        booking.updated_at = datetime.utcnow()
        
        # Create lease (1 year by default)
        lease = Lease(
            booking_id=booking.id,
            user_id=booking.user_id,
            unit_id=booking.unit_id,
            start_date=booking.requested_move_in_date,
            end_date=booking.requested_move_in_date + timedelta(days=365),
            monthly_rent=booking.unit.rent_amount,
            security_deposit=booking.unit.rent_amount * 2,  # 2 months deposit
            status='active'
        )
        db.session.add(lease)
        
        # Update unit status
        unit = Unit.query.get(booking.unit_id)
        unit.status = 'occupied'
        
        # Commit transaction
        db.session.commit()
        
        return jsonify({
            'message': 'Booking approved successfully',
            'booking': booking.to_dict(),
            'lease': lease.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bookings_bp.route('/<int:booking_id>/reject', methods=['PUT'])
@jwt_required()
def reject_booking(booking_id):
    """Reject booking (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        if booking.status != 'pending':
            return jsonify({'error': 'Booking already processed'}), 400
        
        data = request.get_json()
        
        booking.status = 'rejected'
        booking.admin_comments = data.get('comments', '')
        booking.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking rejected',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
