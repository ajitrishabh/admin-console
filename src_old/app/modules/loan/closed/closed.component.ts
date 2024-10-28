import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { MasterService } from 'src/app/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-closed',
    templateUrl: './closed.component.html',
    styleUrls: ['./closed.component.scss'],
    providers : [UserService, LoanService, MasterService]
})
export class ClosedComponent implements OnInit {

    astEvent:any;
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
          this.loanService.getClosed({ lazyEvent: JSON.stringify(event) }).subscribe((res) => {
              this.records = res.data.records;
              this.totalRecords = res.data.totalRecords;
              this.loading = false;
          });
      }, 1000);
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
}