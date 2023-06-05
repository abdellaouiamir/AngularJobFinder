import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface TableData {
  id: number;
  create_at: string;
}

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  coverLetter: string = '';
  dataSource!: MatTableDataSource<TableData>;
  tableData!: TableData[]
  constructor(private auth:AuthServiceService, public dialogRef: MatDialogRef<ApplyComponent>) { }

  ngOnInit(): void {
    this.consult_cvs()
  }

  consult_cvs(){
    this.auth.consult_cv().subscribe((res:any)=>{
      this.tableData = res.msg
      this.dataSource = new MatTableDataSource(this.tableData);
    })
  }

  onClick(id:any){
    this.auth.get_cv(id).subscribe((res:any)=>{
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }

  selectedRow: any;

  onRowSelect(row: any) {
    this.selectedRow = row;
  }

  closeDialog(letter: any) {
    const data = { letter:letter, id:this.selectedRow.id}
    this.dialogRef.close(data);
  }

}
