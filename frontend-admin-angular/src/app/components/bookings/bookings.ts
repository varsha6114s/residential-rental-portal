import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Booking } from '../../models/models';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  showModal = false;
  currentBooking: Booking | null = null;
  actionType: 'approve' | 'reject' = 'approve';
  comments = '';

  constructor(
    private apiService: AdminApiService,
    public authService: AdminAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.apiService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openApproveModal(booking: Booking) {
    this.currentBooking = booking;
    this.actionType = 'approve';
    this.comments = '';
    this.showModal = true;
  }

  openRejectModal(booking: Booking) {
    this.currentBooking = booking;
    this.actionType = 'reject';
    this.comments = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentBooking = null;
    this.comments = '';
  }

  submitAction() {
    if (!this.currentBooking) return;

    if (this.actionType === 'approve') {
      this.apiService.approveBooking(this.currentBooking.id, this.comments || 'Approved').subscribe({
        next: () => {
          this.closeModal();
          this.loadBookings();
        },
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    } else {
      this.apiService.rejectBooking(this.currentBooking.id, this.comments || 'Rejected').subscribe({
        next: () => {
          this.closeModal();
          this.loadBookings();
        },
        error: (err) => alert('Error: ' + (err.error?.error || 'Unknown error'))
      });
    }
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  logout() {
    this.authService.logout();
  }
}
