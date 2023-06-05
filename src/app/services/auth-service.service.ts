import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  server_url = environment.serveur_url
  helper = new JwtHelperService()

  constructor(private http:HttpClient, private router: Router) { }

  register(data:any){
    //const { full_name,site, addresse, email, password, phone,  birthDay } = req.body
    return this.http.post(`${ this.server_url }/register`,data)
  }

  login(email:string,password:string){
    const user = {email:email , password:password}
    return this.http.post(`${ this.server_url }/login`,user)
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLogged(){
    let token:any = localStorage.getItem('token');
    // const decodedToken = this.helper.decodeToken(token);
    if(!this.helper.isTokenExpired(token)){
      return true
    }else{
      return false
    }
  }
  sendOTP(data:any){
    // const { email } = data
    return this.http.post(`${ this.server_url }/sendOTP`, data)
  }

  updatePassword(data:any){
    const { email, OTP, password} = data
    const user = {email:email, OTP:OTP, password:password}
    return this.http.post(`${ this.server_url }/forgetPassword`, user)
  }

  changePassword(data:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${environment.serveur_url}/changePassword`, data,{ headers })
  }

  get_profile(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${environment.serveur_url}/get_profile`,{ headers })
  }

  get_profile_2(email:string){
    const headers = new HttpHeaders().set('email',`${email}`)
    return this.http.get(`${environment.serveur_url}/get_profile_2`,{ headers })
  }

  update_profile(post:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/update_profile`, post, { headers })
  }

  get_posts(){
    return this.http.get(`${this.server_url}/get_posts`)
  }
  get_my_posts(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${environment.serveur_url}/get_my_posts`,{ headers })
  }
  post_job(post:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/postJob`, post, { headers })
  }
  consult_post(id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${environment.serveur_url}/consult_post?id=${id}`,{ headers })
  }
  delete_post(id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.delete(`${ this.server_url }/deleteJobPost?id=${id}`, { headers })
  }
  update_post(post:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/update_post`, post, { headers })
  }
  apply_post(body:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/apply_job`, body, { headers })
  }
  get_app_candidate(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/consult_app_candidate`, { headers })
  }
  get_app_recruiter(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/consult_app_recruiter`, { headers })
  }

  abandon_app(id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    const body = {app_id:id}
    return this.http.post(`${ this.server_url }/abandon_job`, body, { headers })
  }

  get_img(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/get_profile_img`, { headers, responseType: 'blob' })
  }
  get_img_by_email(email:string){
    const headers = new HttpHeaders().set('email',`${email}`)
    return this.http.get(`${ this.server_url }/get_profile_img_by_email`, { headers, responseType: 'blob' })
  }
  update_img(img:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/upload_img`, img, { headers })
  }

  // CV
  delete_cv(id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.delete(`${ this.server_url }/delete_cv?id=${id}`, { headers })
  }
  add_cv(cv:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/upload_cv`, cv, { headers })
  }
  consult_cv(){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/consult_cv`, { headers })
  }
  get_cv(id:any){
    const headers = new HttpHeaders().set('id',`${id}`)
    return this.http.get(`${ this.server_url }/get_cv`, { headers, responseType: 'blob' })
  }

  //quiz
  check_quiz(id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/checkQuiz?id=${id}`, { headers })
  }

  add_quiz(body:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.post(`${ this.server_url }/addQuiz`, body, { headers })
  }

  get_quiz(id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/getQuiz?id=${id}`, { headers })
  }

  save_score(score:any, id:any){
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`${token}`)
    return this.http.get(`${ this.server_url }/save_score?score=${score}&id=${id}`, { headers })
  }
  search(query:any){
    return this.http.get(`${ this.server_url }/search?query=${query}`)
  }
}
