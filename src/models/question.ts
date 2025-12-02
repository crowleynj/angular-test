export interface Question {
  questionId: number,
  questionText: string,
  mandatoryInd: boolean,
  questionType: number,
  options: string[],
  randomizeOptionsInd: boolean,
  cards: string[],
  programmerNotes: string,
  instructions: string
}
