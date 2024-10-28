import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { GlobalService } from './global.service';
@Injectable({
    providedIn: 'root'
})
export class DataService {

    myParams!: HttpParams;
    userdata:any;
    constructor(private http: HttpClient, private router: Router, private global:GlobalService) {
    
    }

    public gettHttpData(reqURL: string, objData: any) {
      this.userdata = this.global.getUserData();
    //   if(!this.userdata.access_token) {
    //       alert('Session Expired');
    //       this.global.logout();
    //   }
      let httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer ' + this.userdata.access_token,
              //'usertype' : this.userdata.usertype
          })
      };
      this.myParams = new HttpParams();
      for (let key in objData) {
        this.myParams = this.myParams.set(key, objData[key]);
      }
      let url = environment.api_url+''+reqURL+'?'+this.myParams;
      return this.http.get(url, httpOptions).pipe(map((x: any) => {
        return x;
    }))
    .pipe(finalize(() => {}));
    }

    public postHttpData(reqURL: string, objData: any) {
        this.userdata = this.global.getUserData();
        // if(!this.userdata.access_token) {
        //     alert('Session Expired');
        //     this.global.logout();
        // }
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + this.userdata.access_token,
                //'usertype' : this.userdata.usertype
            })
        };
        let url = environment.api_url+''+reqURL;
        return this.http.post(url, objData, httpOptions)
            .pipe(map((x: any) => {
                return x;
            }))
            .pipe(finalize(() => {}));
    }

    public postFileData(reqURL: string, objData: any) {
        this.userdata = this.global.getUserData();
        if(!this.userdata.access_token) {
            alert('Session Expired');
            this.global.logout();
        }
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.userdata.access_token,
                'usertype' : this.userdata.usertype
            })
        };
        let url = environment.api_url+''+reqURL;
        return this.http.post(url, objData, httpOptions)
            .pipe(map((x: any) => {
                return x;
            }))
            .pipe(finalize(() => {}));
    }

    public putHttpData(reqURL: string, objData: any) {
        this.userdata = this.global.getUserData();
        // if(!this.userdata.access_token) {
        //     alert('Session Expired');
        //     this.global.logout();
        // }
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + this.userdata.access_token,
                //'usertype' : this.userdata.usertype
            })
        };
        let url = environment.api_url+''+reqURL;
        return this.http.put(url, objData, httpOptions)
            .pipe(map((x: any) => {
                return x;
            }))
            .pipe(finalize(() => {}));
    }

    public login(objData: any) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        let url = environment.api_url+'auth';
        return this.http.post(url, objData, httpOptions)
            .pipe(map((x: any) => {
                return x;
            }))
            .pipe(finalize(() => {}));
    }
}
