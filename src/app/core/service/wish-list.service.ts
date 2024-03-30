import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'


  constructor( private _HttpClient:HttpClient) { }

  wishNum :BehaviorSubject<number>=new BehaviorSubject(0)




  getWishList():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`wishlist`)
  }
  addToWishList (prodId:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+`wishlist`,{productId:prodId})
  }
  removeFrWishList (prodId:any):Observable<any>
  {
    return this._HttpClient.delete(this.baseUrl+`wishlist/${prodId}`)
  }

}
