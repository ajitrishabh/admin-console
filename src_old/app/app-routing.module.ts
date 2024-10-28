import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { PagesModule } from './views/pages/pages.module';
import { AuthGuard } from './services/authguard.service';
import { LoanModule } from './modules/loan/loan.module';
import { PaymentModule } from './modules/payment/payment.module';
import { KycModule } from './modules/kyc/kyc.module';
import { CustomerModule } from './modules/customer/customer.module';

const routes: Routes = [
  {
    path:'',
    component : LoginComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
        DashboardModule
      },
      {
        path: 'pages',
        loadChildren: () =>
        PagesModule
      },
      {
        path: 'loan',
        loadChildren: () =>
        LoanModule,
        data: {
        },
        title: 'Loans',
      },
      {
        path: 'payment',
        loadChildren: () =>
        PaymentModule,
        data: {
          title: 'Payment',
        }
      },
      {
        path: 'kyc',
        loadChildren: () =>
        KycModule,
        data: {
        },
        title: 'Kyc',
      },
      {
        path: 'customer',
        loadChildren: () =>
        CustomerModule,
        data: {
          title: 'Customer',
        }
      }
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
