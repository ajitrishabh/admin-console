import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { DataService } from 'src/app/services/data.service';
import { GlobalService } from 'src/app/services/global.service';
// import { ToastModule } from '@coreui/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:any='';
  password:any='';
  
  constructor(private router:Router,private dataService:DataService, private global:GlobalService) {
    
    global.checkLogin() //check if session exist & redirect -ajit
  
  }
  

  login() {
    if(this.email == 'admin@pocketme.in' && this.password == 'admin@123') {
      localStorage.setItem('usersession', this.email);
      this.router.navigate(['/customer/view']) 
    }
    else {
      alert('Please enter username and password.');
      
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
