import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = '/api/auth';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  refresh(refreshToken: string) {
    return this.http.post<AuthResponse>(`${this.api}/refresh`, { refreshToken });
  }

  logout(refreshToken: string) {
    return this.http.post(`${this.api}/logout`, { refreshToken });
  }
}