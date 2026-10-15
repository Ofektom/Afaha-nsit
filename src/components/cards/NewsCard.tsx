import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { articleHref, type NewsArticle } from '@/content/news';
import { Chip } from '@/components/ui/Chip';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { formatDateLong, formatDateShort } from '@/lib/format';
import { cn } from '@/lib/cn';

/** Large featured story: photo, category and date, headline, excerpt. */
export function NewsCard({ article, className }: { article: NewsArticle; className?: string }) {
  return (
    <article className={cn('group relative', className)}>
      <ImagePlaceholder
        label={article.image.label}
        src={article.image.src}
        alt=""
        className="h-[200px] w-full rounded-2xl md:h-[400px] md:rounded-card"
        sizes="(min-width: 1025px) 740px, 100vw"
      />
      <div className="mt-4 flex items-center gap-3 md:mt-5">
        <Chip className="max-md:hidden">{singular(article.category)}</Chip>
        <time
          dateTime={article.date}
          className="text-[13px] font-medium text-orange-text md:text-sm md:font-normal md:text-muted"
        >
          <span className="md:hidden">{formatDateShort(article.date)}</span>
          <span className="max-md:hidden">{formatDateLong(article.date)}</span>
        </time>
      </div>
      <h3 className="mt-2 font-serif text-xl font-semibold leading-[1.25] tracking-[-.01em] text-ink md:mt-4 md:text-[30px]">
        <Link
          href={articleHref(article.slug)}
          className="after:absolute after:inset-0 group-hover:text-primary"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-muted max-md:hidden">
        {article.excerpt}
      </p>
    </article>
  );
}

/** Compact story row: thumbnail, date, headline. */
export function NewsListItem({ article }: { article: NewsArticle }) {
  return (
    <article className="group relative flex items-center gap-[18px] border-b border-line pb-5">
      <ImagePlaceholder
        label={article.image.label}
        src={article.image.src}
        alt=""
        icon="image"
        className="h-[100px] w-[140px] flex-none rounded-[14px]"
        iconClassName="size-6"
        sizes="140px"
      />
      <div>
        <time dateTime={article.date} className="text-[13px] font-medium text-orange-text">
          {formatDateShort(article.date)}
        </time>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-[1.3] tracking-[-.01em] text-ink">
          <Link
            href={articleHref(article.slug)}
            className="after:absolute after:inset-0 group-hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

/** Grid card on the News page: photo, category and date, headline, "Read more". */
export function NewsGridCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group relative flex h-full flex-col">
      <ImagePlaceholder
        label={article.image.label}
        src={article.image.src}
        alt=""
        className="h-[220px] w-full rounded-card lg:h-[240px]"
        sizes="(min-width: 1025px) 410px, (min-width: 768px) 50vw, 100vw"
      />
      <div className="mt-4 flex items-center gap-2.5">
        <Chip>{article.category}</Chip>
        <time dateTime={article.date} className="text-[13px] text-muted">
          {formatDateShort(article.date)}
        </time>
      </div>
      <h3 className="mt-3.5 font-serif text-[22px] font-semibold leading-[1.28] tracking-[-.01em] text-ink">
        <Link
          href={articleHref(article.slug)}
          className="after:absolute after:inset-0 group-hover:text-primary"
        >
          {article.title}
        </Link>
      </h3>
      <span
        aria-hidden="true"
        className="mt-3.5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        Read more
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </span>
    </article>
  );
}

/** Category labels are plural in filters ("Announcements") and singular on a story. */
function singular(category: string) {
  return category.endsWith('s') ? category.slice(0, -1) : category;
}
