import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';

const baseUrl = `${environment.apiBaseUrl}`;
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  protected http: HttpClient = inject(HttpClient);
  constructor() {
   
  }
  protected get<T>(api: string, options?: any) {
    return this.http.get<T>(`${baseUrl}${api}`, options ?? this.httpOptions);
  }
  protected put<T>(api: string, body: any) {
    return this.http.put<T>(`${baseUrl}${api}`, body, this.httpOptions);
  }
  protected post<T>(api: string, body: any, options?: any) {
    return this.http.post<T>(`${baseUrl}${api}`, body, options ?? this.httpOptions);
  }
  protected delete<T>(api: string) {
    return this.http.delete<T>(`${baseUrl}${api}`, this.httpOptions);
  }
}
