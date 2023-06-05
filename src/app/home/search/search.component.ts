import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/dialog-components/confirm-delete/confirm-delete.component';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { ApplyComponent } from 'src/app/dialog-components/apply/apply.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: boolean = false;
  showDeleteButton = false
  jobPosts: any
  showFiller = false;
  backgroundImage: SafeUrl;
  searchQuery:string = ""
  constructor(private auth:AuthServiceService, private route: ActivatedRoute, public dialog: MatDialog, private location: Location,  private router: Router) { 
    this.route.queryParams.subscribe(params=>{
      const from = params['from']
      this.isLoading = true
      if (from === 'recruiter'){
        this.showDeleteButton = true
        this.auth.get_my_posts().subscribe((res:any)=>{
          this.jobPosts = res.msg
          this.isLoading = false
        })
      }else{
        this.showDeleteButton = false
        this.auth.get_posts().subscribe((res:any)=>{
          this.jobPosts = res.msg
          this.isLoading = false        })
      }
    })
    this.backgroundImage = 'https://material.angular.io/assets/img/examples/shiba1.jpg'
  }

  ngOnInit(): void {
  }

  apply_post(id:any){
    const dialogRef = this.dialog.open(ApplyComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        const body = { job_id:id, letter: result.letter, cv_id:result.id}
        this.auth.apply_post(body).subscribe((res:any)=>{
          this.auth.check_quiz(id).subscribe((res:any)=>{
            if(res.quiz_id)
              this.router.navigate(['/quiz'], { queryParams: { id: res.quiz_id } })
          })
        })
      }
    })
  }

  delete_post( id:any ){
    this.auth.delete_post(id).subscribe((res:any)=>{
      this.location.go(this.location.path());
      window.location.reload();
    },error =>{
      console.log(error)
    })
  }


  openConfirmationDialog(name: string, id:any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        name: name
      },
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete_post(id)
      }
    })
  }


  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery = filterValue.trim().toLowerCase()
  }


  //still not working
  loadProfileImage(email:string, lazyload: boolean = false){
    // if (!email) {
    //   return of(null)
    // }
    let img_url = ""
    if(lazyload){
      // return this.auth.get_img_by_email(email).pipe(
      //   map(blob => URL.createObjectURL(blob)),
      //   catchError(()=>of(null))
      // )
      console.log('true')
      this.auth.get_img_by_email(email).subscribe((res)=>{
        const reader = new FileReader()
        reader.readAsDataURL(res)
        reader.onloadend = () => {
          img_url =  reader.result as string
        }
      },(err)=>{
        console.log(err)
      })
      return of(img_url)
    }else{
      return of("null")
    }
  }
  search(){
    this.isLoading = true
    this.auth.search(this.searchQuery).subscribe((res:any)=>{
      this.jobPosts = res.data
      this.isLoading = false
    })
  }
}
