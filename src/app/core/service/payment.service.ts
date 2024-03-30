import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  {

  constructor(private _http:HttpClient) { }

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'
  token:any={token:localStorage.getItem('token')};


  checkOut(id:string|null,payInfo:object) :Observable<any> {                     
  return  this._http.post(this.baseUrl+`orders/checkout-session/${id}?url=http://ecommerce-red-store-44oq.vercel.app`,
    {shippingAddress:payInfo},
    {headers:this.token}) 
  }


  myOrders(id:any):Observable<any> {
   return  this._http.get(this.baseUrl+`orders/user/`+id)
  }




}
