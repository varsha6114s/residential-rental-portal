import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminApiService } from './admin-api.service';
import { AdminUser } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthService {
    private currentUserSubject = new BehaviorSubject<AdminUser | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private apiService: AdminApiService,
        private router: Router
    ) { }

    private getUserFromStorage(): AdminUser | null {
        const userStr = localStorage.getItem('adminUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    get currentUserValue(): AdminUser | null {
        return this.currentUserSubject.value;
    }

    get isAuthenticated(): boolean {
        const user = this.currentUserValue;
        return !!localStorage.getItem('adminToken') && user?.role === 'admin';
    }

    login(email: string, password: string): Observable<any> {
        return this.apiService.login(email, password).pipe(
            tap(response => {
                if (response.user.role === 'admin') {
                    localStorage.setItem('adminToken', response.access_token);
                    localStorage.setItem('adminUser', JSON.stringify(response.user));
                    this.currentUserSubject.next(response.user);
                } else {
                    throw new Error('Not an admin user');
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}
