import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:any='';
  password:any='';
  
  constructor(private router:Router,private dataService:DataService, private global:GlobalService) {
    
   }

  login() {
    if(this.email == 'admin@yopmail.com' && this.password == '1234') {
      localStorage.setItem('usersession', this.email);
      this.router.navigate(['/customer/view']) 
    }
    else {
      alert('Email and password is wrong');
    }
    // this.dataService.login({
    //   email: this.email,
    //   password: this.password
    // }).subscribe((res)=>{
    //   if(res.status) {
    //     this.global.setUserData(res.data);
    //     this.router.navigate(['/customer/view'])
    //   }
    //   else {
    //     alert(res.data);
    //   }
    // },(res)=>{
    //   alert(res.error.data);
    // })
  }

}
