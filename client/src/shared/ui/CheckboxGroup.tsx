import { useMemo } from 'react';

interface CheckboxGroupProps {
  options: string[];
  value: string[];
  onChange: (option: string) => void;
  error?: string;
}

export function CheckboxGroup({ options, value, onChange, error }: CheckboxGroupProps) {
  const valueSet = useMemo(() => new Set(value), [value]);

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={valueSet.has(option)}
            onChange={() => onChange(option)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-text">{option}</span>
        </label>
      ))}
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
}
