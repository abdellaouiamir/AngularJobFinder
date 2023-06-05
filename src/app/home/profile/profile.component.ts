import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  img_url!: string
  hide = true
  pass :any
  reset = false
  profile: any
  show = false
  fullName!: string
  email!: string
  phone!: string
  birthDate!: string
  site!:string
  address!:string
  constructor(private auth:AuthServiceService,  private route: ActivatedRoute, private fb:FormBuilder, private location: Location, private snackBar: MatSnackBar) { 
    this.route.queryParams.subscribe(params=>{
      const email_ = params['email']
      if (email_){
        this.show = true
        this.getImg_by_email(email_)
        this.auth.get_profile_2(email_).subscribe((res:any)=>{
          this.fullName = res.msg.full_name
          this.email = res.msg.email
          this.phone = res.msg.phone_number
          this.birthDate = res.msg.birth_day
          this.site = res.msg.site
          this.address = res.msg.addresse
          this.profile.reset({
            FullName: this.fullName,
            email: this.email,
            PhoneNumber: this.phone,
            Birthdate: this.birthDate,
            site: this.site,
            Adresse: this.address
          })
        },error =>{
          if(error.status === 401)
            console.log(error)
        })
      }else{
        this.show = false
        this.getImg()
        this.auth.get_profile().subscribe((res:any)=>{
          this.fullName = res.msg.full_name
          this.email = res.msg.email
          this.phone = res.msg.phone_number
          this.birthDate = res.msg.birth_day
          this.site = res.msg.site
          this.address = res.msg.addresse
          this.profile.reset({
            FullName: this.fullName,
            email: this.email,
            PhoneNumber: this.phone,
            Birthdate: this.birthDate,
            site: this.site,
            Adresse: this.address
          })
        },error =>{
          if(error.status === 401)
            console.log(error)
        })
      }
    })
  }

  ngOnInit(): void {
    this.profile = this.fb.group({
      FullName:[this.fullName,[Validators.required, Validators.maxLength(20)]],
      site:[this.site, [Validators.maxLength(10)]],
      Adresse:[this.address, [Validators.maxLength(10)]],
      PhoneNumber:[this.phone, [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/), Validators.maxLength(20)]],
      Birthdate:[this.birthDate, [Validators.maxLength(20)]],
      email:[this.email, [Validators.required, Validators.email]]
    })
    this.pass = this.fb.group({
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

  change_password(){
    this.auth.changePassword({password:this.pass.value.password}).subscribe((res:any)=>{
      const snackBarRef = this.snackBar.open('Password Changed', 'Close', { duration: 3000 });
      snackBarRef.afterDismissed().subscribe(()=>{
        window.location.reload()
      })
    })
  }

  update_profile(){
    this.auth.update_profile(this.profile.value).subscribe((res:any)=>{
      const snackBarRef = this.snackBar.open('Profile Updated', 'Close', { duration: 3000 });
      snackBarRef.afterDismissed().subscribe(()=>{
        window.location.reload()
      })
    })
  }
  btn_reset(){
    this.profile.disable()
    this.reset = true
  }
  cancel(){
    this.profile.enable()
    this.reset = false
  }

  onFileSelected(event:any) {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile);
    this.auth.update_img(formData).subscribe((res:any)=>{
      console.log(res)
      const snackBarRef = this.snackBar.open('Profile Image Updated', 'Close', { duration: 3000 });
      snackBarRef.afterDismissed().subscribe(()=>{
        window.location.reload()
      })
    },(err)=>{
      console.log(err)
    })
  }

  getImg(){
    this.auth.get_img().subscribe((res)=>{
      const reader = new FileReader()
      reader.readAsDataURL(res)
      reader.onloadend = () => {
        this.img_url = reader.result as string
      }
    },(err)=>{
      console.log(err)
    })
  }
  getImg_by_email(email:string){
    this.auth.get_img_by_email(email).subscribe((res)=>{
      const reader = new FileReader()
      reader.readAsDataURL(res)
      reader.onloadend = () => {
        this.img_url = reader.result as string
      }
    },(err)=>{
      console.log(err)
    })
  }
}


// routerLink="/profile" [queryParams]="{ email: 'recruiter' }"