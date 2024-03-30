import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { WishListService } from 'src/app/core/service/wish-list.service';
declare let $:any;
@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})

export class NavBlankComponent implements OnInit {


private _router =inject(Router)
private _CartService =inject(CartService)
private _Renderer =inject(Renderer2)
private _WishListService =inject(WishListService)


cartnumber:number=0
wishNumber:number=0






@ViewChild('navbar') navele!:ElementRef

@HostListener('window:scroll')
scrollNavBar():void{
  if(scrollY>200){
this._Renderer.addClass(this.navele.nativeElement,'px-5')
this._Renderer.addClass(this.navele.nativeElement,'shadow')

  }
  else{this._Renderer.removeClass(this.navele.nativeElement,'px-5')
  this._Renderer.removeClass(this.navele.nativeElement,'shadow')

}

}

ngOnInit(): void {
  this._CartService.cartNum.subscribe({
    next: cartNum => {
      this.cartnumber=cartNum
      // console.log(cartNum);
    },
    error: err => {
    
      console.log(err);
    }
  }

  )

  this._CartService.getCart().subscribe({
    next: data => {
      
this.cartnumber=data.numOfCartItems   },
    error: err => {
      console.log(err);
    }
  })

  this._WishListService.wishNum.subscribe({
    next: wishNum => {
      this.wishNumber=wishNum
      // console.log(wishNum);
    },
    error: err => {
      console.log(err);
    }
  })


this.hideNavBar()

   
}

  signOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('cartOwnerId')

    this._router.navigate(['/login'])
  }



hideNavBar(){
  $('.nav-link').click(function() {
    $(".navbar-collapse").collapse('hide');
  });
}
  

}
