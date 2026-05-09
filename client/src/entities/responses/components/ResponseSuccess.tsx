import { generatePath } from 'react-router';
import { Button } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/config/routes';

interface ResponseSuccessProps {
  formId: string;
}

export function ResponseSuccess({ formId }: ResponseSuccessProps) {
  return (
    <div className="page-container text-center py-20">
      <div className="text-5xl mb-4">✓</div>
      <h2 className="text-2xl font-bold text-text mb-2">Response submitted!</h2>
      <p className="text-text-muted mb-8">Thank you for filling out this form.</p>
      <div className="flex gap-3 justify-center">
        <Button to={generatePath(ROUTES.formResponses, { id: formId })} variant="secondary">
          View responses
        </Button>
        <Button to={ROUTES.home}>Back to forms</Button>
      </div>
    </div>
  );
}
