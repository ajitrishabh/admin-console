import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingKycComponent } from './pending-kyc/pending-kyc.component';
import { VerifiedComponent } from './verified/verified.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path :'view',
  component : ViewComponent,
  data: {
    title: 'View',
  }
},{
  path :'verified',
  component : VerifiedComponent,
  data: {
    title: 'Verified',
  }
},{
  path :'pending-kyc',
  component : PendingKycComponent,
  data: {
    title: 'Pending KYC',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
