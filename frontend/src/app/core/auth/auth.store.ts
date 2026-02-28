import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { decodeToken } from './token.util';

export interface User {
  id: string;
  role: 'USER' | 'LIBRARIAN';
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _user = signal<User | null>(null);
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;

  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this._user());
  role = computed(() => this._user()?.role ?? null);

  private authService = inject(AuthService);

  setSession(user: User, accessToken: string, refreshToken: string) {
    this._user.set(user);
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;

    localStorage.setItem('refreshToken', refreshToken);
  }

  clearSession() {
    this._user.set(null);
    this._accessToken = null;
    this._refreshToken = null;
    localStorage.removeItem('refreshToken');
  }

  get accessToken() {
    return this._accessToken;
  }

  get refreshToken() {
    return this._refreshToken ?? localStorage.getItem('refreshToken');
  }

  async init(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const res = await this.authService.refresh(refreshToken).toPromise();

      if (!res) return;

      const payload: any = decodeToken(res.accessToken);

      this.setSession({ id: payload.id, role: payload.role }, res.accessToken, res.refreshToken);

      console.log('Session restored BEFORE app start');
    } catch {
      this.clearSession();
    }
  }

  logout() {
    const refreshToken = this.refreshToken;
    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe();
    }

    this.clearSession();
  }
}
