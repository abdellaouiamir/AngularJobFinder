import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CoverletterComponent } from 'src/app/dialog-components/coverletter/coverletter.component';


export interface App {
  job_post_id: any;
  id:any;
  full_name: string;
  title: string;
  application_date: string;
  status: string;
  email: string;
  cover_letter:string;
  cv_id:any;
  quiz_score:any;
  score:any;
} 

@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.component.html',
  styleUrls: ['./manage-app.component.scss']
})
export class ManageAppComponent implements OnInit {

  show = false
  displayedColumns: string[] = ['candidateName', 'positionApplied', 'applicationDate', 'applicationStatus', 'contactInfo', 'viewProfile','Score','Quiz','CV','coverLetter','approve','reject'];
  displayedColumns2: string[] = ['candidateName', 'positionApplied', 'applicationDate', 'applicationStatus', 'contactInfo','Score','Quiz','CV','coverLetter', 'cancel'];
  dataSource!: MatTableDataSource<App>;
  constructor(private auth:AuthServiceService, private dialog: MatDialog) { 
    // const role = 'recruiter'
    const role = localStorage.getItem('role')
    if(role === 'recruiter'){
      this.show = true 
      this.auth.get_app_recruiter().subscribe((res:any)=>{
        console.log(res)
        const candidates: App[] = res.msg
        this.dataSource = new MatTableDataSource(candidates);
      })
    }
    else{
      this.show = false
      this.auth.get_app_candidate().subscribe((res:any)=>{
        console.log(res)
        const candidates: App[] = res.msg
        this.dataSource = new MatTableDataSource(candidates);
      })
    }
  }

  ngOnInit(): void {
  }

  getScoreColor(score: number): string {
    if (score >= 0 && score < 40) {
      return 'red-text';
    } else if (score >= 40 && score < 60) {
      return 'yellow-text';
    } else if (score >= 60 && score <= 100) {
      return 'green-text';
    } else {
      return '';
    }
  }
  getCoverLetter(letter:any){
    console.log(letter)
    const dialogRef = this.dialog.open(CoverletterComponent, {
      data: letter ,
      width:'400px'
    });
  }
  getCV(id:any){
    this.auth.get_cv(id).subscribe((res:any)=>{
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL)
    })
  }
  abandon_job(id:any){
    this.auth.abandon_app(id).subscribe((res:any)=>{
      console.log(res)
      this.auth.get_app_candidate().subscribe((res:any)=>{
        console.log(res)
        this.dataSource = res.msg
      })
    })
  }
  approve(id:any){
    console.log(id)
  }
  reject(id:any){
    console.log(id)
  }
}
