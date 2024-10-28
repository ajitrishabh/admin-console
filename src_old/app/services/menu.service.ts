import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable()
export class MenuService {

    constructor(private dataservice: DataService) { }

    getAll(req: any=null) {
        return this.dataservice.gettHttpData('menu', req);
    }
    
    post(req: any) {
        return this.dataservice.postHttpData('menu', req);
    }

    getByParams(req:any) {
        return this.dataservice.gettHttpData('menu/:key/:value', req);
    }

    list(req:any) {
        return this.dataservice.gettHttpData('menu/list', req);
    }

}
