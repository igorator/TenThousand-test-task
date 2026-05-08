export const QuestionType = {
  Text: 'TEXT',
  MultipleChoice: 'MULTIPLE_CHOICE',
  Checkbox: 'CHECKBOX',
  Date: 'DATE',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];
