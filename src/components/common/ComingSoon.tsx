import type { LucideIcon } from 'lucide-react';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

/** Professional placeholder shown for modules not yet implemented (Orders, Shipments, Payments, Ratings, Order Items). */
export function ComingSoon({ title, description, icon: Icon = Construction }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-card border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon size={26} strokeWidth={1.75} />
      </span>
      <h2 className="mt-5 text-display-md font-semibold text-ink-900">{title}</h2>
      <span className="mt-2 inline-flex items-center rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-saffron-600">
        Coming Soon
      </span>
      <p className="mt-4 max-w-md text-sm text-ink-500">{description}</p>
    </div>
  );
}
