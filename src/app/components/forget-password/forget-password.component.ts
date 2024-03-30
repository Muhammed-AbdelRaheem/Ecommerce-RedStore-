import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPassService } from 'src/app/core/service/forget-pass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private _ForgetPassService: ForgetPassService,
    private _Router:Router) { }

  step1: boolean = true
  step2: boolean = false
  step3: boolean = false
  msgUser: string = ''
  email: string = ''
  forgetForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email])
    }
  )

  resetCodeForm: FormGroup = new FormGroup(
    {
      resetCode: new FormControl('', [Validators.required])
    }
  )
  resetPassword: FormGroup = new FormGroup(
    {
      // email:this.forgetForm.get('email')?.value,
      newPassword: new FormControl('', [Validators.required])

    }
  )

  forgetPassword() {
    let useremail = this.forgetForm.value
    this.email = useremail.email
    this._ForgetPassService.forgetPassword(useremail).subscribe({
      next: res => {
        // console.log(res);

        this.msgUser = res.message
        this.step1 = false
        this.step2 = true
      },
      error: err => {
        console.log(err)
        this.msgUser = err.error.message
      }
    })

  }
  resetCode() {
    let code = this.resetCodeForm.value
    this._ForgetPassService.resetcode(code).subscribe({
      next: res => {
        // console.log(res);
        this.msgUser = res.status
        this.step2 = false
        this.step3 = true
      },
      error: err => {
        console.log(err)
        this.msgUser = err.error.message
      }
    })

  }



  newPassword() {
    let password = this.resetPassword.value
    password.email = this.email

    this._ForgetPassService.newPass(password).subscribe({
      next: res => {
        // console.log(res);
      if(res.token){
        localStorage.setItem('token',res.token)
        this._Router.navigate(['/home'])

      }
      },
      error: err => {
        console.log(err)
      }
    })
  }


}







