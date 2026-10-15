import Image from 'next/image';
import { ImageIcon, UserRound } from 'lucide-react';
import { existingImage } from '@/lib/images';
import { cn } from '@/lib/cn';

interface ImagePlaceholderProps {
  /** Shown on the placeholder and used as alt text once a real photo is added. */
  label: string;
  /** Path under /public, e.g. "/images/hero.jpg". Falls back to the placeholder if the file is missing. */
  src?: string;
  /** Alt text for the real photo; defaults to `label`. Pass "" for decorative images. */
  alt?: string;
  /** `person` shows a user icon (portraits); `image` a picture icon. */
  icon?: 'image' | 'person' | 'none';
  /** Sizing / radius classes. The element is `relative` so it can hold a `fill` image. */
  className?: string;
  labelClassName?: string;
  /** Where the icon and label sit (flex alignment classes). Centred by default. */
  alignClassName?: string;
  iconClassName?: string;
  /** Focus point of the real photo when it's cropped, e.g. "38% 40%" (CSS object-position). */
  position?: string;
  /** Pass for above-the-fold images. */
  priority?: boolean;
  sizes?: string;
}

/**
 * Sky-blue gradient placeholder with dot texture, icon and label — swaps to a real
 * photo automatically once the file in `src` is added to /public.
 */
export function ImagePlaceholder({
  label,
  src,
  alt,
  icon = 'image',
  className,
  labelClassName,
  alignClassName = 'items-center justify-center',
  iconClassName,
  position,
  priority,
  sizes = '(min-width: 1025px) 50vw, 100vw',
}: ImagePlaceholderProps) {
  const real = existingImage(src);

  if (real) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={real}
          alt={alt ?? label}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  const Icon = icon === 'person' ? UserRound : ImageIcon;

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={cn(
        'relative flex flex-col gap-2.5 overflow-hidden bg-photo-placeholder text-primary',
        'after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(rgba(255,255,255,.35)_1px,transparent_1px)] after:bg-[length:18px_18px] after:opacity-50',
        alignClassName,
        className,
      )}
    >
      {icon !== 'none' && (
        <Icon
          aria-hidden="true"
          strokeWidth={2}
          className={cn('relative z-[1] size-[34px] flex-none opacity-85', iconClassName)}
        />
      )}
      <span
        className={cn(
          'relative z-[1] max-w-[90%] px-4 text-center text-[11.5px] font-bold uppercase leading-normal tracking-[.09em]',
          labelClassName,
        )}
      >
        {label}
      </span>
    </div>
  );
}
