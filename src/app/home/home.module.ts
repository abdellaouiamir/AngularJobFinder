import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularEditorModule } from '@kolkov/angular-editor'
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MatExpansionModule } from '@angular/material/expansion';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponentComponent } from './home.component/home.component.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { PostOffreComponent } from './recruiter/post-offre/post-offre.component';
import { ManageAppComponent } from './recruiter/manage-app/manage-app.component';
import { PostComponent } from './post/post.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { StatisticalComponent } from './recruiter/statistical/statistical.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    HomeComponentComponent,
    ProfileComponent,
    SearchComponent,
    PostOffreComponent,
    ManageAppComponent,
    PostComponent,
    CreateQuizComponent,
    QuizComponent,
    StatisticalComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    MatSnackBarModule,
    LazyLoadImageModule,
    MatRadioModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
