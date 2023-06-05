import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { RegisterComponent } from './shared/register/register.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'resetPassword',
    component:ResetPasswordComponent
  },
  {
    path:'**',
    component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
