import { Link, useParams } from 'react-router';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Button } from '@/shared/ui/Button';
import { useFormFiller } from '@/entities/responses/hooks/useFormFiller';
import { ResponseSuccess } from '@/entities/responses/components/ResponseSuccess';
import { AnswerForm } from '@/entities/responses/components/AnswerForm';
import { ROUTES } from '@/shared/config/routes';

export function FormFillerPage() {
  const { id } = useParams<{ id: string }>();
  const {
    form,
    isLoading,
    isError,
    answers,
    validationErrors,
    isSubmitting,
    submitStatus,
    setAnswer,
    toggleCheckbox,
    submit,
  } = useFormFiller(id!);

  if (isLoading) return <Spinner />;
  if (isError || !form) return <ErrorMessage message="Form not found." />;
  if (submitStatus === 'success') return <ResponseSuccess formId={id!} />;

  return (
    <div>
      <div className="page-header">
        <Link to={ROUTES.home} className="back-link">
          ← Back
        </Link>
      </div>

      <div className="bg-gradient-primary rounded-xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold mb-1">{form.title}</h1>
        {form.description && <p className="text-primary-light text-sm">{form.description}</p>}
      </div>

      {submitStatus === 'error' && (
        <div className="mb-4">
          <ErrorMessage message="Submission failed. Please try again." />
        </div>
      )}

      <AnswerForm
        questions={form.questions}
        answers={answers}
        validationErrors={validationErrors}
        onTextChange={setAnswer}
        onCheckboxToggle={toggleCheckbox}
      />

      <div className="mt-6 flex justify-end">
        <Button onClick={submit} isLoading={isSubmitting} loadingText="Submitting…" className="px-6">
          Submit
        </Button>
      </div>
    </div>
  );
}
