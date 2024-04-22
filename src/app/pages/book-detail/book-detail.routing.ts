import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './book-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BookDetailComponent,
        data: {
          title: 'Book detail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookDetailRoutingModule { }
