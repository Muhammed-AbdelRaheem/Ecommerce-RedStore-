import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }
  errormsg: string = ''
  isLoading: boolean = false


  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]]
  }
  )





  handleForm() {
    this.isLoading = true

    let userData = this.loginForm.value;
    this._AuthService.login(userData).subscribe({
      next: res => {
        // console.log(res);
        if (res.message === "success") {
          localStorage.setItem('token',res.token)
          this._Router.navigate(['/home'])
        }
        this.isLoading = false


      },
      error: err => {
        console.log(err);
        this.errormsg = err.error.message
        this.isLoading = false

      }
    })
  }


}
