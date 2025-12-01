import { Component, viewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { QuestionComponent } from '../question/question';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [QuestionComponent, MatIconModule],
  styleUrl: './app.scss'
})

export class AppComponent {
  questions: number[] = [];
  questionLength = this.questions.length;
  viewContainerRef = viewChild('questionsContainer', {read: ViewContainerRef});
  #componentRef?: ComponentRef<QuestionComponent>

  addQuestion() {
    this.#componentRef = this.viewContainerRef()?.createComponent(QuestionComponent);
    this.#componentRef?.setInput('questionNumber', this.questionLength + 1);
    this.questionLength++;
  }
}
