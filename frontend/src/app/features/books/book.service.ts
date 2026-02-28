import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  borrowBook(bookId: string) {
    return this.http.post(`/api/borrow/`, { bookId });
  }

  getMyBorrowed() {
    return this.http.get<any[]>('/api/borrow/my');
  }

  returnBook(borrowId: string) {
    return this.http.post(`/api/borrow/return/`, { borrowId });
  }

  renewBook(borrowId: string) {
    return this.http.post(`/api/borrow/renew/`, { borrowId });
  }
}
