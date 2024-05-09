import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CoreApiService extends BaseApiService {

  protected GetListApiUrl: any;
  protected AddApiUrl: any;
  protected UpdateApiUrl: any;
  protected DeleteApiUrl: any;
  protected GeDetailApiUrl: any;
  constructor() {
    super();
  }
  getList(details?:any): Observable<any> {
    return this.get<any>(`${this.GetListApiUrl}`,details);
  }
  add(details: any): Observable<any> {
    return this.post<any>(`${this.AddApiUrl}`, details);
  }
  update(id?:string,details?: any): Observable<any> {
    // if(id==null || id =="")
    // {
    //   return this.put<any>(`${this.UpdateApiUrl}`, details);
    // }
    return this.put<any>(`${this.UpdateApiUrl}`, details);
  }
  manage(details: any): Observable<any> {
    return this.post<any>(`${this.UpdateApiUrl}`, details);
  }
  remove(id: any): Observable<any> {
    return this.delete<any>(`${this.DeleteApiUrl}/${id}`)
  }
  getDetail(id: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);

    return this.get<any>(`${this.GeDetailApiUrl}/${id}`);

    //return this.get<any>(`${this.GeDetailApiUrl}`, { params: queryParams });
  }
}
