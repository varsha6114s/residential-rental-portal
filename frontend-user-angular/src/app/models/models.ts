export interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: string;
}

export interface Tower {
    id: number;
    name: string;
    address: string;
    total_floors: number;
    description?: string;
    created_at?: string;
}

export interface Unit {
    id: number;
    tower_id: number;
    tower_name?: string;
    unit_number: string;
    floor: number;
    bedrooms: number;
    bathrooms: number;
    size_sqft: number;
    rent_amount: number;
    status: 'available' | 'occupied' | 'maintenance';
    description?: string;
}

export interface Amenity {
    id: number;
    name: string;
    description?: string;
    availability_hours?: string;
    is_active: boolean;
}

export interface Booking {
    id: number;
    user_id: number;
    unit_id: number;
    unit_number?: string;
    tower_name?: string;
    move_in_date: string;
    lease_duration: number;
    status: 'pending' | 'approved' | 'rejected';
    admin_comments?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface ApiError {
    error: string;
}
