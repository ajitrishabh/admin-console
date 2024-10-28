import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-adjust',
  templateUrl: './adjust.component.html',
  styleUrls: ['./adjust.component.scss'],
  providers:[LoanService]
})
export class AdjustComponent implements OnInit {
  chargeList: any = [];
  paymentList: any = [];
  form:any={
    loan_id:'',
    charge_type:'',
    due:'',
    received:'',
    already_received:'',
    balance:'',
    payment_id:''
  }
  max_received: number=0;
  selectedPaymentData:any=null;
  totalDue: number = 0;
  totalPaymentReceived: number = 0;
  loanData: any=null;
  constructor(private loanService:LoanService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.loadCharges();
    if(this.route.snapshot.paramMap.has('loan_id')) {
      this.form.loan_id = this.route.snapshot.paramMap.get('loan_id');
      this.loadLoanPayments();
      this.loanDetails();
    }
  }

  loadCharges() {
    this.loanService.chargeTypes(null).subscribe((res:any)=>{
      if(res.status) {
        this.chargeList = res.data;
      }
    }) 
  }

  loanDetails() {
    this.loanService.getDisbursedLoanById({loan_id:this.form.loan_id}).subscribe((res:any)=>{
      if(res.status && res.data) {
        this.loanData = res.data;
      }
    }) 
  }

  loadLoanPayments() {
    this.paymentList = [];
    this.loanService.loadLoanPayments(this.form.loan_id).subscribe((res:any)=>{
      if(res.status) {
        this.paymentList = res.data.records;
        this.totalPaymentReceived = this.paymentList.reduce((sum:number, a:any)=> (sum + parseFloat(a.remaning_payment_amount)), 0);
      }
    }) 
  }

  getLoanDuesByCharge() {
    this.form.due = '';
    this.form.already_received = '';
    this.form.balance = '';
    this.form.received = '';
    this.max_received =0;
    this.loanService.getLoanDuesByCharge(this.form).subscribe((res:any)=>{
      if(res.status) {
        if(res.data.length>0) {
          this.form.due = res.data[0].total_charge;
          this.form.already_received = res.data[0].total_settled_amount;
          this.form.balance = res.data[0].balance;
          this.max_received = this.form.balance;
          this.totalDue = this.totalDue + parseFloat(res.data[0].balance);
          this.selectPayment();
        }
      }
    })
  }

  calculate() {
    this.form.balance = this.form.due - this.form.received - this.form.already_received;
  }

  selectPayment() {
    this.selectedPaymentData = null;
    let findpaymentdata = this.paymentList.find((a:any)=> a.id== this.form.payment_id);
    if(findpaymentdata!=undefined) {
      this.max_received = (findpaymentdata.remaning_payment_amount<=this.form.balance) ? findpaymentdata.remaning_payment_amount : this.form.balance;
      this.selectedPaymentData = findpaymentdata;
    }
  }

  adjustPayment() {
    this.loanService.adjustPayment({
      loan_id:this.form.loan_id,
      charge_type:this.form.charge_type,
      paid_amount : parseFloat(this.form.received).toFixed(2),
      payment_id : this.form.payment_id
    }).subscribe((res:any)=>{
      if(res.status) {
        alert(res.message);
        window.location.reload();
      }
      else {
        alert(res.error);
      }
    },(err) =>{
      alert(err.message);
    })
  }

}
