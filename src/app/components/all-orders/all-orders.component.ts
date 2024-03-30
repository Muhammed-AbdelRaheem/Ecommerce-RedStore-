import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from 'src/app/core/service/payment.service';

import { FormsModule } from '@angular/forms';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule,FormsModule,CutTextPipe],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  
  constructor(private _PaymentService:PaymentService) {}
  
  cartId = localStorage.getItem('cartOwnerId')
  ordersData:any[]=[]




ngOnInit(): void {
  this._PaymentService.myOrders(this.cartId).subscribe({
    next: data => {
      // console.log(data);
      this.ordersData = data
    }
     
           
    ,
    error: err => {
      console.log(err);
    }
  })
}
}
