import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'src/app/core/service/brands.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specific-brand.component.html',
  styleUrls: ['./specific-brand.component.scss']
})
export class SpecificBrandComponent implements OnInit {
  constructor(private _BrandsService: BrandsService, private _ActivatedRoute: ActivatedRoute) { }

  brandId:any = ''
  brands:any={}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        // console.log(params.get('id'));

        this.brandId = params.get('id')

      },
      error: (error) => {
        console.log(error);
      }
    })

this._BrandsService.getSpecfBrand(this.brandId).subscribe({
  next: data => {
    // console.log(data);
    this.brands=data.data
    
  },
  error: (err) => {
    console.log(err);
  }
})

  }

  
}
