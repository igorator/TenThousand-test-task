export const QuestionType = {
  Text: 'TEXT',
  MultipleChoice: 'MULTIPLE_CHOICE',
  Checkbox: 'CHECKBOX',
  Date: 'DATE',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Text]: 'Short Text',
  [QuestionType.MultipleChoice]: 'Multiple Choice',
  [QuestionType.Checkbox]: 'Checkboxes',
  [QuestionType.Date]: 'Date',
};
