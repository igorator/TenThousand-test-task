import { Link } from 'react-router';
import { QuestionType } from '@/shared/config/questionTypes';
import { FormQuestionEditor } from '@/entities/forms/components/FormQuestionEditor';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { useFormBuilder } from '@/entities/forms/hooks/useFormBuilder';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { ROUTES } from '@/shared/config/routes';

const DESCRIPTION_ROWS = 2;

const ADD_QUESTION_TYPES: { type: QuestionType; label: string }[] = [
  { type: QuestionType.Text, label: 'Text' },
  { type: QuestionType.MultipleChoice, label: 'Multiple Choice' },
  { type: QuestionType.Checkbox, label: 'Checkboxes' },
  { type: QuestionType.Date, label: 'Date' },
];

export function FormBuilderPage() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    errors,
    isLoading,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    submit,
  } = useFormBuilder();

  return (
    <div>
      <Link to={ROUTES.home} className="back-link inline-block mb-4">
        ← Back
      </Link>

      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-text">New Form</h1>
        <div id="field-title" className="card space-y-4">
          <Input
            placeholder="Form title *"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            error={errors.title}
            className="text-base font-medium"
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={DESCRIPTION_ROWS}
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
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
            Add Question
          </p>
          <div className="flex flex-wrap gap-2">
            {ADD_QUESTION_TYPES.map(({ type, label }) => (
              <Button key={type} variant="secondary" onClick={() => addQuestion(type)}>
                + {label}
              </Button>
            ))}
          </div>
        </div>

        {errors._form && <ErrorMessage message={errors._form} />}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" to={ROUTES.home}>
            Cancel
          </Button>
          <Button onClick={submit} isLoading={isLoading} loadingText="Saving…" className="px-6">
            Save Form
          </Button>
        </div>
      </div>
    </div>
  );
}
