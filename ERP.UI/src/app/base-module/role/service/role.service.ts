import { Injectable } from '@angular/core';
import { APIURLConstants } from 'app/core/constants/api-url.constants';
import { CoreApiService } from 'app/core/services/core-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CoreApiService   {

  constructor() {
    super()
    this.GetListApiUrl = APIURLConstants.Role.GetRoleList;
    this.AddApiUrl = APIURLConstants.Role.AddRole;
    this.GeDetailApiUrl = APIURLConstants.Role.GetRoleDetails;
    this.UpdateApiUrl = APIURLConstants.Role.UpdateRole;
    this.DeleteApiUrl = APIURLConstants.Role.DeleteRole;
   }
}
