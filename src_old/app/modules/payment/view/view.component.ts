import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';
import { MasterService } from 'src/app/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    loan_id: any ='';
    user_id: any ='';
  
  constructor(private masterService: MasterService, private loanService: LoanService, private userService:UserService,private fb:FormBuilder, private route:ActivatedRoute) {
      this.cpForm=this.fb.group({
          id          : this.fb.control(0, [Validators.required]),
          loan_amount : this.fb.control(0, [Validators.required]),
          tenure      : this.fb.control(null, [Validators.required]),
          remark      : this.fb.control(null, [Validators.required]),
      });
    }
    ngOnInit() {
        this.loan_id = this.route.snapshot.paramMap.get('loan_id');
        this.user_id = this.route.snapshot.paramMap.get('user_id');
        this.loading = true;
    }
    loadData(event: any) {
        this.loading = true;
        setTimeout(() => {
            if(this.loan_id) {
                this.loanService.loanPaymentDetails({ lazyEvent: JSON.stringify(event),loan_id:this.loan_id }).subscribe((res) => {
                    this.records = res.data.records;
                    this.totalRecords = res.data.totalRecords;
                    this.loading = false;
                    this.lastEvent = event;
                });
            }
            else if(this.user_id) {
                this.loanService.userPaymentDetails({ lazyEvent: JSON.stringify(event),loan_id:this.user_id }).subscribe((res) => {
                    this.records = res.data.records;
                    this.totalRecords = res.data.totalRecords;
                    this.loading = false;
                    this.lastEvent = event;
                });
            }
            else {
                this.loanService.userPaymentDetails({ lazyEvent: JSON.stringify(event),user_id:null }).subscribe((res) => {
                    this.records = res.data.records;
                    this.totalRecords = res.data.totalRecords;
                    this.loading = false;
                    this.lastEvent = event;
                });
            }
        }, 1000);
    }
}