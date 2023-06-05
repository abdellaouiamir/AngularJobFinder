import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';//angular material
import { MatInputModule } from '@angular/material/input';//
import { MatButtonModule } from '@angular/material/button';//
import { MatCardModule } from '@angular/material/card';//
import { MatIconModule } from '@angular/material/icon';//
import { MatDatepickerModule } from '@angular/material/datepicker';//
import { MatNativeDateModule } from '@angular/material/core';//
import { MatTabsModule } from '@angular/material/tabs';//
import { MatSelectModule } from '@angular/material/select'; //
import { MatStepperModule } from '@angular/material/stepper';//
import { MatCheckboxModule } from '@angular/material/checkbox';//
import { MatRadioModule } from '@angular/material/radio';//
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule
  ]
})
export class SharedModule { }
