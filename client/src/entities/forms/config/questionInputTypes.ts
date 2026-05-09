import { QuestionInputType } from 'shared';

export const QUESTION_INPUT_TYPE_LABELS: Record<QuestionInputType, string> = {
  [QuestionInputType.Text]: 'Short Text',
  [QuestionInputType.MultipleChoice]: 'Multiple Choice',
  [QuestionInputType.Checkbox]: 'Checkboxes',
  [QuestionInputType.Date]: 'Date',
};
