import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';



interface Question {
  questionText: string;
  options: string;
  options2: string;
  options3: string;
  result: string;
  result2: string;
  result3: string;
}
interface Results {
  result: string;
  result2: string;
  result3: string;
}
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizName = 'first quiz';
  questions: Question[] = [];
  currentQuestionIndex = 0;
  question: Question | null = null;
  results: Results[] = []
  quiz_id:any
  constructor( private route: ActivatedRoute, private auth:AuthServiceService, private router: Router) { 
    this.route.queryParams.subscribe(params=>{
      this.quiz_id = params['id']
    })
  }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.auth.get_quiz(this.quiz_id).subscribe((res:any)=>{
      console.log(res)
      const data = res
      this.quizName = data.quizName;
      this.questions = data.questions;
      for (let index = 0; index < this.questions.length; index++) {
        this.results.push({result:'false', result2:'false', result3:'false'})
      }
    })
    // const data = {quizName:'hi', questions:[{questionText:'ques1?', options:'answer1', result:true, options2:'answer2', result2:false, options3:'answer3', result3:false}, {questionText:'ques2?', options:'answer21', result:false, options2:'answer22', result2:true,options3:'answer23' ,result3:false}]}

  }

  submit() {
    let score = 0
    for (let index = 0; index < this.questions.length; index++) {
      let t:number = 0
      if (this.questions[index].result === this.results[index].result){
        t = t + 1
      }
      if (this.questions[index].result2 === this.results[index].result2){
        t = t + 1
      }
      if (this.questions[index].result3 === this.results[index].result3){
        t = t + 1
      }
      if(t===3)
        t = 1
      else
        t=0
      score = score + t
    }
    score = (score / this.questions.length)*100
    this.auth.save_score(score, this.quiz_id).subscribe((res:any)=>{
      console.log(res)
      alert(score)
      this.router.navigate(['/'])
    })
  }
}
