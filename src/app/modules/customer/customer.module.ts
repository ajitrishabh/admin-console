import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';
import { PendingKycComponent } from './pending-kyc/pending-kyc.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { VerifiedComponent } from './verified/verified.component';


@NgModule({
  declarations: [
    ViewComponent,
    PendingKycComponent,
    VerifiedComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    DialogModule,
    FormsModule
  ]
})
export class CustomerModule { }
