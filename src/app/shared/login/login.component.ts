import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true
  loginForm: any
  constructor(private fb:FormBuilder, private auth:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }
  onSubmit(){
    const { email, password } = this.loginForm.value
    this.auth.login(email,password).subscribe((res:any) => {
      console.log(res)
      localStorage.setItem('token',res.token)
      localStorage.setItem('role',res.role)
      this.router.navigate([''])
    },error =>{
      if(error.status === 401)
        this.loginForm.get('password').setErrors({ wrongPassword:true })
        this.loginForm.get('email').setErrors({ wrongPassword:true })
        // alert("Wrong email or password")
    })
  }
  verifie(){

  }
}
