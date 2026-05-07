export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  question: Question;
  value?: string;
  values?: string[];
}

export interface Response {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
}

export interface QuestionInput {
  text: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
}

export interface AnswerInput {
  questionId: string;
  value?: string;
  values?: string[];
}
