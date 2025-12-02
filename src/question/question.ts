import { Component, input, InputSignal, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Question } from '../models/question';
import { FormGroup, FormArray, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrl: './question.scss',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule,
            MatInput,
            MatIconModule,
            MatSlideToggleModule,
            ReactiveFormsModule,
            CommonModule]
})
export class QuestionComponent implements OnInit {
  question: InputSignal<Question | undefined> = input<Question>();
  questionNumber: InputSignal<number | undefined> = input<number>();
  @ViewChild('textArea') textArea: ElementRef | undefined;
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
  }

  addHyphenOnNewLine(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.textArea!.nativeElement.value = this.textArea!.nativeElement.value + '- ';
    }
  }

  insertHyphenAtStart(){
    if(this.textArea!.nativeElement.value === '') {
      this.textArea!.nativeElement.value = this.textArea!.nativeElement.value + '- ';
    }
  }

  getQuestionFormControls() {
    return (this.form.get('questions') as FormArray).controls;
  }
}
