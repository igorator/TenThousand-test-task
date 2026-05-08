import { QuestionType } from '@/entities/forms/config/questionTypes';
import type { QuestionFieldsFragment } from '@/app/gql/graphql';

export const needsMultipleValues = (type: QuestionType) => type === QuestionType.Checkbox;

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
    if (!question.required) continue;
    const isAnswered = ANSWER_CHECKERS[question.type] ?? defaultAnswerChecker;
    if (!isAnswered(answers[question.id])) errors[question.id] = 'This field is required.';
  }
  return errors;
};
