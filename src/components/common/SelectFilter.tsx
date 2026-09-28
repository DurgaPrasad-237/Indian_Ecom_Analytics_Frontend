import type { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectFilterOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  value: string;
  options: SelectFilterOption[];
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

/** Compact, styled <select> used for chart-level filters (e.g. the segment analysis picker). */
export function SelectFilter({ value, options, onChange, label, className }: SelectFilterProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value);

  return (
    <label className={className}>
      {label && <span className="sr-only">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="appearance-none rounded-md border border-ink-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-ink-700 transition-colors hover:border-brand-300 focus:border-brand-400"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
      </div>
    </label>
  );
}
