import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  data:any
  firstFormGroup = this.fr.group({
    email: ['', Validators.required],
  });
  secondFormGroup = this.fr.group({
    otp: ['', Validators.required],
  });
  thirdFormGroup = this.fr.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private fr: FormBuilder, private auth:AuthServiceService) { }

  ngOnInit(): void {
  }
  sendEmail(){
    this.data = this.firstFormGroup.value
    this.auth.sendOTP(this.data).subscribe((res)=>{
      console.log(res)
    })
  }
  resetPassword(){
    this.data = { email:this.firstFormGroup.value?.email, OTP:this.secondFormGroup.value?.otp, password:this.thirdFormGroup.value?.password}
    this.auth.updatePassword(this.data).subscribe((res)=>{
      console.log(res)
      alert('Password changed')
    })
  }
}
