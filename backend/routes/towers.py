from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from models import db, Tower, User

towers_bp = Blueprint('towers', __name__)

def admin_required():
    """Check if user is admin"""
    try:
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        return user and user.role == 'admin'
    except:
        return False


@towers_bp.route('', methods=['GET'])
def get_towers():
    """Get all towers"""
    try:
        towers = Tower.query.all()
        return jsonify([tower.to_dict() for tower in towers]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@towers_bp.route('/<int:tower_id>', methods=['GET'])
def get_tower(tower_id):
    """Get single tower by ID"""
    try:
        tower = Tower.query.get(tower_id)
        if not tower:
            return jsonify({'error': 'Tower not found'}), 404
        return jsonify(tower.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@towers_bp.route('', methods=['POST'])
@jwt_required()
def create_tower():
    """Create new tower (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        data = request.get_json()
        
        if not data.get('name') or not data.get('address'):
            return jsonify({'error': 'Name and address are required'}), 400
        
        tower = Tower(
            name=data['name'],
            address=data['address'],
            total_floors=data.get('total_floors'),
            description=data.get('description')
        )
        
        db.session.add(tower)
        db.session.commit()
        
        return jsonify({
            'message': 'Tower created successfully',
            'tower': tower.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@towers_bp.route('/<int:tower_id>', methods=['PUT'])
@jwt_required()
def update_tower(tower_id):
    """Update tower (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        tower = Tower.query.get(tower_id)
        if not tower:
            return jsonify({'error': 'Tower not found'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            tower.name = data['name']
        if 'address' in data:
            tower.address = data['address']
        if 'total_floors' in data:
            tower.total_floors = data['total_floors']
        if 'description' in data:
            tower.description = data['description']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Tower updated successfully',
            'tower': tower.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@towers_bp.route('/<int:tower_id>', methods=['DELETE'])
@jwt_required()
def delete_tower(tower_id):
    """Delete tower (admin only)"""
    try:
        if not admin_required():
            return jsonify({'error': 'Admin access required'}), 403
        
        tower = Tower.query.get(tower_id)
        if not tower:
            return jsonify({'error': 'Tower not found'}), 404
        
        db.session.delete(tower)
        db.session.commit()
        
        return jsonify({'message': 'Tower deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        # Check if it's a foreign key constraint error
        error_msg = str(e)
        if 'FOREIGN KEY constraint failed' in error_msg or 'foreign key constraint' in error_msg.lower():
            return jsonify({'error': 'Cannot delete tower as it has associated units. Please delete all units first.'}), 400
        return jsonify({'error': str(e)}), 500
