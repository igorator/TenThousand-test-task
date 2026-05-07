interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({
  message = 'Something went wrong. Please try again.',
}: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-error-bg/50 border border-error-bg-border p-4 text-error text-sm">
      {message}
    </div>
  );
}
