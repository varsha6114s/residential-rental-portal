import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Amenity } from '../../models/models';

@Component({
  selector: 'app-manage-amenities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-amenities.html',
  styleUrls: ['./manage-amenities.css']
})
export class ManageAmenitiesComponent implements OnInit {
  amenities: Amenity[] = [];
  loading = true;
  showModal = false;
  editMode = false;
  currentAmenity: Partial<Amenity> = {};

  constructor(
    private apiService: AdminApiService,
    public authService: AdminAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadAmenities();
  }

  loadAmenities() {
    this.apiService.getAmenities().subscribe({
      next: (data) => {
        this.amenities = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openAddModal() {
    this.editMode = false;
    this.currentAmenity = { name: '', description: '', availability_hours: '', is_active: true };
    this.showModal = true;
  }

  openEditModal(amenity: Amenity) {
    this.editMode = true;
    this.currentAmenity = { ...amenity };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentAmenity = {};
  }

  saveAmenity() {
    if (this.editMode && this.currentAmenity.id) {
      this.apiService.updateAmenity(this.currentAmenity.id, this.currentAmenity).subscribe({
        next: () => {
          this.closeModal();
          this.loadAmenities();
        },
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    } else {
      this.apiService.createAmenity(this.currentAmenity).subscribe({
        next: () => {
          this.closeModal();
          this.loadAmenities();
        },
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    }
  }

  deleteAmenity(id: number) {
    if (confirm('Are you sure you want to delete this amenity?')) {
      this.apiService.deleteAmenity(id).subscribe({
        next: () => this.loadAmenities(),
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
