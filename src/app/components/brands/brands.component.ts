import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'src/app/core/service/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private BrandsService:BrandsService){}

brandsData:any[]=[]

ngOnInit(): void {
  this.BrandsService.getBrands().subscribe({
    next: data => {
      // console.log(data.data);
      this.brandsData=data.data

    },
    error(err) {
      console.log(err);
    }
    
  })
}

}
