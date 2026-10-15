'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { contact } from '@/content/contact';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { cn } from '@/lib/cn';

type Field = 'name' | 'email' | 'phone' | 'office' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: '', email: '', phone: '', office: '', message: '' };
const ORDER: Field[] = ['name', 'email', 'phone', 'office', 'message'];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (v.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim()))
    e.phone = 'Please enter a valid phone number, or leave this blank.';
  if (!v.office) e.office = 'Please choose the office you want to contact.';
  if (v.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.';
  return e;
}

/** Demo contact form: validates in the browser, then shows a toast. Nothing is sent. */
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const closeToast = useCallback(() => setToast(false), []);

  const set =
    (f: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [f]: e.target.value };
      setValues(next);
      // After the first submit, re-check as the user fixes things.
      if (submitted) setErrors(validate(next));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const first = ORDER.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setValues(EMPTY);
    setSubmitted(false);
    setToast(true);
  };

  const fieldProps = (f: Field, extra?: string | false) => ({
    id: `${id}-${f}`,
    name: f,
    value: values[f],
    onChange: set(f),
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? `${id}-${f}-error` : undefined,
    className: cn(
      'w-full rounded-input border bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-placeholder focus:border-primary',
      errors[f] ? 'border-orange-text' : 'border-line',
      // An unchosen <select> shows its prompt in the placeholder colour.
      f === 'office' && !values.office ? 'text-muted' : 'text-ink',
      extra,
    ),
  });

  const label = (f: Field, text: string, optional = false) => (
    <label htmlFor={`${id}-${f}`} className="mb-2 block text-sm font-semibold text-ink">
      {text}
      {optional && <span className="font-normal text-muted"> (optional)</span>}
    </label>
  );

  const error = (f: Field) =>
    errors[f] && (
      <p id={`${id}-${f}-error`} className="mt-1.5 text-sm font-medium text-orange-text">
        {errors[f]}
      </p>
    );

  return (
    <>
      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        aria-labelledby={`${id}-title`}
        className="flex flex-col gap-5 rounded-panel bg-cream p-6 md:p-10"
      >
        <h2
          id={`${id}-title`}
          className="font-serif text-[26px] font-semibold leading-[1.2] tracking-[-.01em] text-ink lg:text-[30px]"
        >
          {contact.form.title}
        </h2>
        <div className="grid gap-5 md:grid-cols-2 md:gap-4">
          <div>
            {label('name', 'Full name')}
            <input
              type="text"
              autoComplete="name"
              placeholder="e.g. Aniekan Udoh"
              {...fieldProps('name', 'h-[52px]')}
            />
            {error('name')}
          </div>
          <div>
            {label('email', 'Email address')}
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...fieldProps('email', 'h-[52px]')}
            />
            {error('email')}
          </div>
          <div>
            {label('phone', 'Phone number', true)}
            <input
              type="tel"
              autoComplete="tel"
              placeholder="+234"
              {...fieldProps('phone', 'h-[52px]')}
            />
            {error('phone')}
          </div>
          <div>
            {label('office', 'Department / Office')}
            <div className="relative">
              <select {...fieldProps('office', 'h-[52px] appearance-none pr-10')}>
                <option value="" disabled>
                  Select an office
                </option>
                {contact.form.offices.map((o) => (
                  <option key={o} value={o} className="text-ink">
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                strokeWidth={2}
              />
            </div>
            {error('office')}
          </div>
        </div>
        <div>
          {label('message', 'Message')}
          <textarea
            rows={5}
            placeholder="How can we help you?"
            {...fieldProps('message', 'min-h-[140px] resize-y py-3.5')}
          />
          {error('message')}
        </div>
        <div>
          <Button type="submit" variant="primary">
            {contact.form.submitLabel}
          </Button>
        </div>
      </form>
      {toast && <Toast message={contact.form.successMessage} onClose={closeToast} />}
    </>
  );
}
