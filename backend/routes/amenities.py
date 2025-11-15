from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from models import db, Amenity

amenities_bp = Blueprint('amenities', __name__)

def admin_required():
    """Check if user is admin"""
    claims = get_jwt()
    return claims.get('role') == 'admin'


@amenities_bp.route('', methods=['GET'])
def get_amenities():
    """Get all amenities"""
    try:
        amenities = Amenity.query.filter_by(is_active=True).all()
        return jsonify([amenity.to_dict() for amenity in amenities]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@amenities_bp.route('/<int:amenity_id>', methods=['GET'])
def get_amenity(amenity_id):
    """Get single amenity by ID"""
    try:
        amenity = Amenity.query.get(amenity_id)
        if not amenity:
            return jsonify({'error': 'Amenity not found'}), 404
        return jsonify(amenity.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@amenities_bp.route('', methods=['POST'])
@jwt_required()
def create_amenity():
    """Create new amenity (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        data = request.get_json()
        
        if not data.get('name'):
            return jsonify({'error': 'Name is required'}), 400
        
        amenity = Amenity(
            name=data['name'],
            description=data.get('description'),
            availability_hours=data.get('availability_hours'),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(amenity)
        db.session.commit()
        
        return jsonify({
            'message': 'Amenity created successfully',
            'amenity': amenity.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@amenities_bp.route('/<int:amenity_id>', methods=['PUT'])
@jwt_required()
def update_amenity(amenity_id):
    """Update amenity (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        amenity = Amenity.query.get(amenity_id)
        if not amenity:
            return jsonify({'error': 'Amenity not found'}), 404
        
        data = request.get_json()
        
        for field in ['name', 'description', 'availability_hours', 'is_active']:
            if field in data:
                setattr(amenity, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Amenity updated successfully',
            'amenity': amenity.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@amenities_bp.route('/<int:amenity_id>', methods=['DELETE'])
@jwt_required()
def delete_amenity(amenity_id):
    """Delete amenity (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        amenity = Amenity.query.get(amenity_id)
        if not amenity:
            return jsonify({'error': 'Amenity not found'}), 404
        
        db.session.delete(amenity)
        db.session.commit()
        
        return jsonify({'message': 'Amenity deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
