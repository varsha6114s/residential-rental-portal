from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from models import db, Lease

leases_bp = Blueprint('leases', __name__)

def admin_required():
    """Check if user is admin"""
    claims = get_jwt()
    return claims.get('role') == 'admin'


@leases_bp.route('', methods=['GET'])
@jwt_required()
def get_leases():
    """Get leases (filtered by user or all for admin)"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        role = claims.get('role', 'user')
        
        if role == 'admin':
            # Admin sees all leases
            query = Lease.query
            
            # Optional status filter
            status = request.args.get('status')
            if status:
                query = query.filter_by(status=status)
            
            leases = query.order_by(Lease.created_at.desc()).all()
        else:
            # User sees only their leases
            leases = Lease.query.filter_by(user_id=user_id).order_by(Lease.created_at.desc()).all()
        
        return jsonify([lease.to_dict() for lease in leases]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@leases_bp.route('/<int:lease_id>', methods=['GET'])
@jwt_required()
def get_lease(lease_id):
    """Get single lease"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        role = claims.get('role', 'user')
        
        lease = Lease.query.get(lease_id)
        if not lease:
            return jsonify({'error': 'Lease not found'}), 404
        
        # Check authorization
        if role != 'admin' and lease.user_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify(lease.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@leases_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_lease_stats():
    """Get lease statistics (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        total_leases = Lease.query.count()
        active_leases = Lease.query.filter_by(status='active').count()
        expired_leases = Lease.query.filter_by(status='expired').count()
        
        return jsonify({
            'total_leases': total_leases,
            'active_leases': active_leases,
            'expired_leases': expired_leases
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
