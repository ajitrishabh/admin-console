import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { RequiredDirective } from 'src/app/directives/required.directive';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ViewComponent } from './view/view.component';
import { NgChartsModule } from 'ng2-charts';
import { ProgressBarModule } from 'primeng/progressbar';
import { ViewApprovedComponent } from './view-approved/view-approved.component';
import { DialogModule } from 'primeng/dialog';
import { ClosedComponent } from './closed/closed.component';

@NgModule({
  declarations: [
    RequiredDirective,
    ViewComponent,
    ViewApprovedComponent,
    ClosedComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
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
  ],
  exports :[RequiredDirective]
})
export class LoanModule { }
