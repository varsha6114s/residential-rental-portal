import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUser, Tower, Unit, Amenity, Booking, Lease, Stats, LoginResponse } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AdminApiService {
    private apiUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('adminToken');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        });
    }

    // Auth
    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password });
    }

    // Stats
    getStats(): Observable<Stats> {
        return this.http.get<Stats>(`${this.apiUrl}/stats`, { headers: this.getHeaders() });
    }

    // Towers
    getTowers(): Observable<Tower[]> {
        return this.http.get<Tower[]>(`${this.apiUrl}/towers`);
    }

    createTower(tower: Partial<Tower>): Observable<Tower> {
        return this.http.post<Tower>(`${this.apiUrl}/towers`, tower, { headers: this.getHeaders() });
    }

    updateTower(id: number, tower: Partial<Tower>): Observable<Tower> {
        return this.http.put<Tower>(`${this.apiUrl}/towers/${id}`, tower, { headers: this.getHeaders() });
    }

    deleteTower(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/towers/${id}`, { headers: this.getHeaders() });
    }

    // Units
    getUnits(): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.apiUrl}/units`);
    }

    createUnit(unit: Partial<Unit>): Observable<Unit> {
        return this.http.post<Unit>(`${this.apiUrl}/units`, unit, { headers: this.getHeaders() });
    }

    updateUnit(id: number, unit: Partial<Unit>): Observable<Unit> {
        return this.http.put<Unit>(`${this.apiUrl}/units/${id}`, unit, { headers: this.getHeaders() });
    }

    deleteUnit(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/units/${id}`, { headers: this.getHeaders() });
    }

    // Amenities
    getAmenities(): Observable<Amenity[]> {
        return this.http.get<Amenity[]>(`${this.apiUrl}/amenities`);
    }

    createAmenity(amenity: Partial<Amenity>): Observable<Amenity> {
        return this.http.post<Amenity>(`${this.apiUrl}/amenities`, amenity, { headers: this.getHeaders() });
    }

    updateAmenity(id: number, amenity: Partial<Amenity>): Observable<Amenity> {
        return this.http.put<Amenity>(`${this.apiUrl}/amenities/${id}`, amenity, { headers: this.getHeaders() });
    }

    deleteAmenity(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/amenities/${id}`, { headers: this.getHeaders() });
    }

    // Bookings
    getBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.apiUrl}/bookings`, { headers: this.getHeaders() });
    }

    approveBooking(id: number, comments: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/bookings/${id}/approve`,
            { admin_comments: comments },
            { headers: this.getHeaders() }
        );
    }

    rejectBooking(id: number, comments: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/bookings/${id}/reject`,
            { comments },
            { headers: this.getHeaders() }
        );
    }

    // Leases
    getLeases(): Observable<Lease[]> {
        return this.http.get<Lease[]>(`${this.apiUrl}/leases`, { headers: this.getHeaders() });
    }
}
