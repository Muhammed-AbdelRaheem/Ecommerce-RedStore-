import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor( private _AuthService:AuthService ,private _Router:Router ,private _FormBuilder:FormBuilder){}
  errormsg:string=''
  isLoading:boolean=false


  registerForm:FormGroup=this._FormBuilder.group({
    name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
    rePassword:[''],
    phone:['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]},
    { validators: [this.comfirmPassword] } as FormControlOptions
    )




  comfirmPassword(form: FormGroup): void {
    let password = form.get("password")
    let rePassword = form.get('rePassword')
    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true })
    }
    else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ missmatch: true })
    }

  }

  handleForm(){
   this.isLoading=true

    let userData = this.registerForm.value;
    this._AuthService.regitser(userData).subscribe({
      next:res=>{
        // console.log(res);
        if(res.message==="success"){
          this._Router.navigate(['/login'])
        }
        this.isLoading=false


      },
      error:err=>{
        console.log(err);
        this.errormsg=err.error.message
        this.isLoading=false

      }
    })   
  }

}
