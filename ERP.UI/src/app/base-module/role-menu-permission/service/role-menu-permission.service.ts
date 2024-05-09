import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURLConstants } from 'app/core/constants/api-url.constants';
import { CoreApiService } from 'app/core/services/core-api.service';
import { environment } from 'environments/environment';

const baseUrl = `${environment.apiBaseUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RoleMenuPermissionService extends CoreApiService {

  constructor(private httpClient:HttpClient) { 
    super()
    this.GetListApiUrl= APIURLConstants.RoleMenu.GetModuleIst
    this.DeleteApiUrl = APIURLConstants.RoleMenu.DeleteAllRoleMenu;

  }

  GetAllRoleMenuPermission(){
    return this.httpClient.get(`${baseUrl}user/modulepermission/getallrolemenupermission`)
   }

   AddMenuRolPermission(roleId:any,menuIds:any){
    return this.httpClient.put(`${baseUrl}user/modulepermission?roleId=${roleId}`,menuIds)
   }

   GetMenuRoleMapList(roleId:any){
    return this.httpClient.get(`${baseUrl}user/modulepermission/getrolemenumaplist?RoleId=${roleId}`)
   }

   AddMenuRoleMap(roleMenuMap:any){
    return this.httpClient.post(`${baseUrl}user/modulepermission/managerolemenumap`,roleMenuMap)
   }

}
