import { Component, viewChild, ViewContainerRef, ComponentRef, OnInit, ChangeDetectorRef} from '@angular/core';
import { QuestionComponent } from '../question/question';
import { MatIconModule } from '@angular/material/icon';
import { SurveysService } from '../services/surveys.service';
import { Survey } from '../models/survey';
import { Question } from '../models/question';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [QuestionComponent, MatIconModule, ReactiveFormsModule],
  styleUrl: './app.scss'
})

export class AppComponent implements OnInit {
  questions: number[] = [];
  survey: Survey | undefined;
  viewContainerRef = viewChild('questionsContainer', {read: ViewContainerRef});
  form!: FormGroup;

  constructor(private surveysService: SurveysService,
              private cd: ChangeDetectorRef,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.surveysService.getSurveyById('692dcd22383f5247a6459365').subscribe(result => {
      this.survey = result;
      this.form = this.buildForm();
      this.cd.detectChanges();
    })
  }

  addQuestion() {
    this.form.get('questions')?.value.forEach((question: Question) => {
      if(typeof question.options === 'string') {
      (question.options as unknown as string[]) = question.options.split('\r\n');
      }
    })
    this.surveysService.updateSurveyById('692dcd22383f5247a6459365', this.form.value).subscribe({
      next: () => {},
      error: (error) => {
        console.log(error);
      },
    });
    const questions = this.form.get('questions') as FormArray
    questions.push(this.createQuestionFormGroup());
  }

  buildForm(): FormGroup<any> {
    return this.fb.group({
      id: this.survey!.id,
      title: this.survey!.title,
      description: this.survey!.description,
      questions: this.fb.array(this.buildQuestionArrayControl(this.survey!.questions))
    });
  }

  buildQuestionArrayControl(data: Question[]) {
    return data.map(question=> {
      return this.fb.group({
        questionType: [question.questionType],
        questionText: [question.questionText],
        options: [(question.options as unknown as string[]).join('\r\n')],
        randomizeOptionsInd: [question.randomizeOptionsInd],
        mandatoryInd: [question.mandatoryInd]
      })
    })
  }

  createQuestionFormGroup() {
    return this.fb.group({
      questionType: this.fb.control<number>(0),
      questionText: [''],
      options: [''],
      randomizeOptionsInd: [false],
      mandatoryInd: [false]
    })
  }
}
