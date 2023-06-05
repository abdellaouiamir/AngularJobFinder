import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {MatDialog} from '@angular/material/dialog';
import { ConsultCVsComponent } from 'src/app/dialog-components/consult-cvs/consult-cvs.component';

@Component({
  selector: 'app-home.component',
  templateUrl: './home.component.component.html',
  styleUrls: ['./home.component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  islogged = false
  userRole = 'Recruiter'
  constructor(private auth:AuthServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.islogged = this.auth.isLogged()
  }
  
  logout(){
    this.auth.logout()
  }
  openDialog(){
    const dialogRef = this.dialog.open(ConsultCVsComponent, {
      width: '400px'
    })
  }
}
