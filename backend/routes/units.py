from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from models import db, Unit

units_bp = Blueprint('units', __name__)

def admin_required():
    """Check if user is admin"""
    claims = get_jwt()
    return claims.get('role') == 'admin'


@units_bp.route('', methods=['GET'])
def get_units():
    """Get all units with optional filters"""
    try:
        query = Unit.query
        
        # Filter by tower
        tower_id = request.args.get('tower_id')
        if tower_id:
            query = query.filter_by(tower_id=tower_id)
        
        # Filter by status
        status = request.args.get('status')
        if status:
            query = query.filter_by(status=status)
        
        # Filter by bedrooms
        bedrooms = request.args.get('bedrooms')
        if bedrooms:
            query = query.filter_by(bedrooms=int(bedrooms))
        
        units = query.all()
        return jsonify([unit.to_dict() for unit in units]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@units_bp.route('/<int:unit_id>', methods=['GET'])
def get_unit(unit_id):
    """Get single unit by ID"""
    try:
        unit = Unit.query.get(unit_id)
        if not unit:
            return jsonify({'error': 'Unit not found'}), 404
        return jsonify(unit.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@units_bp.route('', methods=['POST'])
@jwt_required()
def create_unit():
    """Create new unit (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        data = request.get_json()
        
        if not data.get('tower_id') or not data.get('unit_number') or not data.get('rent_amount'):
            return jsonify({'error': 'Tower ID, unit number, and rent amount are required'}), 400
        
        unit = Unit(
            tower_id=data['tower_id'],
            unit_number=data['unit_number'],
            floor=data.get('floor'),
            bedrooms=data.get('bedrooms'),
            bathrooms=data.get('bathrooms'),
            size_sqft=data.get('size_sqft'),
            rent_amount=data['rent_amount'],
            status=data.get('status', 'available'),
            description=data.get('description')
        )
        
        db.session.add(unit)
        db.session.commit()
        
        return jsonify({
            'message': 'Unit created successfully',
            'unit': unit.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@units_bp.route('/<int:unit_id>', methods=['PUT'])
@jwt_required()
def update_unit(unit_id):
    """Update unit (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        unit = Unit.query.get(unit_id)
        if not unit:
            return jsonify({'error': 'Unit not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        for field in ['unit_number', 'floor', 'bedrooms', 'bathrooms', 'size_sqft', 
                      'rent_amount', 'status', 'description']:
            if field in data:
                setattr(unit, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Unit updated successfully',
            'unit': unit.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@units_bp.route('/<int:unit_id>', methods=['DELETE'])
@jwt_required()
def delete_unit(unit_id):
    """Delete unit (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        unit = Unit.query.get(unit_id)
        if not unit:
            return jsonify({'error': 'Unit not found'}), 404
        
        db.session.delete(unit)
        db.session.commit()
        
        return jsonify({'message': 'Unit deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
