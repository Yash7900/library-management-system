import { Component, inject } from '@angular/core';
import { BooksStore } from '../book.store';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  store = inject(BooksStore);

  ngOnInit() {
    this.store.loadBooks();
  }
}
