import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { BarChart3, Settings, UserCircle2, X } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/navigation';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-900 text-saffron-400">
          <BarChart3 size={18} strokeWidth={2.25} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Indian E-Commerce</p>
          <p className="text-xs text-ink-400">Analytics</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-800 text-white'
                      : 'text-ink-300 hover:bg-ink-800/60 hover:text-white'
                  )
                }
              >
                <Icon size={17} strokeWidth={2} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-ink-800 px-3 py-3">
        <ul className="flex flex-col gap-1">
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-800/60 hover:text-white"
            >
              <Settings size={17} strokeWidth={2} />
              Settings
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-800/60 hover:text-white"
            >
              <UserCircle2 size={17} strokeWidth={2} />
              <span className="flex flex-col items-start leading-tight">
                <span>Analyst</span>
                <span className="text-xs font-normal text-ink-500">analyst@company.in</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

/** App sidebar: a fixed column on desktop, a slide-over drawer on mobile/tablet. */
export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Desktop / persistent sidebar */}
      <aside className="hidden w-64 shrink-0 bg-ink-950 lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-40 lg:hidden',
          isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!isMobileOpen}
      >
        <div
          className={clsx(
            'absolute inset-0 bg-ink-950/50 transition-opacity',
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onCloseMobile}
        />
        <aside
          className={clsx(
            'absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-ink-950 transition-transform duration-200 ease-out',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onCloseMobile}
            className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-md text-ink-400 hover:bg-ink-800/60 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
          <SidebarContent onNavigate={onCloseMobile} />
        </aside>
      </div>
    </>
  );
}
