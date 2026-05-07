import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={`w-full min-h-[4lh] bg-surface-raised border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary resize-none field-sizing-content ${
          error ? 'border-error-border' : 'border-border'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-error text-xs">{error}</p>}
    </div>
  );
}
