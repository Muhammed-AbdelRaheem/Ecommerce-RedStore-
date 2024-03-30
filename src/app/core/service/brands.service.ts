import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService  {
  constructor(private _HttpClient:HttpClient ) { }

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'

  getBrands():Observable<any> {
  return  this._HttpClient.get(this.baseUrl+'brands')
  }

  getSpecfBrand(id:any):Observable<any> {
    return  this._HttpClient.get(this.baseUrl+'brands/'+id)
    }



}
