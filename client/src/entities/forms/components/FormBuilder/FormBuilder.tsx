import { useState } from 'react';
import { QuestionInputType } from 'shared';
import { QUESTION_INPUT_TYPE_LABELS } from '@/entities/forms/config/questionInputTypes';
import { FormQuestionEditor } from '@/entities/forms/components/FormQuestionEditor';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { needsOptions, validateFormDraft } from './validation';
import type { DraftQuestion } from './validation';

const makeDefaultOptions = () => [
  { id: crypto.randomUUID(), value: 'Option 1' },
  { id: crypto.randomUUID(), value: 'Option 2' },
];

interface FormBuilderProps {
  isLoading: boolean;
  onSubmit: (title: string, description: string, questions: DraftQuestion[]) => Promise<boolean>;
  onCancel: () => void;
}

export function FormBuilder({ isLoading, onSubmit, onCancel }: FormBuilderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addQuestion = (type: QuestionInputType) => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: '',
        type,
        required: false,
        options: needsOptions(type) ? makeDefaultOptions() : [],
      },
    ]);
  };

  const updateQuestion = (id: string, patch: Partial<Omit<DraftQuestion, 'id'>>) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const updated = { ...question, ...patch };
        if ('type' in patch && needsOptions(patch.type!) && !updated.options.length) {
          updated.options = makeDefaultOptions();
        }
        return updated;
      })
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addOption = (id: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const opts = question.options;
        return {
          ...question,
          options: [...opts, { id: crypto.randomUUID(), value: `Option ${opts.length + 1}` }],
        };
      })
    );
  };

  const updateOption = (id: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const options = question.options.map((opt, i) => (i === index ? { ...opt, value } : opt));
        return { ...question, options };
      })
    );
  };

  const removeOption = (id: string, index: number) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        return { ...question, options: question.options.filter((_, i) => i !== index) };
      })
    );
  };

  const handleSubmit = async () => {
    const newErrors = validateFormDraft(title, questions);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0].replace(/-options$/, '');
      requestAnimationFrame(() => {
        document
          .getElementById(`field-${firstKey}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    const success = await onSubmit(title, description, questions);
    if (!success) {
      setErrors((prev) => ({ ...prev, _form: 'Failed to save form. Please try again.' }));
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-text text-2xl">New Form</h1>

      <div id="field-title" className="space-y-4 card">
        <Input
          placeholder="Form title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          className="font-medium text-base"
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>

      {questions.map((question, index) => (
        <div key={question.id} id={`field-${question.id}`}>
          <FormQuestionEditor
            question={question}
            index={index}
            errors={errors}
            onUpdate={updateQuestion}
            onRemove={removeQuestion}
            onAddOption={addOption}
            onUpdateOption={updateOption}
            onRemoveOption={removeOption}
          />
        </div>
      ))}

      {errors._questions && <ErrorMessage message={errors._questions} />}

      <div id="field-_questions" className="card-dashed">
        <p className="mb-3 font-semibold text-text-muted text-xs uppercase tracking-wide">
          Add Question
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(QUESTION_INPUT_TYPE_LABELS) as [QuestionInputType, string][]).map(
            ([type, label]) => (
              <Button key={type} variant="secondary" onClick={() => addQuestion(type)}>
                + {label}
              </Button>
            )
          )}
        </div>
      </div>

      {errors._form && <ErrorMessage message={errors._form} />}

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} isLoading={isLoading} loadingText="Saving…" className="px-6">
          Save Form
        </Button>
      </div>
    </div>
  );
}
