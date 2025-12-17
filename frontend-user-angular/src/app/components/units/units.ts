import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Unit } from '../../models/models';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './units.html',
  styleUrls: ['./units.css']
})
export class UnitsComponent implements OnInit {
  units: Unit[] = [];
  loading = true;
  towerId: number = 0;
  selectedUnit: Unit | null = null;
  showBookingModal = false;
  moveInDate = '';
  leaseDuration = 12;
  bookingMessage = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.towerId = +params['towerId'];
      this.loadUnits();
    });
  }

  loadUnits() {
    this.apiService.getUnits(this.towerId).subscribe({
      next: (data) => {
        this.units = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openBookingModal(unit: Unit) {
    this.selectedUnit = unit;
    this.showBookingModal = true;
    this.bookingMessage = '';
    // Set default move-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.moveInDate = tomorrow.toISOString().split('T')[0];
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.selectedUnit = null;
  }

  submitBooking() {
    if (!this.selectedUnit) return;

    this.apiService.createBooking(
      this.selectedUnit.id,
      this.moveInDate,
      this.leaseDuration
    ).subscribe({
      next: () => {
        this.bookingMessage = 'Booking request submitted successfully!';
        setTimeout(() => {
          this.closeBookingModal();
          this.router.navigate(['/my-bookings']);
        }, 2000);
      },
      error: (error) => {
        console.error('Booking error:', error);
        this.bookingMessage = error.error?.error || error.error?.msg || error.message || 'Failed to submit booking';
      }
    });
  }

  goBack() {
    this.router.navigate(['/towers']);
  }
}
