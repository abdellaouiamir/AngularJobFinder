import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { FormsModule } from '@angular/forms';

import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConsultCVsComponent } from './consult-cvs/consult-cvs.component';
import { ApplyComponent } from './apply/apply.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CoverletterComponent } from './coverletter/coverletter.component';



@NgModule({
  declarations: [
    ConfirmDeleteComponent,
    ConsultCVsComponent,
    ApplyComponent,
    AddQuizComponent,
    CoverletterComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatInputModule,
    MatRadioModule,
    FormsModule
  ]
})
export class DialogComponentsModule { }
