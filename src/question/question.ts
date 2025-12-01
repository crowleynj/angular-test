import { Component, input, InputSignal, ElementRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrl: './question.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatInput, MatIconModule, MatSlideToggleModule]
})
export class QuestionComponent {
  questionNumber: InputSignal<number | undefined> = input<number>();
  @ViewChild('textArea') textArea: ElementRef | undefined;

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
}
