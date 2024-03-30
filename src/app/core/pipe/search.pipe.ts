import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value:Product[], term: string): Product[] {
    return value.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase())) ;
  }

}
