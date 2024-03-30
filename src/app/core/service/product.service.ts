import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrl:string='https://ecommerce.routemisr.com/api/v1/'
  constructor(private _http:HttpClient){ }
getProducts(pageNum:number=1):Observable<any> {
  return this._http.get(this.baseUrl+`products?page=${pageNum}&limit=20`)

}
getcategories():Observable<any> {
  return this._http.get(this.baseUrl+'categories')}


getProductDetails(id:string|null):Observable<any>{
return this._http.get(this.baseUrl+`products/${id}`)
}
}