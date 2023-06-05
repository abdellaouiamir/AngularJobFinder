import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true
  RegisterForm: any
  constructor(private fb:FormBuilder, private auth:AuthServiceService) { }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      FullName:['',[Validators.required, Validators.maxLength(20)]],
      Site:['',[Validators.maxLength(10)]],
      Adresse:['',[Validators.maxLength(10)]],
      PhoneNumber:['',[Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/), Validators.maxLength(20)]],
      Birthdate:['',[Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      Role:['',[Validators.required]],
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword:['',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    },{
      validator: this.matchingPasswords('password','confirmPassword')
    })
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ mismatchedPasswords: true });
      }
    };
  }

  registerCandidate(){
  const date = this.RegisterForm.value.Birthdate
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Add 1 to the month because it is zero-indexed
  const day = date.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  // The formatted date will be in the 'YYYY-MM-DD' format
  console.log(formattedDate); // Output: '2023-03-29'
    console.log(this.RegisterForm.value)
  this.auth.register(this.RegisterForm.value).subscribe(res=>{
    console.log(res)
    alert("acount create")
  },error=>{
    console.log(error.error.errors)
  })
  }
}
