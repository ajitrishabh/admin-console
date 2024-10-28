import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosedComponent } from './closed/closed.component';
import { ViewApprovedComponent } from './view-approved/view-approved.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path :'requests',
  component : ViewComponent,
  data: {
    title: 'Loan Requests',
  }
},{
  path :'disburst',
  component : ViewApprovedComponent,
  data: {
    title: 'Disburst Loans',
  }
},{
  path :'closed', 
  component : ClosedComponent,
  data: {
    title: 'Closed Loans',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
