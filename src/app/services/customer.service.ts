import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class CustomerService {

  constructor(private dataService: DataService) { }

  get(req:any) {
    return this.dataService.gettHttpData(`user`, req);
  }
  getUserDetails(req:any) {
    return this.dataService.gettHttpData(`user/${req.user_id}`, req);
  }
  getPendingKycUsers(req:any) {
    return this.dataService.gettHttpData(`user/pending-kyc-user`, req);
  }
  verifyKyc(kyc_id:any) {
    return this.dataService.putHttpData(`kyc/verify-kyc/${kyc_id}`, null);
  }
  verifyDocs(docid:any) {
    return this.dataService.putHttpData(`kyc/verify-doc/${docid}`, null);
  }
  rejectKyc(req:any) {
    return this.dataService.putHttpData(`kyc/reject-kyc/${req.kyc_id}`, req);
  }
  rejectDocs(req:any) {
    return this.dataService.putHttpData(`kyc/reject-doc/${req.docid}`, req);
  }
  delete(user_id:any) {
    return this.dataService.gettHttpData(`user/delete-user/${user_id}`, null);
  }
  userVerify(req:any) {
    return this.dataService.putHttpData(`user/verify-user/${req.user_id}`, req);
  }
  verifyBank(req:any) {
    return this.dataService.putHttpData(`user/verify-bank/${req.id}`, null);
  }
  referenceVerify(req:any) {
    return this.dataService.putHttpData(`user/verify-reference/${req.id}`, req);
  }
  sanctionLoanAmount(req:any) {
    return this.dataService.putHttpData(`user/sanction-loan-amount/${req.user_id}`, req);
  }
}
