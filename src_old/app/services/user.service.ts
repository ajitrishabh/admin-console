import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UserService {

  constructor(private dataService: DataService) { }

  get(user_id:any) {
    return this.dataService.gettHttpData(`user/details/${user_id}`, null);
  }

}
