import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'detail/:id',
        loadChildren: () => import('./pages/book-detail/book-detail.module').then(m => m.BookDetailModule)
      },
      {
        path: 'newbook',
        loadChildren: () => import('./pages/new-book/new-book.module').then(m => m.NewBookModule)
      }

];
