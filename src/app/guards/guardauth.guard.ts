import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardauthGuard implements CanActivate {
  constructor(private auth:AuthServiceService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,reject)=>{
      if(this.auth.isLogged()){
        resolve(true)
      }else{
        this.router.navigate(["/login"])
        resolve(false)
      }
    })
  }

  
  
}
