import { QuestionType } from '@/shared/config/questionTypes';
import type { DraftOption } from '@/entities/forms/hooks/useFormBuilder';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export interface OptionsListProps {
  questionId: string;
  type: QuestionType;
  options: DraftOption[];
  error?: string;
  onAddOption: (questionId: string) => void;
  onUpdateOption: (questionId: string, index: number, value: string) => void;
  onRemoveOption: (questionId: string, index: number) => void;
}

export function OptionsList({
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
      <Button
        variant="ghost"
        onClick={() => onAddOption(questionId)}
        className="text-sm px-0 hover:text-white"
      >
        + Add option
      </Button>
    </div>
  );
}
