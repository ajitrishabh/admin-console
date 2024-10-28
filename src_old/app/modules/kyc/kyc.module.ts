import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycRoutingModule } from './kyc-routing.module';
import { KycComponent } from './kyc.component';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    KycComponent
  ],
  imports: [
    CommonModule,
    KycRoutingModule,
    TabViewModule
  ]
})
export class KycModule { }
