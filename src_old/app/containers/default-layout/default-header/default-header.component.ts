import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public rolelist:any=[];
  public usertype:any = '';

  constructor(private classToggler: ClassToggleService, public global:GlobalService, private router:Router) {
    super();
    this.rolelist = this.global.rolelist();
    this.usertype = this.global.getUserData()?.usertype || '';
  }

  changeAccount() {
    let data = this.global.getUserData();
    if(data) {
      data.usertype = this.usertype;
      this.global.setUserData(data);
      window.location.reload();
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
