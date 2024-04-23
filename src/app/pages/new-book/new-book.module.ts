import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NewBookComponent } from './new-book.component';
import { NewBookRoutingModule } from './new-book.routing';
import { MatTabNavPanel } from '@angular/material/tabs';
import { MatTabNav } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NewBookComponent,
    NewBookRoutingModule,
    MatTabNavPanel,
    MatTabNav
  ]
})
export class NewBookModule { }
