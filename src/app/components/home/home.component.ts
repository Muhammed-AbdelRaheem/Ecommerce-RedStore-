import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/interface/product';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { Category } from 'src/app/core/interface/category';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishListService } from 'src/app/core/service/wish-list.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CutTextPipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _productS: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _renderer: Renderer2,
    private _WishListService:WishListService
  ) { 
    
  }

  product: Product[] = []
  category: Category[] = []
  inpSearch: string = ''
  wishdata:string[]=[]

  ngOnInit(): void {
    this._productS.getProducts().subscribe({
      next: data => {
        // console.log('hi',data);
        this.product = data.data
      },
      error(err) {
        console.log(err);
      }
    })

    this._CartService.getCart().subscribe({
      next: data => {
        console.log(data.data.cartOwner);
        localStorage.setItem('cartOwnerId',data.data.cartOwner)

      },
      error(err) {
        console.log(err);
      }
    })


    this._productS.getcategories().subscribe({
      next: data => {
        this.category = data.data
      },
      error(err) {
        console.log(err);
      }
    })

    this._WishListService.getWishList().subscribe({
      next: data => {
        // console.log("data",data.data);
        let newData=data.data.map((item:any)=>item.id)
        // console.log("newdata", newData);
        this.wishdata=newData
        this._WishListService.wishNum.next(data.count)


      },
      error(err) {
        console.log(err);
      }
    })

  }

  addProduct(id: any, ele: HTMLButtonElement) {
    this._renderer.setAttribute(ele, 'disabled', "true")
    this._CartService.addToCart(id).subscribe({
      next: res => {
        // console.log(res);
        this._ToastrService.success(res.message)
        this._renderer.removeAttribute(ele, 'disabled')
        this._CartService.cartNum.next(res.numOfCartItems)

      },
      error: err => {
        console.log(err);
        this._renderer.removeAttribute(ele, 'disabled')

      }
    })
  }


  addwish(prodId:any):void{
this._WishListService.addToWishList(prodId).subscribe({
  next:res=>{
    // console.log(res);
    this.wishdata=res.data;
    this._ToastrService.success(res.message)
    
    this._WishListService.wishNum.next(res.data.length)
    
    
  },
  error:err=>{
    console.log(err);
  }
})
  }
  removeWish(prodId:any):void{
    this._WishListService.removeFrWishList(prodId).subscribe({
      next:res=>{
        // console.log(res);
        this.wishdata=res.data;
        this._ToastrService.success(res.message)
            this._WishListService.wishNum.next(res.data.length)

      },
      error:err=>{
        console.log(err);
      }
    })





}

categoryOptions: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplaySpeed: 1000,
  touchDrag: true,
  mouseDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 5
    }
  },
  nav: false
}

mainSliderOptions: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplaySpeed: 1000,
  touchDrag: true,
  mouseDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  items: 1,
  nav: false
}
}