import { Link } from 'react-router';
import { QuestionInputType } from 'shared';
import { QUESTION_INPUT_TYPE_LABELS } from '@/entities/forms/config/questionInputTypes';
import { FormQuestionEditor } from '@/entities/forms/components/FormQuestionEditor';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { useFormBuilder } from '@/entities/forms/hooks/useFormBuilder';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { ROUTES } from '@/shared/config/routes';

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
      <Link to={ROUTES.home} className="inline-block mb-4 back-link">
        ← Back
      </Link>

      <div className="space-y-5">
        <h1 className="font-bold text-text text-2xl">New Form</h1>
        <div id="field-title" className="space-y-4 card">
          <Input
            placeholder="Form title *"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            error={errors.title}
            className="font-medium text-base"
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
