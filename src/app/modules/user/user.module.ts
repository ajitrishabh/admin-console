import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    SharedModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
