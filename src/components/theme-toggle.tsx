'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light';

/**
 * Dark/light switch. The actual theme is set on <html data-theme> by an inline
 * script before paint (see layout) to avoid a flash; this button just reflects
 * and flips it, persisting the choice to localStorage.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className={cn(
        'text-white hover:text-brass hover:border-brass/50 grid size-9 place-items-center rounded-full border border-white/15 transition-colors',
        className,
      )}
    >
      {/* Render both and cross-fade so there's no layout shift or hydration gap. */}
      <Sun
        className={cn('size-[1.05rem] transition-all', theme === 'dark' ? 'scale-100' : 'absolute scale-0 opacity-0')}
        aria-hidden
      />
      <Moon
        className={cn('size-[1.05rem] transition-all', theme === 'light' ? 'scale-100' : 'absolute scale-0 opacity-0')}
        aria-hidden
      />
    </button>
  );
}
