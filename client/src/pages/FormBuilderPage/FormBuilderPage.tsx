import { Link, useNavigate } from 'react-router';
import { useFormBuilder } from '@/entities/forms/hooks/useFormBuilder';
import { FormBuilder } from '@/entities/forms/components/FormBuilder';
import { ROUTES } from '@/shared/config/routes';

export function FormBuilderPage() {
  const navigate = useNavigate();
  const { submit, isLoading } = useFormBuilder();

  return (
    <div>
      <Link to={ROUTES.home} className="inline-block mb-4 back-link">
        ← Back
      </Link>
      <FormBuilder isLoading={isLoading} onSubmit={submit} onCancel={() => navigate(ROUTES.home)} />
    </div>
  );
}
