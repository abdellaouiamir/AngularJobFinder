import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddQuizComponent } from 'src/app/dialog-components/add-quiz/add-quiz.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-post-offre',
  templateUrl: './post-offre.component.html',
  styleUrls: ['./post-offre.component.scss'],
  providers: [DatePipe]
})
export class PostOffreComponent implements OnInit {

  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '4',
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo']
    ]
  };
  from:string=""
  id:any
  post_job: any
  showUpdateButton = false
  constructor(private fb: FormBuilder, private auth: AuthServiceService, public dialog: MatDialog,  private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) { 
    this.route.queryParams.subscribe(params=>{
      this.from = params['from']
      this.id = params['id']
      if (this.from === 'update'){
        this.showUpdateButton = true
        this.auth.consult_post(this.id).subscribe((res:any)=>{
          const formattedDate = this.datePipe.transform(res.msg.expire_at, 'yyyy-MM-dd');
          this.post_job.reset({
            title: res.msg.title,
            description: res.msg.description,
            company: res.msg.company,
            assignments: res.msg.assignments,
            job_requirements: res.msg.job_requirements,
            location: res.msg.location,
            salary: res.msg.salary,
            expire_at: formattedDate
          });
        })
      }else{
        this.showUpdateButton = false
      }
    })
  }

  ngOnInit(): void {
    this.post_job = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
      assignments: ['', Validators.required],
      job_requirements: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      expire_at: ['']
    })
  }
  
  onSubmit(){
    if(this.from === 'update'){
      // console.log(this.post_job.value.job_requirements)
      this.post_job.value.id = this.id
      this.auth.update_post(this.post_job.value).subscribe(res=>{
        alert("post updated")
        this.router.navigate(['/'])
      },error=>{
        console.log(error)
      })
    }
    else{
      this.auth.post_job(this.post_job.value).subscribe((res:any)=>{
        const dialogRef = this.dialog.open(AddQuizComponent, {
          width: '300px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.router.navigate(['/add_quiz'], { queryParams: { id: res.msg } })
          }else{
            alert("post create")
            this.router.navigate(['/'])
          }
        })
      },error=>{
        console.log(error)
      })
    } 
  }
}
