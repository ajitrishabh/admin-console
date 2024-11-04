import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class GlobalService {

    public menus:any = [];
    public filterVisible:boolean = false;
    public filterButton:boolean = false;

    constructor(private router:Router) {
      this.checkLogin()     

    }
    
    //added by ajit
    public checkLogin(){
      let  username = localStorage.getItem('usersession')
      // console.log(username)
      if(username == 'admin@pocketme.in'){
        // return username
        // console.log('match');
        this.router.navigate(['/customer/view'])
        
      }
      else{
        // console.log('didnot');
        this.router.navigate(['/login'])
        
      }
    } 

    public setUserData(data:any){
        localStorage.setItem('userdata',JSON.stringify(data));
    }

    public getUserData() {
        let d = localStorage.getItem('userdata');
        if(d) {
            return JSON.parse(d);
        }
        return null;
    }

    public logout() {
        localStorage.removeItem('userdata');
        this.router.navigate(['/login']);
    }

    public rolelist() {
        if(this.getUserData()) {
            return this.getUserData().roles;
        } 
        return [];
    }

    public setMenu(menu:any) {
        this.menus = JSON.parse(JSON.stringify(menu));
    }

    public getMenu() {
        return this.menus;
    }

    menuTitle() {
        let breadcrumb = [];
        for(let a of this.getMenu()) {
          let _u = this.router.routerState.snapshot.url.substring(1);
          if(_u == a.url) {
            breadcrumb.push(a.name);
            return breadcrumb;
          }
          if(a.children) {
            let found = false;
            for(let b of a.children) {
              if(_u == b.url) {
                breadcrumb.push(b.name);
                found = true;
                break;
              }
            }
            if(found)
                    breadcrumb.unshift(a.name);
          }
        }
        return breadcrumb;
      }

    public signatureGenerater() {
      const stringArr = [];
      for(let i = 0; i< 4; i++){
        const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        stringArr.push(S4);
      }
      return stringArr.join('-'); 
    }

    public getFilterVisible() {
      return this.filterVisible;
    }

    public getUserCommTypeData(data:any, key:any) {
      let find = data.find((a:any)=> a.type == key);
      if(find!=undefined) {
        return find;
      }
      return {type:null,value:null,verified:null};
    }
}