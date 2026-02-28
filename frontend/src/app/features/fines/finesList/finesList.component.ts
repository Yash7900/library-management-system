import { Component, inject, OnInit } from '@angular/core';
import { FinesStore } from '../../../store/fine.store';
import { AuthStore } from '../../../core/auth/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finesList',
  imports: [CommonModule],
  templateUrl: './finesList.component.html',
  styleUrls: ['./finesList.component.scss'],
})
export class FinesListComponent implements OnInit {
  store = inject(FinesStore);
  auth = inject(AuthStore);

  ngOnInit() {
    this.store.load();
  }

  isLibrarian() {
    return this.auth.role() === 'LIBRARIAN';
  }
}
