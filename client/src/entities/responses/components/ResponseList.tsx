import { Link } from 'react-router';
import { ROUTES } from '@/shared/config/routes';
import { ResponseCard } from './ResponseCard';
import type { GetResponsesQuery } from 'shared';

type Response = GetResponsesQuery['responses'][number];

interface ResponseListProps {
  responses: Response[];
  formId: string;
}

export function ResponseList({ responses, formId }: ResponseListProps) {
  if (responses.length === 0) {
    return (
      <div className="py-20 text-text-muted text-center">
        <p className="mb-2 text-lg">No responses yet</p>
        <Link
          to={ROUTES.formFill(formId)}
          className="text-primary hover:text-primary-dark text-sm transition-colors"
        >
          Be the first to fill this form
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {responses.map((response, index) => (
        <ResponseCard key={response.id} response={response} index={index} />
      ))}
    </div>
  );
}
