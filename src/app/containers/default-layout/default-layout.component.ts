import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MenuService } from 'src/app/services/menu.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  providers:[MenuService]
})
export class DefaultLayoutComponent implements OnInit  {

  public navItems = navItems;
  public menu:any=[];

  constructor(private menuService:MenuService, private global:GlobalService) {}

  ngOnInit() {
    //this.loadMenu();
    this.menu = [{
        id:null,
        name:'Loan Applications',
        url:null,
        children:[{
            id:null,
            name:'All Applications',
            url:'customer/view'
        },{
            id:null,
            name:'Verified KYC',
            url:'customer/verified'
        },{
            id:null,
            name:'Pending KYC',
            url:'customer/pending-kyc'
        }]
    },{
        id:null,
        name:'Loan Disbursal',
        url:null,
        children:[{
            id:null,
            name:'Pending Disbursement Request',
            url:'loan/requests'
        },{
            id:null,
            name:'Disbursed',
            url:'loan/disburst'
        },{
            id:null,
            name:'Closed Loans',
            url:'loan/closed'
        }]
    }
    ,{
        id:null,
        name:'Payment',
        url:null,
        children:[{
            id:null,
            name:'Adjust',
            url:'payment/adjust'
        }]
    }
    ]
  }

  loadMenu(){
    this.menuService.list({}).subscribe((res:any)=>{
        if(res.status)
        {
            this.generateData(res.data);
        }
        else {
            this.menu=[];
        }
    })
}

generateData(menu:any){
    this.menu=[]
    for (let i = 0; i < menu.length; i++) {
        const element = menu[i];
        if(element.active == 1){
            if(element.parent_id==0){
                this.menu.push({
                    name:element.menu,
                    // iconComponent: { name: element.icon},
                    id:element.id,
                    url:element.route
                })
            }
            else {
                let parentIndex = this.menu.findIndex((a:any)=>{
                    return a.id==element.parent_id;
                });
                if(parentIndex>-1){ 
                    delete this.menu[parentIndex]['url'];
                    if(this.menu[parentIndex]['children']){
                        this.menu[parentIndex]['children'].push({
                            name:element.menu,
                            // iconComponent: { name: element.icon},
                            url:element.route,
                        });
                    }
                    else {
                        this.menu[parentIndex]['children']=[];
                        this.menu[parentIndex]['children'].push({
                            name:element.menu,
                            // iconComponent: { name: element.icon},
                            url:element.route
                        });
                    }
                    
                }
            }
        }
    }
    console.log(this.menu);
    this.global.setMenu(this.menu);
  }
}
