import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { MasterService } from 'src/app/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    providers : [UserService, LoanService, MasterService]
})
export class ViewComponent implements OnInit {
    lastEvent:any;
    records: any = [];
    totalRecords!: number;
    loading: boolean = false;
    approvevisible: boolean = false;
    cpForm: FormGroup;
    selectedRow: any;
    statusList: any = [{id:'d5d94f02-9708-4f06-bada-a6a217782b41',value:'Approved'},{id:'811cfdca-5c09-457a-8527-d92571675c2e',value:'Rejected'}];
    popuptype: any;
  
  constructor(private masterService: MasterService, private loanService: LoanService, private userService:UserService,private fb:FormBuilder) {
      this.cpForm=this.fb.group({
          id          : this.fb.control(0, [Validators.required]),
          loan_amount : this.fb.control(0, [Validators.required]),
          tenure      : this.fb.control(null, [Validators.required]),
          remark      : this.fb.control(null, [Validators.required]),
      });
    }
    ngOnInit() {
        this.loading = true;
    }
    loadData(event: any) {
        this.loading = true;
        setTimeout(() => {
            this.loanService.get({ lazyEvent: JSON.stringify(event) }).subscribe((res) => {
                this.records = res.data.records;
                this.totalRecords = res.data.totalRecords;
                this.loading = false;
                this.lastEvent = event;
            });
        }, 1000);
    }
    onSubmit() {
        this.loanService.approveLoan({
            loanid : this.f.id.value,
            loan_amount : this.f.loan_amount.value,
            tenure : this.f.tenure.value,
            remark : this.f.remark.value,
            loan_purpose:this.selectedRow.loan_purpose,
            loan_type_emi:false,
            bank_id : this.selectedRow.bank_id
        }).subscribe((res)=>{
            if(res.status) {
                alert('Loan request has been disburst successfully.');
                this.approvevisible = false;
                this.loadData(this.lastEvent);
            }
            else {
                alert(res.error); 
            }
        },(error)=>{
            alert(error); 
        })
    }

    approveloan(row:any, type:any) {
        this.approvevisible = true;
        this.popuptype=type;
        this.selectedRow = row;
        this.cpForm.patchValue({
            id : row.loan_id,
            loan_amount : row.requested_loan_amount,
            tenure : row.tenure
        });
    }

    calculateLoan() {
        this.loanService.getCharges({
            loan_amount : this.f.loan_amount.value,
            tenure : this.f.tenure.value
        }).subscribe((res:any)=>{
            if(res.status) {
                this.selectedRow.disbursal_amount=res.data.disbursal_amount;
                this.selectedRow.gst_amount=res.data.gst_amount;
                this.selectedRow.gst_percent=res.data.gst_percent;
                this.selectedRow.interest_amount=res.data.interest_amount;
                this.selectedRow.interest_percent=res.data.interest_percent;
                this.selectedRow.loan_amount=res.data.loan_amount;
                this.selectedRow.processing_fee=res.data.processing_fee;
                this.selectedRow.processing_fee_percent=res.data.processing_fee_percent;
                this.selectedRow.repayment_amount=res.data.repayment_amount;
                this.selectedRow.due_date=res.data.due_date;
            }
        })
    }

    get f() {
        return this.cpForm.controls;
    }

    // loadStatuses() {
    //     this.masterService.get('loan_status').subscribe((res:any)=>{
    //         if(res.status) {
    //             this.statusList = res.data;
    //         }
    //     })
    // }
}