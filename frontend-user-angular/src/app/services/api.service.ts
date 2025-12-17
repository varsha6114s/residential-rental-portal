import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Tower, Unit, Amenity, Booking, LoginResponse } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        });
    }

    // Auth endpoints
    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password });
    }

    register(name: string, email: string, phone: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, { name, email, phone, password });
    }

    // Tower endpoints
    getTowers(): Observable<Tower[]> {
        return this.http.get<Tower[]>(`${this.apiUrl}/towers`);
    }

    getTower(id: number): Observable<Tower> {
        return this.http.get<Tower>(`${this.apiUrl}/towers/${id}`);
    }

    // Unit endpoints
    getUnits(towerId?: number): Observable<Unit[]> {
        const url = towerId ? `${this.apiUrl}/units?tower_id=${towerId}` : `${this.apiUrl}/units`;
        return this.http.get<Unit[]>(url);
    }

    getUnit(id: number): Observable<Unit> {
        return this.http.get<Unit>(`${this.apiUrl}/units/${id}`);
    }

    // Amenity endpoints
    getAmenities(): Observable<Amenity[]> {
        return this.http.get<Amenity[]>(`${this.apiUrl}/amenities`);
    }

    // Booking endpoints
    createBooking(unitId: number, moveInDate: string, leaseDuration: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/bookings`,
            { unit_id: unitId, requested_move_in_date: moveInDate, lease_duration: leaseDuration },
            { headers: this.getHeaders() }
        );
    }

    getMyBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.apiUrl}/bookings`, { headers: this.getHeaders() });
    }
}
