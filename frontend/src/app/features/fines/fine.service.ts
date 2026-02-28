import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  private http = inject(HttpClient);

  getMyFines() {
    return this.http.get<any[]>('/api/fines/my');
  }

  getAllFines() {
    return this.http.get<any[]>('/api/fines/all');
  }
}
