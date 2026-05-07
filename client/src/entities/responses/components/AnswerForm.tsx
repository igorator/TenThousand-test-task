import { AnswerInput } from './AnswerInput';
import type { GetFormQuery } from '@/app/generated/api.gen';

type Question = NonNullable<GetFormQuery['form']>['questions'][number];

interface AnswerFormProps {
  questions: Question[];
  answers: Record<string, string | string[]>;
  validationErrors: Record<string, string>;
  onTextChange: (questionId: string, value: string) => void;
  onCheckboxToggle: (questionId: string, option: string) => void;
}

export function AnswerForm({
  questions,
  answers,
  validationErrors,
  onTextChange,
  onCheckboxToggle,
}: AnswerFormProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted text-sm">This form has no questions.</div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <AnswerInput
          key={question.id}
          question={question}
          answer={answers[question.id]}
          error={validationErrors[question.id]}
          onTextChange={onTextChange}
          onCheckboxToggle={onCheckboxToggle}
        />
      ))}
    </div>
  );
}
