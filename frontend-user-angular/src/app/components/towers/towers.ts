import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Tower } from '../../models/models';

@Component({
  selector: 'app-towers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './towers.html',
  styleUrls: ['./towers.css']
})
export class TowersComponent implements OnInit {
  towers: Tower[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadTowers();
  }

  loadTowers() {
    this.apiService.getTowers().subscribe({
      next: (data) => {
        this.towers = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load towers';
        this.loading = false;
      }
    });
  }

  viewUnits(towerId: number) {
    this.router.navigate(['/units', towerId]);
  }

  logout() {
    this.authService.logout();
  }
}
