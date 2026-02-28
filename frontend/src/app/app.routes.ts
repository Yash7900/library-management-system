import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/auth/auth.guard';
import { MyBooksComponent } from './features/books/myBooks/myBooks.component';
import { FinesListComponent } from './features/fines/finesList/finesList.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'books',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/books/book-list/book-list.component').then((m) => m.BookListComponent),
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'fines',
    component: FinesListComponent,
    canActivate: [authGuard],
  },
];
