import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _http:HttpClient) { }
baseUrl:string="https://ecommerce.routemisr.com/api/v1/auth/"
  regitser(userdata:object):Observable<any>{
return this._http.post(this.baseUrl+'signup',userdata)
  }
  login(userdata:object):Observable<any>{
    return this._http.post(this.baseUrl+'signin',userdata)
      }
}
