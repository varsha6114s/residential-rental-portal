import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Amenity } from '../../models/models';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amenities.html',
  styleUrls: ['./amenities.css']
})
export class AmenitiesComponent implements OnInit {
  amenities: Amenity[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadAmenities();
  }

  loadAmenities() {
    this.apiService.getAmenities().subscribe({
      next: (data) => {
        this.amenities = data.filter(a => a.is_active);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  goBack() {
    this.router.navigate(['/towers']);
  }
}
