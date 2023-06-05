import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApplyComponent } from 'src/app/dialog-components/apply/apply.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  data = {
    title:'',
    description:'',
    company:'',
    expire_at:'',
    job_requirements:'',
    location:'',
    salary:'',
    assignments:'',
    created_at:''
  }
  post_id:any

  constructor(private auth: AuthServiceService,  private route: ActivatedRoute, public dialog: MatDialog, private router: Router) { 
    this.route.queryParams.subscribe(params=>{
      this.post_id = params['id']
      this.auth.consult_post(this.post_id).subscribe((res:any)=>{
        this.data = res.msg
      })
    })
  }

  apply(){
    const dialogRef = this.dialog.open(ApplyComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        const body = { job_id:this.post_id, letter: result.letter, cv_id:result.id}
        this.auth.apply_post(body).subscribe((res:any)=>{
          console.log(res)
          if(res.status === 'Failed'){
            alert('Your are alerady applied')
          }else{
            this.auth.check_quiz(this.post_id).subscribe((res:any)=>{
              if(res.quiz_id){
                this.router.navigate(['/quiz'], { queryParams: { id: res.quiz_id } })
              }else{
                alert("Applied")
              }
            })
          } 
        })
      }
    })
  }
  ngOnInit(): void {
  }
}
