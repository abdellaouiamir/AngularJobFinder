import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface TableData {
  id: number;
  create_at: string;
}

@Component({
  selector: 'app-consult-cvs',
  templateUrl: './consult-cvs.component.html',
  styleUrls: ['./consult-cvs.component.scss']
})
export class ConsultCVsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  dataSource!: MatTableDataSource<TableData>;
  tableData!: TableData[]
  
  constructor(private auth:AuthServiceService, private snackBar: MatSnackBar) { 
    this.consult_cvs()
  }

  ngOnInit(): void {
    
  }


  consult_cvs(){
    this.auth.consult_cv().subscribe((res:any)=>{
      this.tableData = res.msg
      this.dataSource = new MatTableDataSource(this.tableData);
    })
  }
  onDelete(row:any, event:any){
    event.stopPropagation();
    const index = this.dataSource.data.findIndex(r => r.id === row.id)
    if (index !== -1) { 
      this.auth.delete_cv(row.id).subscribe((res:any)=>{
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      })
      
    }
  }

  onClick(id:any){
    this.auth.get_cv(id).subscribe((res:any)=>{
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL)
    })
  }
  add(){
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event:any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.auth.add_cv(formData).subscribe((res:any)=>{
      this.consult_cvs()
      const snackBarRef = this.snackBar.open('Profile Image Updated', 'Close', { duration: 3000 });
      // snackBarRef.afterDismissed().subscribe(()=>{
      //   window.location.reload()
      // })
    },(err)=>{
      console.log(err)
    })
    
  }
}
