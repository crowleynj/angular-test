import { Component, input, InputSignal, QueryList, ViewChildren, ElementRef, OnInit } from '@angular/core';
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
  @ViewChildren('textArea') textAreas: QueryList<ElementRef> | undefined
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
  }

  addHyphenOnNewLine(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter') {
      this.textAreas!.get(index)!.nativeElement.value = this.textAreas!.get(index)!.nativeElement.value + '- ';
    }
  }

  insertHyphenAtStart(index: number){
    if(this.textAreas!.get(index)!.nativeElement.value === '') {
      this.textAreas!.get(index)!.nativeElement.value = this.textAreas!.get(index)!.nativeElement.value + '- ';
    }
  }

  getQuestionFormControls() {
    return (this.form.get('questions') as FormArray).controls;
  }
}
