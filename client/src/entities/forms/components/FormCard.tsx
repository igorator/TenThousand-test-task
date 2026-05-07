import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/Button';
import type { GetFormsQuery } from '@/app/generated/api.gen';

type FormItem = GetFormsQuery['forms'][number];

interface FormCardProps {
  form: FormItem;
}

export function FormCard({ form }: FormCardProps) {
  return (
    <div className="flex flex-col bg-surface p-5 border border-border hover:border-primary/40 rounded-xl min-w-0 transition-colors">
      <h2 className="mb-1 font-semibold text-text text-lg truncate">{form.title}</h2>
      {form.description && (
        <p className="text-text-muted text-sm wrap-break-word line-clamp-3">{form.description}</p>
      )}
      <div className="flex gap-3 mt-auto pt-4">
        <Button to={ROUTES.formFill(form.id)} className="flex-1">
          Fill Form
        </Button>
        <Button to={ROUTES.formResponses(form.id)} variant="secondary" className="flex-1">
          View Responses
        </Button>
      </div>
    </div>
  );
}
