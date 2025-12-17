import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Unit, Tower } from '../../models/models';

@Component({
  selector: 'app-manage-units',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-units.html',
  styleUrls: ['./manage-units.css']
})
export class ManageUnitsComponent implements OnInit {
  units: Unit[] = [];
  towers: Tower[] = [];
  loading = true;
  showModal = false;
  editMode = false;
  currentUnit: Partial<Unit> = {};

  constructor(
    private apiService: AdminApiService,
    public authService: AdminAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadUnits();
    this.loadTowers();
  }

  loadUnits() {
    this.apiService.getUnits().subscribe({
      next: (data) => {
        this.units = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  loadTowers() {
    this.apiService.getTowers().subscribe({
      next: (data) => this.towers = data
    });
  }

  openAddModal() {
    this.editMode = false;
    this.currentUnit = {
      tower_id: this.towers[0]?.id,
      unit_number: '',
      floor: 1,
      bedrooms: 1,
      bathrooms: 1,
      size_sqft: 500,
      rent_amount: 10000,
      status: 'available',
      description: ''
    };
    this.showModal = true;
  }

  openEditModal(unit: Unit) {
    this.editMode = true;
    this.currentUnit = { ...unit };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentUnit = {};
  }

  saveUnit() {
    if (this.editMode && this.currentUnit.id) {
      this.apiService.updateUnit(this.currentUnit.id, this.currentUnit).subscribe({
        next: () => {
          this.closeModal();
          this.loadUnits();
        },
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    } else {
      this.apiService.createUnit(this.currentUnit).subscribe({
        next: () => {
          this.closeModal();
          this.loadUnits();
        },
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    }
  }

  deleteUnit(id: number) {
    if (confirm('Are you sure you want to delete this unit?')) {
      this.apiService.deleteUnit(id).subscribe({
        next: () => this.loadUnits(),
        error: (err) => alert('Error: ' + (err.error?.error || 'Cannot delete unit with bookings'))
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
