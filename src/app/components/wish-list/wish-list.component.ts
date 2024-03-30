import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/core/service/wish-list.service';
import { CartService } from 'src/app/core/service/cart.service';
import { Product } from 'src/app/core/interface/product';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule,RouterLink,CutTextPipe],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _renderer: Renderer2,
    private _WishListService:WishListService
  ) { }
  product: Product[] = []
  wishdata:string[]=[]



  ngOnInit(): void {
 
      this._WishListService.getWishList().subscribe({
        next: data => {
          // console.log(data.data);
          this.product = data.data
        },
        error(err) {
          console.log(err);  }
          
  
    
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
  })}
      

  addwish(prodId:any):void{
    this._WishListService.addToWishList(prodId).subscribe({
      next:res=>{
        // console.log(res);
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
            this._ToastrService.success(res.message)
            this.wishdata=res.data

            let newWishData=this.product.filter((item)=>this.wishdata.includes(item._id))

            this.product=newWishData

            this._WishListService.wishNum.next(res.data.length)

          },
          error:err=>{
            console.log(err);
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
}
