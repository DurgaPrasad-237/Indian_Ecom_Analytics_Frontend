import { Bell, Menu, UserCircle2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileNav: () => void;
}

/** Minimal top header: page title/subtitle on the left, notifications + profile on the right. */
export function Header({ title, subtitle, onOpenMobileNav }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:bg-ink-50 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-display-md font-semibold text-ink-900">{title}</h1>
          {subtitle && <p className="mt-0.5 truncate text-sm text-ink-500">{subtitle}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-saffron-400" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100"
          aria-label="User menu"
        >
          <UserCircle2 size={20} />
        </button>
      </div>
    </header>
  );
}
