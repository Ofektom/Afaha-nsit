'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AccordionItem {
  question: string;
  answer: string;
}

/** Question-and-answer list; one item open at a time (the first by default). */
export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly AccordionItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li
            key={item.question}
            className={cn(
              'rounded-2xl border bg-white transition-colors',
              isOpen ? 'border-primary' : 'border-line',
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left text-base font-semibold leading-[1.3] text-ink md:p-6 md:text-[18px]"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 flex-none text-primary transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  strokeWidth={2}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="-mt-3 px-5 pb-5 text-[15px] leading-[1.6] text-muted md:px-6 md:pb-6"
            >
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
