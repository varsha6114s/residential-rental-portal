import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Stats } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  stats: Stats = {
    total_towers: 0,
    total_units: 0,
    occupied_units: 0,
    available_units: 0,
    pending_bookings: 0,
    active_leases: 0
  };
  loading = true;

  constructor(
    private apiService: AdminApiService,
    public authService: AdminAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.apiService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
