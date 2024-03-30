import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'
  constructor(private _http:HttpClient){ }

  getCategories():Observable<any> {
    return this._http.get(this.baseUrl+'categories')
  }

  getSubcategory(id:any):Observable<any>
{
  return this._http.get(this.baseUrl+`categories/${id}/subcategories`)
}

}
  
