import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/core/service/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})



export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _PaymentService: PaymentService) { }
  
  cardId: string | null = ''
  cartOwner: string | null =''


  paymentForm: FormGroup = new FormGroup(
    {
      details: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required,Validators.pattern(/^01[01245][0-9]{8}$/)]),
                                                                          
      city: new FormControl("", [Validators.required]),

    }
  )
handleForm(){
  this._PaymentService.checkOut(this.cardId,this.paymentForm.value).subscribe({
    next:(res)=>{
      if(res.status=='success'){
  window.open(res.session.url,'_self')
}  
    },
    error(res){
      console.log(res);
      
    }
  })
}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cardId = params.get('id')

        // console.log(this.cardId);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
