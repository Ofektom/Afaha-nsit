import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'orange' | 'primary' | 'outline-light' | 'outline-dark' | 'white';
export type ButtonSize = 'md' | 'lg';

// Each variant sets its own border colour: a shared `border-transparent` would win over
// `border-primary` because of the order Tailwind emits colour utilities.
const variants: Record<ButtonVariant, string> = {
  orange: 'border-transparent bg-orange text-primary-dark hover:bg-orange-hover',
  primary: 'border-transparent bg-primary text-white hover:bg-primary-hover',
  'outline-light': 'border-white text-white hover:bg-white/10',
  'outline-dark': 'border-primary text-primary hover:bg-primary-soft',
  white: 'border-transparent bg-white text-primary-dark hover:bg-cream',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-[22px] py-[14px] text-[15px]',
  lg: 'px-7 py-[17px] text-[17px]',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show the trailing arrow icon (on by default, as in the designs). */
  arrow?: boolean;
  /** Custom trailing icon; overrides `arrow`. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function buttonClasses(
  variant: ButtonVariant = 'orange',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border-[1.5px] font-semibold leading-[1.4] transition-colors duration-150',
    variants[variant],
    sizes[size],
    className,
  );
}

function Trailing({ arrow, icon }: Pick<CommonProps, 'arrow' | 'icon'>) {
  if (icon) return <>{icon}</>;
  if (arrow) return <ArrowRight aria-hidden="true" className="size-4 flex-none" strokeWidth={2} />;
  return null;
}

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    'href' | 'className' | 'children'
  >;

/** A link styled as a button. */
export function ButtonLink({
  variant,
  size,
  arrow = true,
  icon,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      <Trailing arrow={arrow} icon={icon} />
    </Link>
  );
}

type NativeButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export function Button({
  variant,
  size,
  arrow = true,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: NativeButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      <Trailing arrow={arrow} icon={icon} />
    </button>
  );
}
