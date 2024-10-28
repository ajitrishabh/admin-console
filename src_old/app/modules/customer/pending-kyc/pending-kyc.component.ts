import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { GlobalService } from 'src/app/services/global.service';
  
@Component({
  selector: 'app-pending-kyc',
  templateUrl: './pending-kyc.component.html',
  styleUrls: ['./pending-kyc.component.scss'],
  providers : [CustomerService]
})
export class PendingKycComponent implements OnInit {
    lastEvent:any;
    records: any = [];
    totalRecords!: number;
    loading: boolean = false;
    
    
    constructor(private customerService:CustomerService, public global:GlobalService) {
      
    }
    ngOnInit() {
    }
    loadData(event: any) {
        this.loading = true;
        setTimeout(() => {
            this.customerService.getPendingKycUsers({ lazyEvent: JSON.stringify(event) }).subscribe((res) => {
                this.records = res.data.records;
                this.totalRecords = res.data.totalRecords;
                this.loading = false;
                this.lastEvent = event;
            });
        }, 1000);
    }
    
}
