import type { QuestionFieldsFragment } from '@/app/gql/graphql';
import { QuestionType } from '@/entities/forms/config/questionTypes';

export type DraftOption = { id: string; value: string };
export type DraftQuestion = Omit<QuestionFieldsFragment, 'options'> & { options: DraftOption[] };

export const MIN_OPTIONS_COUNT = 2;
export const MAX_TITLE_LENGTH = 100;
export const MAX_QUESTION_TEXT_LENGTH = 300;

export const needsOptions = (type: QuestionType) =>
  type === QuestionType.MultipleChoice || type === QuestionType.Checkbox;

const FORM_RULES: Array<{
  field: string;
  test: (title: string, questions: DraftQuestion[]) => boolean;
  message: string;
}> = [
  { field: 'title', test: (title) => !title.trim(), message: 'Title is required.' },
  {
    field: 'title',
    test: (title) => title.trim().length > MAX_TITLE_LENGTH,
    message: `Title must be ${MAX_TITLE_LENGTH} characters or less.`,
  },
  {
    field: '_questions',
    test: (_, questions) => questions.length === 0,
    message: 'Add at least one question.',
  },
];

const QUESTION_RULES: Array<{
  key: (question: DraftQuestion) => string;
  test: (question: DraftQuestion) => boolean;
  message: string;
}> = [
  {
    key: (question) => question.id,
    test: (question) => !question.text.trim(),
    message: 'Question text is required.',
  },
  {
    key: (question) => question.id,
    test: (question) => question.text.trim().length > MAX_QUESTION_TEXT_LENGTH,
    message: `Question must be ${MAX_QUESTION_TEXT_LENGTH} characters or less.`,
  },
  {
    key: (question) => `${question.id}-options`,
    test: (question) => needsOptions(question.type) && question.options.length < MIN_OPTIONS_COUNT,
    message: `At least ${MIN_OPTIONS_COUNT} options required.`,
  },
];

export const validateFormDraft = (
  title: string,
  questions: DraftQuestion[]
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const { field, test, message } of FORM_RULES) {
    if (test(title, questions)) errors[field] = message;
  }

  for (const question of questions) {
    for (const { key, test, message } of QUESTION_RULES) {
      if (test(question)) errors[key(question)] = message;
    }
  }

  return errors;
};
