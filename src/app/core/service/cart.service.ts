import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) { }

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'
  token:any={token:localStorage.getItem('token')};

cartNum:BehaviorSubject<number>=  new BehaviorSubject(0)


  addToCart(id:any):Observable<any>{
    return this._http.post(this.baseUrl+'cart',{productId:id})
  }

  getCart():Observable<any>{
   return this._http.get(this.baseUrl+'cart')
  }
  deleteItem(id:any):Observable<any>{
    return this._http.delete(this.baseUrl +`cart/${id}`)
  }
  updateItem(id:any,count:number):Observable<any>{
    return this._http.put(this.baseUrl +`cart/${id}`,{count:count})
  }
  deleteAllItem():Observable<any>{
    return this._http.delete(this.baseUrl +`cart`)

  }
  
}
