import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
constructor(private _CartService:CartService,
  private _Renderer:Renderer2,
  private _ToastrService: ToastrService,

  ){}

cartDetails:any=null



ngOnInit(): void {

  this._CartService.getCart().subscribe({
    next:data=>{
      this.cartDetails=data.data
      // console.log("hi", data.data.cartOwner);
    },
    error:err=>{
      console.log(err);
    }
  })
}

removeItem(id:any,ele:HTMLButtonElement){
  this._Renderer.setAttribute(ele,'disabled',"true")
  this._CartService.deleteItem(id).subscribe({
    next:data=>{
      // console.log(data);
      this.cartDetails=data.data
      this._Renderer.removeAttribute(ele,'disabled')
      this._CartService.cartNum.next(data.numOfCartItems)

    },
    error:err=>{
      console.log(err);
      this._Renderer.removeAttribute(ele,'disabled')

    }
  })
}
updateitem(id:any,count:number,btn1:HTMLButtonElement,btn2:HTMLButtonElement){
if(count>=1){
  this._Renderer.setAttribute(btn1,'disabled','true')
  this._Renderer.setAttribute(btn2,'disabled','true')

  this._CartService.updateItem(id,count).subscribe({
    next:data=>{
      // console.log(data);
      this._ToastrService.success('Item Updated')
      this.cartDetails=data.data
      this._Renderer.removeAttribute(btn1,'disabled')
      this._Renderer.removeAttribute(btn2,'disabled')
    },
    error:err=>{
      console.log(err);
      this._Renderer.removeAttribute(btn1,'disabled')
      this._Renderer.removeAttribute(btn2,'disabled')
    }
  })
}
}

removeAllItem(){
 this._CartService.deleteAllItem().subscribe({
    next:data=>{
      if(data.messasge="success"){
        this._ToastrService.success(data.messasge,'Items Deleted')
        this.cartDetails=data.data
        this._CartService.cartNum.next(0)


      }
      // console.log(data);

    },
    error:err=>{
      console.log(err);

    }
  })
}


}


