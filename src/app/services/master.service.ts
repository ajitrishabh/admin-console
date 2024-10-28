import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable()
export class MasterService {

    constructor(private dataservice: DataService) { }

    get(req: any=null) {
        return this.dataservice.gettHttpData(`master/group/${req}`, null);
    }

}
