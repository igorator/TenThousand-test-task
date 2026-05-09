import { Link, useParams } from 'react-router';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useResponseBuilder } from '@/entities/responses/hooks/useResponseBuilder';
import { ResponseSuccess } from '@/entities/responses/components/ResponseSuccess';
import { AnswerForm } from '@/entities/responses/components/AnswerForm';
import { ROUTES } from '@/shared/config/routes';

export function FormFillerPage() {
  const { id } = useParams<{ id: string }>();
  const { form, isLoading, isError, isSubmitting, submitStatus, submit } = useResponseBuilder(id!);

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

      <div className="bg-primary mb-6 p-6 rounded-xl text-white">
        <h1 className="mb-1 font-bold text-2xl">{form.title}</h1>
        {form.description && <p className="text-primary-light text-sm">{form.description}</p>}
      </div>

      {submitStatus === 'error' && (
        <div className="mb-4">
          <ErrorMessage message="Something went wrong. Please try again." />
        </div>
      )}

      <AnswerForm questions={form.questions} isSubmitting={isSubmitting} onSubmit={submit} />
    </div>
  );
}
