import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute ,
     private _ProductService:ProductService,
     private _CartService:CartService,
     private _rendrer:Renderer2,
     private _ToastrService:ToastrService
     ){}
 
 
  productId!:string|null;
  productDetails:any=null;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.productId = params.get('id');
      // console.log(this.productId);
      
    },
    error: (error) => {
      console.log(error);
    }
  })


  this._ProductService.getProductDetails(this.productId).subscribe({
    next: (data) => {
      // console.log(data.data);
      this.productDetails=data.data;
    },
    error: (error) => {
      console.log(error);
    }
  })

}

addToCart(id:any,btnadd:HTMLButtonElement){
  this._rendrer.setAttribute(btnadd,'disabled',"true"),
  this._CartService.addToCart(id).subscribe({

    next: (data) => {
      // console.log(data);
      this._CartService.cartNum.next(data.numOfCartItems)
      this._rendrer.removeAttribute(btnadd,'disabled'),
      this._ToastrService.success(data.message)

      
      
  },
  error: (error) => {
    console.log(error);
    this._rendrer.removeAttribute(btnadd,'disabled')

  }
  })
}



customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    }},
     nav: false
}
}


