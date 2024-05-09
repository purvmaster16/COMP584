import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURLConstants } from 'app/core/constants/api-url.constants';
import { CoreApiService } from 'app/core/services/core-api.service';
import { environment } from 'environments/environment';

const baseUrl = `${environment.apiBaseUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserRolePermissionService extends CoreApiService {

  constructor(private httpClient:HttpClient) {
    super()
     this.GetListApiUrl = APIURLConstants.UserRole.GetUserRoleList;  
     this.DeleteApiUrl = APIURLConstants.UserRole.DeleteAllUserRole;
     this.GeDetailApiUrl=APIURLConstants.UserRole.GetUserRoleDetails;
   }
   
   AddUserRolePermission(userId:string,roleNames:any){
    return this.httpClient.put(`${baseUrl}user/userolemanagement/${userId}/roles`,roleNames)
   }
}
