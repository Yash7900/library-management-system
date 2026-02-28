import { inject, Injectable, signal } from '@angular/core';
import { BookService, Book } from './book.service';

@Injectable({ providedIn: 'root' })
export class BooksStore {
  service = inject(BookService);

  books = signal<Book[]>([]);
  loading = signal(false);

  async loadBooks() {
    this.loading.set(true);

    this.service.getBooks().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  borrow(bookId: string) {
    this.service.borrowBook(bookId).subscribe({
      next: () => {
        // Update UI immediately
        const updated = this.books().map((book) =>
          book.id === bookId ? { ...book, availableCopies: book.availableCopies - 1 } : book,
        );

        this.books.set(updated);
      },
    });
  }
}
