import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  quizForm!: FormGroup;
  job_id:any
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private auth:AuthServiceService) { 
    this.route.queryParams.subscribe(params=>{
      this.job_id = params['id']
    })
  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      quizName: ['', Validators.required],
      questions: this.fb.array([
        this.createQuestion()
      ])
    })
    this.auth.check_quiz(this.job_id).subscribe((res:any)=>{
      if(res.quiz_id)
        this.auth.get_quiz(res.quiz_id).subscribe((res:any)=>{
          this.setPresetQuiz(res)
        })
    })
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      options: ['', Validators.required],
      result:['false'],
      options2: ['', Validators.required],
      result2:['false'],
      options3: [''],
      result3:['false']
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }




  setPresetQuiz(quizData: any): void {
    const questionArray = this.quizForm.get('questions') as FormArray;
  
    questionArray.clear(); // Clear any existing questions
  
    quizData.questions.forEach((data: any) => {
      const questionGroup = this.createQuestion();
      questionGroup.patchValue(data); // Set question values using patchValue
      questionArray.push(questionGroup);
    });
  
    this.quizForm.patchValue({
      quizName: quizData.quizName
    });
  }

//////////////////

  onSubmit(): void {
    const quiz = this.quizForm.value;
    console.log(quiz)
    this.auth.add_quiz({ quizName:quiz.quizName, questions: quiz.questions, post_id: this.job_id}).subscribe((res)=>{
      console.log(res)
      alert("quiz created")
    })
  }
}






// //////////////////
//   quizData = {
//     quizName: "My Quiz",
//     questions: [
//       {
//         questionText: 'Question 1',
//         options: 'Option 1',
//         result: false,
//         options2: 'Option 2',
//         result2: true,
//         options3: '',
//         result3: false
//       },
//       {
//         questionText: 'Question 2',
//         options: 'Option 1',
//         result: false,
//         options2: 'Option 2',
//         result2: false,
//         options3: 'Option 3',
//         result3: true
//       },
//       // Add more questions here as needed
//     ]
//   };