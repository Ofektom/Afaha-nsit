'use client';

import { useId, useState } from 'react';
import { ArrowRight, CircleCheck, Mail } from 'lucide-react';
import { cn } from '@/lib/cn';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface NotifyFormProps {
  /** Visible to screen readers; the field shows `placeholder`. */
  label: string;
  placeholder?: string;
  buttonLabel?: string;
  /** `dark`: on dark backgrounds (orange button). `light`: on light backgrounds (primary button). */
  tone?: 'dark' | 'light';
  successMessage?: string;
  className?: string;
}

/**
 * Email sign-up pill. Demo only: validates the address and confirms on screen,
 * but nothing is sent or stored.
 */
export function NotifyForm({
  label,
  placeholder = 'Enter your email address',
  buttonLabel = 'Notify me',
  tone = 'dark',
  successMessage = 'Thank you — we’ll email you when it goes live. (Demo: no email is sent yet.)',
  className,
}: NotifyFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const id = useId();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError('Please enter a valid email address, e.g. name@example.com.');
      return;
    }
    setError('');
    setDone(true);
  };

  if (done) {
    return (
      <p
        role="status"
        className={cn(
          'flex items-center gap-3 rounded-full px-5 py-4 text-left text-[15px] font-medium',
          tone === 'dark' ? 'bg-white/10 text-white' : 'bg-primary-soft text-primary',
          className,
        )}
      >
        <CircleCheck aria-hidden="true" className="size-5 flex-none text-success" strokeWidth={2} />
        {successMessage}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <div
        className={cn(
          'flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-muted',
          tone === 'light' && 'border border-line',
          error && 'ring-2 ring-orange',
        )}
      >
        <Mail aria-hidden="true" className="size-5 flex-none" strokeWidth={2} />
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className={cn(
            'inline-flex min-h-11 flex-none items-center gap-2 rounded-full px-[22px] py-[14px] text-[15px] font-semibold leading-[1.4] transition-colors',
            tone === 'dark'
              ? 'bg-orange text-primary-dark hover:bg-orange-hover'
              : 'bg-primary text-white hover:bg-primary-hover',
          )}
        >
          {buttonLabel}
          <ArrowRight aria-hidden="true" className="size-4 max-sm:hidden" strokeWidth={2} />
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn(
            'mt-2 px-5 text-left text-sm font-medium',
            tone === 'dark' ? 'text-orange' : 'text-orange-text',
          )}
        >
          {error}
        </p>
      )}
    </form>
  );
}
