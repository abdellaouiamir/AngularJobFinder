import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-coverletter',
  templateUrl: './coverletter.component.html',
  styleUrls: ['./coverletter.component.scss']
})
export class CoverletterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CoverletterComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
