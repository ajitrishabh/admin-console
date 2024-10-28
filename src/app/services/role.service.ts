import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable()
export class RoleService {

    constructor(private dataservice: DataService) { }

    getAll(req: any=null) {
        return this.dataservice.gettHttpData('role', req);
    }
    
    post(req: any) {
        return this.dataservice.postHttpData('role', req);
    }

    put(req: any) {
        return this.dataservice.putHttpData(`role/${req.id}`, req);
    }

}
