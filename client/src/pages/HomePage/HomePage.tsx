import { FormCard } from '@/entities/forms/components/FormCard';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Button } from '@/shared/ui/Button';
import { useGetFormsQuery } from '@/app/api';
import { ROUTES } from '@/shared/config/routes';

export function HomePage() {
  const { data, isLoading, isError } = useGetFormsQuery();
  const forms = data?.forms ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">My Forms</h1>
          <p className="text-text-muted text-sm mt-1">
            <span className="text-primary">{forms.length}</span> form{forms.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button to={ROUTES.formNew} className="gap-2">
          <span className="text-lg leading-none">+</span>
          Create New Form
        </Button>
      </div>

      {isLoading && <Spinner />}
      {isError && <ErrorMessage message="Failed to load forms." />}

      {!isLoading && !isError && forms.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg mb-2">No forms yet</p>
          <p className="text-sm">Create your first form to get started</p>
        </div>
      )}

      {!isLoading && !isError && forms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
