import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { GlobalService } from 'src/app/services/global.service';
  
@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    providers : [CustomerService]
})
export class ViewComponent implements OnInit {
    lastEvent:any;
    records: any = [];
    totalRecords!: number;
    loading: boolean = false;
    sanctionDialog: boolean = false;
    sanctionAmount:any='0';
    selecteduserId: any='';
    
    
    constructor(private customerService:CustomerService, public global:GlobalService) {
      
    }
    ngOnInit() {
    }
    loadData(event: any) {
        this.loading = true;
        setTimeout(() => {
            this.customerService.get({ lazyEvent: JSON.stringify(event) }).subscribe((res) => {
                this.records = res.data.records;
                this.totalRecords = res.data.totalRecords;
                this.loading = false;
                this.lastEvent = event;
            });
        }, 1000);
    }
    deleteUser(row:any) {
        if(confirm("Are you sure you want to delete user?")=== true) {
            this.customerService.delete(row.user_id).subscribe((res) => {
                if(res.status) {
                    alert(res.message);
                    let index = this.records.findIndex((a:any) => a.user_id == row.user_id);
                    if(index>-1) {
                        this.records.splice(index,1);
                    }
                }
            });
        }
    }

    sanctionLoanAmount(row:any) {
        this.sanctionDialog=true;
        setTimeout(()=>{
            this.sanctionAmount =  (row.eligible_loan_amount=='')?'0':parseFloat(row.eligible_loan_amount).toFixed(0);
            this.selecteduserId = row.user_id;
        },300)
    }
    submitAmount(){
        if(!this.sanctionAmount) {
            alert('Select Amount');
            return;
        }
        this.customerService.sanctionLoanAmount({
            user_id : this.selecteduserId,
            eligible_loan_amount : parseFloat(this.sanctionAmount).toFixed(2)
        }).subscribe((res:any) => {
            if(res.status) {
                alert(res.message);
                let index = this.records.findIndex((a:any) => a.user_id == this.selecteduserId);
                if(index>-1) {
                    this.records[index]['eligible_loan_amount'] = this.sanctionAmount;
                }
                this.sanctionAmount=0;
                this.sanctionDialog=false;
                this.selecteduserId='';
            }
            else {
                alert(res.error);
            }
        },(err)=>{
            alert(err);
            // this.sanctionAmount=0;
            // this.sanctionDialog=false;
            // this.selecteduserId='';
        })
    }
    
}