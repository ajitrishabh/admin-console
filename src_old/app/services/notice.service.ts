import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable()
export class NoticeService {

    constructor(private dataservice: DataService) { }

    getAll(req: any=null) {
        return this.dataservice.gettHttpData('legal_notice', req);
    }
    
    post(req: any) {
        return this.dataservice.postFileData('legal_notice', req);
    }

    put(req: any) {
        return this.dataservice.putHttpData(`legal_notice/${req.id}`, req);
    }

}
