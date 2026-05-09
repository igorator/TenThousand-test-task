import { QuestionType } from 'shared';

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Text]: 'Short Text',
  [QuestionType.MultipleChoice]: 'Multiple Choice',
  [QuestionType.Checkbox]: 'Checkboxes',
  [QuestionType.Date]: 'Date',
};
