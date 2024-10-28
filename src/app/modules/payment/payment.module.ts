import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ViewComponent } from './view/view.component';
import { NgChartsModule } from 'ng2-charts';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { AdjustComponent } from './adjust/adjust.component';



@NgModule({
  declarations: [ViewComponent, AdjustComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    ToastModule,
    TableModule,
    ButtonModule,
    NgChartsModule,
    ProgressBarModule,
    ButtonModule,
    DialogModule
  ]
})
export class PaymentModule { }
