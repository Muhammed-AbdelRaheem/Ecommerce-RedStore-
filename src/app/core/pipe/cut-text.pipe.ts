import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutTextPipe implements PipeTransform {

  transform(value:string,num:number):string {
    return value.split(" ").slice(0,num).join(" ");
  }

}
