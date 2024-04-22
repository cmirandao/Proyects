import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BookDetailComponent } from './book-detail.component';
import { BookDetailRoutingModule } from './book-detail.routing';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    BookDetailComponent,
    BookDetailRoutingModule
  ]
})
export class BookDetailModule { }
