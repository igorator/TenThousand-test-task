import { QuestionType } from '@/app/generated/api.gen';
import type { DraftOption, DraftQuestion } from '@/entities/forms/hooks/useFormBuilder';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.Text]: 'Short Text',
  [QuestionType.MultipleChoice]: 'Multiple Choice',
  [QuestionType.Checkbox]: 'Checkboxes',
  [QuestionType.Date]: 'Date',
};

const needsOptions = (type: QuestionType) =>
  type === QuestionType.MultipleChoice || type === QuestionType.Checkbox;

interface OptionsListProps {
  questionId: string;
  type: QuestionType;
  options: DraftOption[];
  error?: string;
  onAddOption: (questionId: string) => void;
  onUpdateOption: (questionId: string, index: number, value: string) => void;
  onRemoveOption: (questionId: string, index: number) => void;
}

function OptionsList({
  questionId,
  type,
  options,
  error,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: OptionsListProps) {
  return (
    <div className="space-y-2 pl-2 border-l-2 border-primary-muted">
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-2">
          {type === QuestionType.MultipleChoice ? (
            <div className="w-3.5 h-3.5 shrink-0 rounded-full border-2 border-primary" />
          ) : (
            <div className="w-3.5 h-3.5 shrink-0 rounded-sm border-2 border-text-muted" />
          )}
          <Input
            value={option.value}
            onChange={(event) => onUpdateOption(questionId, index, event.target.value)}
            className="flex-1"
          />
          {options.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveOption(questionId, index)}
              className="text-text-muted hover:text-error transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      {error && <p className="text-error text-xs">{error}</p>}
      <Button variant="ghost" onClick={() => onAddOption(questionId)} className="text-sm px-0 hover:text-white">
        + Add option
      </Button>
    </div>
  );
}

export interface FormQuestionEditorProps {
  question: DraftQuestion;
  index: number;
  errors: Record<string, string>;
  onUpdate: (id: string, patch: Partial<Omit<DraftQuestion, 'id'>>) => void;
  onRemove: (id: string) => void;
  onAddOption: (id: string) => void;
  onUpdateOption: (id: string, index: number, value: string) => void;
  onRemoveOption: (id: string, index: number) => void;
}

export function FormQuestionEditor({
  question,
  index,
  errors,
  onUpdate,
  onRemove,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: FormQuestionEditorProps) {
  const { id, text, type, required, options } = question;

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="text-xs font-semibold text-primary bg-primary-muted rounded px-2 py-1">
          Question {index + 1}
        </span>
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="text-text-muted hover:text-error transition-colors text-sm"
          aria-label="Remove question"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Question text"
          value={text}
          onChange={(event) => onUpdate(id, { text: event.target.value })}
          error={errors[id]}
        />

        <div className="flex items-center gap-3 mt-2">
          <Select
            value={type}
            onChange={(event) => onUpdate(id, { type: event.target.value as QuestionType })}
          >
            {Object.values(QuestionType).map((questionType) => (
              <option key={questionType} value={questionType}>
                {QUESTION_TYPE_LABELS[questionType]}
              </option>
            ))}
          </Select>

          <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={required}
              onChange={(event) => onUpdate(id, { required: event.target.checked })}
              className="w-4 h-4 accent-primary"
            />
            Required
          </label>
        </div>

        {needsOptions(type) && (
          <OptionsList
            questionId={id}
            type={type}
            options={options}
            error={errors[`${id}-options`]}
            onAddOption={onAddOption}
            onUpdateOption={onUpdateOption}
            onRemoveOption={onRemoveOption}
          />
        )}
      </div>
    </div>
  );
}
