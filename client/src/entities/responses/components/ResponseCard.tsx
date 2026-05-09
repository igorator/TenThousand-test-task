import { QuestionInputType } from 'shared';
import type { GetResponsesQuery } from 'shared';

type Response = GetResponsesQuery['responses'][number];

interface ResponseCardProps {
  response: Response;
  index: number;
}

export function ResponseCard({ response, index }: ResponseCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="flex justify-between items-center bg-surface-raised px-5 py-3 border-border border-b">
        <span className="font-semibold text-text text-sm">Response #{index + 1}</span>
        <span className="text-text-muted text-xs">
          {new Date(response.submittedAt).toLocaleString()}
        </span>
      </div>
      <div className="divide-y divide-border">
        {response.answers.map((answer) => {
          const displayValue =
            answer.question.type === QuestionInputType.Checkbox
              ? (answer.values ?? []).join(', ') || '—'
              : answer.value || '—';
          return (
            <div key={answer.question.id} className="px-5 py-3">
              <p className="mb-1 font-medium text-text-muted text-xs">{answer.question.text}</p>
              <p className="text-text text-sm">{displayValue}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
