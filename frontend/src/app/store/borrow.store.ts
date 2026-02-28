import { Injectable, signal, inject } from '@angular/core';
import { BookService } from '../features/books/book.service';

@Injectable({ providedIn: 'root' })
export class BorrowStore {
  private service = inject(BookService);

  borrowed = signal<any[]>([]);
  loading = signal(false);

  load() {
    this.loading.set(true);

    this.service.getMyBorrowed().subscribe({
      next: (data) => {
        this.borrowed.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  returnBook(id: string) {
    this.service.returnBook(id).subscribe(() => {
      this.borrowed.set(this.borrowed().filter((b) => b.id !== id));
    });
  }

  renewBook(id: string) {
    this.service.renewBook(id).subscribe(() => {
      this.load(); // refresh to get updated due date
    });
  }
}
