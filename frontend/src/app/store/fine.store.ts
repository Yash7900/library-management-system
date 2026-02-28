import { Injectable, signal, inject } from '@angular/core';
import { FineService } from '../features/fines/fine.service';
import { AuthStore } from '../core/auth/auth.store';

@Injectable({ providedIn: 'root' })
export class FinesStore {
  private service = inject(FineService);
  private auth = inject(AuthStore);

  fines = signal<any[]>([]);
  loading = signal(false);

  load() {
    this.loading.set(true);

    const request =
      this.auth.role() === 'LIBRARIAN' ? this.service.getAllFines() : this.service.getMyFines();

    request.subscribe({
      next: (data) => {
        this.fines.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
