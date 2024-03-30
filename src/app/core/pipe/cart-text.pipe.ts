import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartText'
})
export class CartTextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
