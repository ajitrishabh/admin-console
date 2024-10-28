import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class LoanService {

  constructor(private dataService: DataService) { }
  
  get(req:any){
    return this.dataService.postHttpData('loan/user-requests', req);
  }
  getApproved(req:any){
    return this.dataService.postHttpData('loan/user-disbursed-loans', req);
  }
  getClosed(req:any){
    return this.dataService.postHttpData('loan/user-closed-loans', req);
  }
  getCharges(req:any){
    return this.dataService.postHttpData('loan/get-loan-charges', req);
  }
  approveLoan(req:any){
    return this.dataService.putHttpData('loan/approve-loan-request/'+req.loanid, req);
  }
  userPaymentDetails(req:any){
    return this.dataService.postHttpData('loan/user-payment-details/'+req.user_id, req);
  }
  loanPaymentDetails(req:any){
    return this.dataService.postHttpData('loan/loan-payment-details/'+req.loan_id, req);
  }

  chargeTypes(req:any){
    return this.dataService.gettHttpData('charge-master', req);
  }
  loadLoanPayments(loan_id:any){
    return this.dataService.postHttpData('loan/loan-payment-details/'+loan_id, null);
  }
  getLoanDuesByCharge(req:any){
    return this.dataService.postHttpData('loan/show-overall-dues-by-charge-type/'+req.loan_id+'/'+req.charge_type, null);
  }
  adjustPayment(req:any){
    return this.dataService.postHttpData('loan/adjust-customer-payment/'+req.loan_id+'/'+req.charge_type, req);
  }
  getDisbursedLoanById(req:any){
    return this.dataService.gettHttpData('loan/user-disbursed-loans/'+req.loan_id, null);
  }

}
