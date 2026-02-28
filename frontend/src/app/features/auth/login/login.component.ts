import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { decodeToken } from '../../../core/auth/token.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  login() {
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        const payload: any = decodeToken(res.accessToken);

        this.authStore.setSession(
          {
            id: payload.id,
            role: payload.role
          },
          res.accessToken,
          res.refreshToken
        );

        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}