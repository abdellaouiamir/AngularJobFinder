import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home.component/home.component.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { PostOffreComponent } from './recruiter/post-offre/post-offre.component';
import { ManageAppComponent } from './recruiter/manage-app/manage-app.component';
import { PostComponent } from './post/post.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { StatisticalComponent } from './recruiter/statistical/statistical.component';
import { GuardauthGuard } from '../guards/guardauth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponentComponent,
    children: [
      {
        path:'',
        component:SearchComponent,
      },
      {
        path:'offre',
        component:SearchComponent,
        canActivate:[GuardauthGuard] 
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate:[GuardauthGuard] 
      },
      {
        path:'post_offre',
        component:PostOffreComponent,
        canActivate:[GuardauthGuard],
      },
      {
        path:'manage_app',
        component:ManageAppComponent,
        canActivate:[GuardauthGuard],
      },
      {
        path:'details',
        component: PostComponent,
        canActivate:[GuardauthGuard],
      },
      {
        path:'add_quiz',
        component: CreateQuizComponent,
        canActivate:[GuardauthGuard],
      },
      {
        path: 'quiz',
        component: QuizComponent,
        canActivate:[GuardauthGuard],
      },
      {
        path: 'statistical',
        component: StatisticalComponent,
        canActivate:[GuardauthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
