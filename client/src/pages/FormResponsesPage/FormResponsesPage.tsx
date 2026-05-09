import { Link, useParams } from 'react-router';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useGetFormQuery, useGetResponsesQuery } from '@/app/api';
import { ResponseList } from '@/entities/responses/components/ResponseList';
import { ROUTES } from '@/shared/config/routes';

export function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: formData,
    isLoading: formLoading,
    isError: formError,
  } = useGetFormQuery({ id: id! });
  const {
    data: responsesData,
    isLoading: responsesLoading,
    isError: responsesError,
  } = useGetResponsesQuery({ formId: id! });

  const form = formData?.form;
  const responses = responsesData?.responses ?? [];

  if (formLoading) return <Spinner />;
  if (formError || !form) return <ErrorMessage message="Could not load responses." />;

  return (
    <div>
      <div className="page-header">
        <Link to={ROUTES.home} className="back-link">
          ← Back
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="font-bold text-text text-2xl">{form.title}</h1>
        {form.description && <p className="mt-1 text-text-muted text-sm">{form.description}</p>}
        {!responsesLoading && (
          <p className="mt-1 text-text-muted text-sm">
            <span className="text-primary font-medium">{responses.length}</span>{' '}
            <span className="opacity-50">response{responses.length !== 1 ? 's' : ''}</span>
          </p>
        )}
      </div>

      {responsesLoading ? (
        <Spinner />
      ) : responsesError ? (
        <ErrorMessage message="Failed to load responses." />
      ) : (
        <ResponseList responses={responses} formId={id!} />
      )}
    </div>
  );
}
