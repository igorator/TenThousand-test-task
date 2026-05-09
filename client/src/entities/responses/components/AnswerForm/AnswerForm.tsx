import { useState } from 'react';
import { QuestionAnswerField } from '../QuestionAnswerField';
import { Button } from '@/shared/ui/Button';
import { validateAnswers } from './validation';
import type { GetFormQuery } from 'shared';

type Question = NonNullable<GetFormQuery['form']>['questions'][number];

interface AnswerFormProps {
  questions: Question[];
  isSubmitting: boolean;
  onSubmit: (answers: Record<string, string | string[]>) => void;
}

export function AnswerForm({ questions, isSubmitting, onSubmit }: AnswerFormProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleSubmit = () => {
    const errors = validateAnswers(questions, answers);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstKey = Object.keys(errors)[0];
      requestAnimationFrame(() => {
        document
          .getElementById(`field-${firstKey}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }
    onSubmit(answers);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted text-sm">This form has no questions.</div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} id={`field-${question.id}`}>
          <QuestionAnswerField
            question={question}
            answer={answers[question.id]}
            error={validationErrors[question.id]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Submitting…"
          className="px-6"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
