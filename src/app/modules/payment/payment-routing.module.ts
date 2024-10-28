import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustComponent } from './adjust/adjust.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path :'view/loan/:loan_id',
  component : ViewComponent,
  data: {
    title: 'Loan Payments',
  }
},{
  path :'view',
  component : ViewComponent,
  data: {
    title: 'Customer Payments',
  }
},{
  path :'adjust/:loan_id',
  component : AdjustComponent,
  data: {
    title: 'Adjust Payment',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
