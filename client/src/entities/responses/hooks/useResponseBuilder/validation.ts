import type { QuestionFieldsFragment } from 'shared';
import { QuestionType } from 'shared';

export const needsMultipleValues = (type: QuestionType) => type === QuestionType.Checkbox;

export const MAX_TEXT_ANSWER_LENGTH = 1000;

const TEXT_ANSWER_TYPES = new Set<QuestionType>([QuestionType.Text, QuestionType.Date]);

type AnswerChecker = (answer: string | string[] | undefined) => boolean;

const ANSWER_CHECKERS: Partial<Record<QuestionType, AnswerChecker>> = {
  [QuestionType.Checkbox]: (answer) => Array.isArray(answer) && answer.length > 0,
};

const defaultAnswerChecker: AnswerChecker = (answer) => !!answer && !!(answer as string).trim();

export const validateAnswers = (
  questions: QuestionFieldsFragment[],
  answers: Record<string, string | string[]>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const question of questions) {
    const answer = answers[question.id];

    if (question.required) {
      const isAnswered = ANSWER_CHECKERS[question.type] ?? defaultAnswerChecker;
      if (!isAnswered(answer)) {
        errors[question.id] = 'This field is required.';
        continue;
      }
    }

    if (TEXT_ANSWER_TYPES.has(question.type as QuestionType) && answer) {
      if ((answer as string).length > MAX_TEXT_ANSWER_LENGTH) {
        errors[question.id] = `Answer must be ${MAX_TEXT_ANSWER_LENGTH} characters or less.`;
      }
    }
  }

  return errors;
};
