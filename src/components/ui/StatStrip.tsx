'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

const DURATION = 1400;
const format = (n: number) => n.toLocaleString('en-US');

/**
 * Counts the element's text from 0 to `value` once `start` is true. Writes the DOM directly
 * (one paint per frame, no React re-renders) to keep the main thread free during load.
 */
function useCountUp(value: number, suffix: string, start: boolean) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!start || !el) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION);
      el.textContent = format(Math.round(value * (1 - Math.pow(1 - p, 3)))) + suffix;
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, suffix, start]);

  return ref;
}

function Stat({ stat, start }: { stat: (typeof site.stats)[number]; start: boolean }) {
  const countRef = useCountUp(stat.value, stat.suffix, start);
  // dt comes before dd for valid markup; flex-col-reverse shows the number first.
  return (
    <div
      className={cn(
        'flex flex-col-reverse text-center md:text-left',
        !stat.onMobile && 'max-md:hidden',
      )}
    >
      <dt className="mt-0 text-xs font-medium text-primary-soft md:mt-1 md:text-[15px]">
        <span className="md:hidden">{stat.mobileLabel}</span>
        <span className="max-md:hidden">{stat.label}</span>
      </dt>
      <dd className="font-serif text-[26px] font-semibold tabular-nums leading-[1.25] tracking-[-.01em] text-white md:text-[46px]">
        {/* Reserve the final width so the count-up doesn't shift the layout. */}
        <span className="relative inline-block">
          <span aria-hidden="true" className="invisible">
            {format(stat.value)}
            {stat.suffix}
          </span>
          <span ref={countRef} aria-hidden="true" className="absolute inset-0">
            {`${format(stat.value)}${stat.suffix}`}
          </span>
          <span className="sr-only">
            {format(stat.value)}
            {stat.suffix}
          </span>
        </span>
      </dd>
    </div>
  );
}

/** Key figures on a primary band; numbers count up once in view. */
export function StatStrip() {
  const ref = useRef<HTMLDListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Final figures render first (no-JS and reduced motion); count up once in view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Key figures" className="bg-primary">
      <dl ref={ref} className="container-x flex justify-around py-6 md:justify-between md:py-10">
        {site.stats.map((s) => (
          <Stat key={s.label} stat={s} start={start} />
        ))}
      </dl>
    </section>
  );
}
