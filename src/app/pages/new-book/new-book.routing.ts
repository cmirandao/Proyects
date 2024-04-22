import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewBookComponent } from './new-book.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NewBookComponent,
        data: {
          title: 'New Book'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBookRoutingModule { }
