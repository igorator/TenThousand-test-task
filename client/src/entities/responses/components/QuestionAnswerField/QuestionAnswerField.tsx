import type { ComponentType } from 'react';
import { QuestionInputType } from 'shared';
import type { GetFormQuery } from 'shared';
import { Input } from '@/shared/ui/Input';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { CheckboxGroup } from '@/shared/ui/CheckboxGroup';

type Question = NonNullable<GetFormQuery['form']>['questions'][number];

interface QuestionInputProps {
  id: string;
  answer: string | string[] | undefined;
  options?: string[] | null;
  error?: string;
  onChange: (questionId: string, value: string | string[]) => void;
}

const QUESTION_INPUT_BY_TYPE: Record<QuestionInputType, ComponentType<QuestionInputProps>> = {
  [QuestionInputType.Text]: ({ id, answer, error, onChange }) => (
    <Input
      type="text"
      value={(answer as string) ?? ''}
      onChange={(e) => onChange(id, e.target.value)}
      placeholder="Your answer"
      error={error}
    />
  ),
  [QuestionInputType.Date]: ({ id, answer, error, onChange }) => (
    <Input
      type="date"
      value={(answer as string) ?? ''}
      onChange={(e) => onChange(id, e.target.value)}
      error={error}
    />
  ),
  [QuestionInputType.MultipleChoice]: ({ id, answer, options, error, onChange }) => (
    <RadioGroup
      name={id}
      options={options ?? []}
      value={answer as string}
      onChange={(value) => onChange(id, value)}
      error={error}
    />
  ),
  [QuestionInputType.Checkbox]: ({ id, answer, options, error, onChange }) => {
    const handleToggle = (option: string) => {
      const current = (answer as string[]) ?? [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      onChange(id, next);
    };
    return (
      <CheckboxGroup
        options={options ?? []}
        value={(answer as string[]) ?? []}
        onChange={handleToggle}
        error={error}
      />
    );
  },
};

export interface QuestionAnswerFieldProps {
  question: Question;
  answer: string | string[] | undefined;
  error?: string;
  onChange: (questionId: string, value: string | string[]) => void;
}

export function QuestionAnswerField({
  question,
  answer,
  error,
  onChange,
}: QuestionAnswerFieldProps) {
  const { id, text, type, required, options } = question;
  const QuestionInput = QUESTION_INPUT_BY_TYPE[type];

  return (
    <div className="card space-y-3">
      <p className="font-medium text-text">
        {text}
        {required && <span className="text-required ml-1">*</span>}
      </p>
      <QuestionInput id={id} answer={answer} options={options} error={error} onChange={onChange} />
    </div>
  );
}
