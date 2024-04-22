import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NewBookComponent } from './new-book.component';
import { NewBookRoutingModule } from './new-book.routing';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NewBookComponent,
    NewBookRoutingModule
  ]
})
export class NewBookModule { }
