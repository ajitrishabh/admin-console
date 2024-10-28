import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { GlobalService } from 'src/app/services/global.service';
declare const google:any;
@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
  providers:[CustomerService]
})
export class KycComponent implements OnInit,AfterViewInit {
  loading: boolean=false;
  firstloading: boolean=true;
  data: any;
  user_id: any = 0;
  tabindex:any = 0;
  @ViewChild('map') map!: ElementRef;
  constructor(public global:GlobalService, private customerService:CustomerService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('user_id');
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(tabindex=0) {
    this.loading = true;
    setTimeout(() => {
        this.customerService.getUserDetails({user_id:this.user_id}).subscribe((res) => {
          if(res.status == 1) {
            this.data = res.data;
            setTimeout(() => {
              this.initMap(this.data.latitude,this.data.longitude);
            }, 1000);
          }
          this.loading = false;
          this.firstloading = false;
          this.tabindex = tabindex;
        });
    }, 1000);
  }

  getKycData(data:any,key:any) {
    let find = data.find((a:any)=> a.kyc_type == key);
    if(find!=undefined) {
      let father_name = (find.other_details) ? find.other_details.father_name : '';
      let aadhar = (find.other_details) ? find.other_details.aadhar : '';
      let name = (find.other_details) ? find.other_details.name : '';
      return {kyc_number:find.kyc_number,verified:find.status,kyc_type:find.kyc_type,father_name:father_name,name:name,aadhar:aadhar};
    }
    return {kyc_number:null,verified:null,kyc_type:null,father_name:null,name:null,aadhar:null};
  }

  getOtherData(data:any,k:string,key:string) {
    let find = data.find((a:any)=> a.kyc_type == k);
    if(find!=undefined) {
      let obj = find.other_details;
      return (obj && obj[key]) ? obj[key] : null;
    }
    return null;
  }

  getDocData(data:any,key:any) {
    let find = data.find((a:any)=> a.doc_type == key);
    if(find!=undefined) {
      return {path:find.path,verified:find.status};
    }
    return {path:null,verified:null};
  }
  getDataFromLog(data:any,key:any) {
    let find = data.find((a:any)=> a.api_name == key);
    if(find!=undefined) {
      return {name:find.kyc_name};
    }
    return {name:null};
  }

  onerror() {
    return null;
  }

  verify(data:any,type:any,tabindex:number) {
    // find kyc ID
    let find;
    if(type == 'AADHAR') {
      find = data.find((a:any)=> a.kyc_type == 'AADHAR' || a.kyc_type=='MANUAL_AADHAR');
    }
    else {
      find = data.find((a:any)=> a.kyc_type == type);
    }
    if(find!=undefined) {
      let kyc_id = find.id;
      // call verify API
      this.customerService.verifyKyc(kyc_id).subscribe((res:any)=>{
        if(res.status) {
          this.loadData(tabindex);
          alert(res.message);
        }
        else {
          alert(res.error);
        }
      },(err)=>{
        alert(err);
      })
    }
    else {
      alert('Couldnt verify');
    }
  }
  verifyDoc(data:any,type:any,tabindex:number) {
    // find kyc ID
    let find;
    if(type == 'AADHAR') {
      find = data.find((a:any)=> a.doc_type == 'AADHAR' || a.doc_type=='MANUAL_AADHAR');
    }
    else {
      find = data.find((a:any)=> a.doc_type == type);
    }
    if(find!=undefined) {
      let docid = find.id;
      // call verify API
      this.customerService.verifyDocs(docid).subscribe((res:any)=>{
        if(res.status) {
          this.loadData(tabindex);
          alert(res.message);
        }
        else {
          alert(res.error);
        }
      },(err)=>{
        alert(err);
      })
    }
    else {
      alert('Couldnt verify');
    }
  }

  reject(data:any,type:any,tabindex:number) {
    let reason = prompt("Please mention reject reason", "");
    if(reason)  {
      // find kyc ID
      let find;
      if(type == 'AADHAR') {
        find = data.find((a:any)=> a.kyc_type == 'AADHAR' || a.kyc_type=='MANUAL_AADHAR');
      }
      else {
        find = data.find((a:any)=> a.kyc_type == type);
      }
      if(find!=undefined) {
        let kyc_id = find.id;
        // call verify API
        this.customerService.rejectKyc({kyc_id:kyc_id,reason:reason}).subscribe((res:any)=>{
          if(res.status) {
            this.loadData(tabindex);
            alert(res.message);
          }
          else {
            alert(res.error);
          }
        },(err)=>{
          alert(err);
        })
      }
      else {
        alert('Couldnt reject');
      }
    }
  }
  rejectDoc(data:any,type:any,tabindex:number) {
    let reason = prompt("Please mention reject reason", "");
    if(reason)  {
      // find kyc ID
      let find;
      if(type == 'AADHAR') {
        find = data.find((a:any)=> a.doc_type == 'AADHAR' || a.doc_type=='MANUAL_AADHAR');
      }
      else {
        find = data.find((a:any)=> a.doc_type == type);
      }
      if(find!=undefined) {
        let docid = find.id;
        // call verify API
        this.customerService.rejectDocs({docid:docid,reason:reason}).subscribe((res:any)=>{
          if(res.status) {
            this.loadData(tabindex);
            alert(res.message);
          }
          else {
            alert(res.error);
          }
        },(err)=>{
          alert(err);
        })
      }
      else {
        alert('Couldnt reject');
      }
    }
  }

  initMap(lat:any,lng:any): void {
    if(lat && lng) {
      // The location of the marker
      const myLatLng = { lat: parseFloat(lat), lng: parseFloat(lng) };
      // Create the map
      const map = new google.maps.Map(this.map.nativeElement, {
        zoom: 4,
        center: myLatLng
      });

      // Create the marker
      new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: null
      });
    }
  }

  userVerify(user_id:any,status:any) {
    this.customerService.userVerify({user_id:user_id,status:status}).subscribe((res:any)=>{
      if(res.status) {
        this.loadData(0);
        alert(res.message);
      }
      else {
        alert(res.error);
      }
    },(err:any)=>{
      alert(err);
    })
  }
  verifyBank(obj:any) {
    this.customerService.verifyBank({id:obj.id}).subscribe((res:any)=>{
      if(res.status) {
        this.loadData(0);
        alert(res.message);
      }
      else {
        alert(res.error);
      }
    },(err:any)=>{
      alert(err);
    })
  }
  submitReference(obj:any,status:any) {
    this.customerService.referenceVerify({id:obj.id,status:status}).subscribe((res:any)=>{
      if(res.status) {
        this.loadData(0);
        alert(res.message);
      }
      else {
        alert(res.error);
      }
    },(err:any)=>{
      alert(err);
    })
  }
}
