import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isLoginMode = true;
  email = '';
  password = '';
  name = '';
  phone = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.loading = true;

    if (this.isLoginMode) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          this.router.navigate(['/towers']);
        },
        error: (error) => {
          this.errorMessage = error.error?.error || 'Login failed';
          this.loading = false;
        }
      });
    } else {
      this.authService.register(this.name, this.email, this.phone, this.password).subscribe({
        next: () => {
          this.router.navigate(['/towers']);
        },
        error: (error) => {
          this.errorMessage = error.error?.error || 'Registration failed';
          this.loading = false;
        }
      });
    }
  }
}
