import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURLConstants } from 'app/core/constants/api-url.constants';
import { CoreApiService } from 'app/core/services/core-api.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class UserService extends CoreApiService {

  private messageSource = new BehaviorSubject('defaultmessage');
  currentMessage = this.messageSource.asObservable();
  
  constructor(private httpClient:HttpClient) {
    super();
    this.AddApiUrl = APIURLConstants.User.AddUser;
    this.GetListApiUrl = APIURLConstants.User.GetUserList;
    this.GeDetailApiUrl = APIURLConstants.User.GetUserDetails;
    this.UpdateApiUrl = APIURLConstants.User.UpdateUser;
    this.DeleteApiUrl = APIURLConstants.User.DeleteUser;
   }
   
  getDataTableRows() {
    return this.httpClient.get<any>('api/users-data')
  }

  // getRecentAddedUserId(id : string)
  // {
  //   this.messageSource.next(id);
  // }

}
