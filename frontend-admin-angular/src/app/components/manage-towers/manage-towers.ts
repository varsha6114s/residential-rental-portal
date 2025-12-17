import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Tower } from '../../models/models';

@Component({
  selector: 'app-manage-towers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-towers.html',
  styleUrls: ['./manage-towers.css']
})
export class ManageTowersComponent implements OnInit {
  towers: Tower[] = [];
  loading = true;
  showModal = false;
  editMode = false;
  currentTower: Partial<Tower> = {};

  constructor(
    private apiService: AdminApiService,
    public authService: AdminAuthService,
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
      error: () => this.loading = false
    });
  }

  openAddModal() {
    this.editMode = false;
    this.currentTower = { name: '', address: '', total_floors: 1, description: '' };
    this.showModal = true;
  }

  openEditModal(tower: Tower) {
    this.editMode = true;
    this.currentTower = { ...tower };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentTower = {};
  }

  saveTower() {
    if (this.editMode && this.currentTower.id) {
      this.apiService.updateTower(this.currentTower.id, this.currentTower).subscribe({
        next: () => {
          this.closeModal();
          this.loadTowers();
        },
        error: (err) => alert('Error updating tower: ' + (err.error?.error || 'Unknown error'))
      });
    } else {
      this.apiService.createTower(this.currentTower).subscribe({
        next: () => {
          this.closeModal();
          this.loadTowers();
        },
        error: (err) => alert('Error creating tower: ' + (err.error?.error || 'Unknown error'))
      });
    }
  }

  deleteTower(id: number) {
    if (confirm('Are you sure you want to delete this tower?')) {
      this.apiService.deleteTower(id).subscribe({
        next: () => this.loadTowers(),
        error: (err) => alert('Error: ' + (err.error?.error || 'Cannot delete tower with associated units'))
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
