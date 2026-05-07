import type { ComponentType } from 'react';
import { QuestionType } from '@/app/generated/api.gen';
import type { GetFormQuery } from '@/app/generated/api.gen';
import { Input } from '@/shared/ui/Input';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { CheckboxGroup } from '@/shared/ui/CheckboxGroup';

type Question = NonNullable<GetFormQuery['form']>['questions'][number];

interface RendererProps {
  id: string;
  answer: string | string[] | undefined;
  options?: string[] | null;
  error?: string;
  onTextChange: (questionId: string, value: string) => void;
  onCheckboxToggle: (questionId: string, option: string) => void;
}

const ANSWER_RENDERERS: Record<QuestionType, ComponentType<RendererProps>> = {
  [QuestionType.Text]: ({ id, answer, error, onTextChange }) => (
    <Input
      type="text"
      value={(answer as string) ?? ''}
      onChange={(e) => onTextChange(id, e.target.value)}
      placeholder="Your answer"
      error={error}
    />
  ),
  [QuestionType.Date]: ({ id, answer, error, onTextChange }) => (
    <Input
      type="date"
      value={(answer as string) ?? ''}
      onChange={(e) => onTextChange(id, e.target.value)}
      error={error}
    />
  ),
  [QuestionType.MultipleChoice]: ({ id, answer, options, error, onTextChange }) => (
    <RadioGroup
      name={id}
      options={options ?? []}
      value={answer as string}
      onChange={(value) => onTextChange(id, value)}
      error={error}
    />
  ),
  [QuestionType.Checkbox]: ({ id, answer, options, error, onCheckboxToggle }) => (
    <CheckboxGroup
      options={options ?? []}
      value={(answer as string[]) ?? []}
      onChange={(option) => onCheckboxToggle(id, option)}
      error={error}
    />
  ),
};

interface AnswerInputProps {
  question: Question;
  answer: string | string[] | undefined;
  error?: string;
  onTextChange: (questionId: string, value: string) => void;
  onCheckboxToggle: (questionId: string, option: string) => void;
}

export function AnswerInput({ question, answer, error, onTextChange, onCheckboxToggle }: AnswerInputProps) {
  const { id, text, type, required, options } = question;
  const Renderer = ANSWER_RENDERERS[type];

  return (
    <div className="card space-y-3">
      <p className="font-medium text-text">
        {text}
        {required && <span className="text-required ml-1">*</span>}
      </p>
      <Renderer
        id={id}
        answer={answer}
        options={options}
        error={error}
        onTextChange={onTextChange}
        onCheckboxToggle={onCheckboxToggle}
      />
    </div>
  );
}
