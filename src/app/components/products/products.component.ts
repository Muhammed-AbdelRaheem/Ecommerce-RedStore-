import { Component,OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/interface/product';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishListService } from 'src/app/core/service/wish-list.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _productS: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _renderer: Renderer2,
    private _WishListService: WishListService
  ) { }


  product: Product[] = []
  pageSize: number = 0
  currPage: number = 1
  total: number = 0
  wishdata: string[] = []


  ngOnInit(): void {
    this._productS.getProducts().subscribe({
      next: data => {
        // console.log("he", data);
        this.product = data.data
        this.pageSize = data.metadata.limit
        this.currPage = data.metadata.currentPage
        this.total = data.results

      },
      error(err) {
        console.log(err);
      }
    })

    this._WishListService.getWishList().subscribe({
      next: data => {
        let newData = data.data.map((item: any) => item.id)
        this.wishdata = newData
        this._WishListService.wishNum.next(data.count)
      }
    }
    )
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

  addwish(prodId: any): void {
    this._WishListService.addToWishList(prodId).subscribe({
      next: res => {
        // console.log(res);
        this.wishdata = res.data;
        this._ToastrService.success(res.message)

        this._WishListService.wishNum.next(res.data.length)


      },
      error: err => {
        console.log(err);
      }
    })
  }
  removeWish(prodId: any): void {
    this._WishListService.removeFrWishList(prodId).subscribe({
      next: res => {
        // console.log(res);
        this.wishdata = res.data;
        this._ToastrService.success(res.message)
        this._WishListService.wishNum.next(res.data.length)

      },
      error: err => {
        console.log(err);
      }
    })





  }
  pageChanged(event: any) {
    // console.log(event);
    this._productS.getProducts(event).subscribe({
      next: data => {
        // console.log(data.data);
        this.product = data.data
        this.pageSize = data.metadata.limit
        this.currPage = data.metadata.currentPage
        this.total = data.results
        window.scrollTo(0, 0);
      },
      error(err) {
        console.log(err);
      }
    })

  }



}
