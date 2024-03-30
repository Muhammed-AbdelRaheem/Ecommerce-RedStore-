import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassService {

  constructor( private _HttpClient:HttpClient ) { }

  baseUrl:string="https://ecommerce.routemisr.com/api/v1/auth/"
  forgetPassword(useremail:object):Observable<any>
{
  return this._HttpClient.post(this.baseUrl+'forgotPasswords',useremail)
}  


resetcode(code:object):Observable<any>
{
  return this._HttpClient.post(this.baseUrl+'verifyResetCode',code)
}  


newPass(passowrd:object):Observable<any>{
  return this._HttpClient.put(this.baseUrl+'resetPassword',passowrd)
}


}
