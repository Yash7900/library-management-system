import { Component, inject, OnInit } from '@angular/core';
import { BorrowStore } from '../../../store/borrow.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myBooks',
  imports: [CommonModule],
  templateUrl: './myBooks.component.html',
  styleUrls: ['./myBooks.component.scss'],
})
export class MyBooksComponent implements OnInit {
  store = inject(BorrowStore);

  ngOnInit() {
    this.store.load();
  }

  isOverdue(dueDate: string) {
    return new Date(dueDate) < new Date();
  }
}
