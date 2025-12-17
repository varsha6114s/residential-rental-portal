export interface AdminUser {
    id: number;
    email: string;
    name: string;
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
    user_name?: string;
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

export interface Lease {
    id: number;
    user_id: number;
    user_name?: string;
    unit_id: number;
    unit_number?: string;
    tower_name?: string;
    start_date: string;
    end_date: string;
    rent_amount: number;
    status: 'active' | 'expired' | 'terminated';
}

export interface Stats {
    total_towers: number;
    total_units: number;
    occupied_units: number;
    available_units: number;
    pending_bookings: number;
    active_leases: number;
}

export interface LoginResponse {
    access_token: string;
    user: AdminUser;
}
