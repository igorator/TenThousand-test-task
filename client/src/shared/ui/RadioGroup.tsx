interface RadioGroupProps {
  name: string;
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
}

export function RadioGroup({ name, options, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
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
