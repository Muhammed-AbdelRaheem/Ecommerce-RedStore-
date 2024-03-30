import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/service/category.service';
import { Category } from 'src/app/core/interface/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements  OnInit  {
  constructor(private _CategoryService:CategoryService){}

  category:Category[]=[]
  ngOnInit(): void {
    this._CategoryService.getCategories().subscribe(
      {next:(resp)=>{
        // console.log(resp.data);
        this.category=resp.data
      },
    error:(err)=>{console.log(err)}}
      
    )
  }

}
