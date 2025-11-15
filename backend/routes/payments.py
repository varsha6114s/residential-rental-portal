from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime
from models import db, Payment, Lease

payments_bp = Blueprint('payments', __name__)

def admin_required():
    """Check if user is admin"""
    claims = get_jwt()
    return claims.get('role') == 'admin'


@payments_bp.route('', methods=['POST'])
@jwt_required()
def create_payment():
    """Record a payment (admin only - mock feature)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        data = request.get_json()
        
        if not data.get('lease_id') or not data.get('amount') or not data.get('payment_date'):
            return jsonify({'error': 'Lease ID, amount, and payment date are required'}), 400
        
        # Check if lease exists
        lease = Lease.query.get(data['lease_id'])
        if not lease:
            return jsonify({'error': 'Lease not found'}), 404
        
        # Parse date
        payment_date = datetime.fromisoformat(data['payment_date']).date()
        
        payment = Payment(
            lease_id=data['lease_id'],
            amount=data['amount'],
            payment_date=payment_date,
            payment_method=data.get('payment_method', 'cash'),
            status=data.get('status', 'completed')
        )
        
        db.session.add(payment)
        db.session.commit()
        
        return jsonify({
            'message': 'Payment recorded successfully',
            'payment': payment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@payments_bp.route('', methods=['GET'])
@jwt_required()
def get_payments():
    """Get payments (filtered by user's leases or all for admin)"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        role = claims.get('role', 'user')
        
        if role == 'admin':
            # Admin sees all payments
            lease_id = request.args.get('lease_id')
            if lease_id:
                payments = Payment.query.filter_by(lease_id=lease_id).order_by(Payment.payment_date.desc()).all()
            else:
                payments = Payment.query.order_by(Payment.payment_date.desc()).all()
        else:
            # User sees payments for their leases
            user_leases = Lease.query.filter_by(user_id=user_id).all()
            lease_ids = [lease.id for lease in user_leases]
            payments = Payment.query.filter(Payment.lease_id.in_(lease_ids)).order_by(Payment.payment_date.desc()).all()
        
        return jsonify([payment.to_dict() for payment in payments]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@payments_bp.route('/<int:payment_id>', methods=['GET'])
@jwt_required()
def get_payment(payment_id):
    """Get single payment"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        role = claims.get('role', 'user')
        
        payment = Payment.query.get(payment_id)
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
        
        # Check authorization
        if role != 'admin' and payment.lease.user_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify(payment.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
