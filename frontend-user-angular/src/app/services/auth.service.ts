import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private router: Router
    ) { }

    private getUserFromStorage(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    get isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    login(email: string, password: string): Observable<any> {
        return this.apiService.login(email, password).pipe(
            tap(response => {
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.currentUserSubject.next(response.user);
            })
        );
    }

    register(name: string, email: string, phone: string, password: string): Observable<any> {
        return this.apiService.register(name, email, phone, password).pipe(
            tap(response => {
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.currentUserSubject.next(response.user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}
