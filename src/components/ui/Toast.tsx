'use client';

import { useEffect } from 'react';
import { CircleCheck, X } from 'lucide-react';

/** Bottom-corner confirmation message. Closes itself after a few seconds. */
export function Toast({
  message,
  onClose,
  duration = 6000,
}: {
  message: string;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto flex max-w-[440px] animate-slide-down items-start gap-3 rounded-2xl bg-primary-dark p-4 pr-2 text-white shadow-dropdown sm:inset-x-auto sm:bottom-6 sm:right-6"
    >
      <CircleCheck
        aria-hidden="true"
        className="mt-0.5 size-5 flex-none text-success-light"
        strokeWidth={2}
      />
      <p className="flex-1 text-[15px] leading-snug">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss message"
        className="-my-1 flex size-9 flex-none items-center justify-center rounded-full text-tint-200 hover:bg-white/10 hover:text-white"
      >
        <X aria-hidden="true" className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
