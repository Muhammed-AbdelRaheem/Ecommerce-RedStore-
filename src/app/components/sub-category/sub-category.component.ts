import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/service/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  constructor(private _CategoryService: CategoryService, private _ActivatedRoute: ActivatedRoute) { }
  subCategoryId: any = ''
  subCategoryData: any = []
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        // console.log(params.get('id'));

        this.subCategoryId = params.get('id')

      },
      error: (error) => {
        console.log(error);
      }
    })

    this._CategoryService.getSubcategory(this.subCategoryId).subscribe({
      next: data => {
        // console.log(data.data);
        this.subCategoryData = data.data
      },
      error: (error) => {
        console.log(error);
      }
    })



  }
}
