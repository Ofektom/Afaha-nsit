import type { Metadata } from 'next';
import Link from 'next/link';
import { articleHref, getArticle, news, newsPage, readingMinutes } from '@/content/news';
import { NewsBrowser } from '@/components/news/NewsBrowser';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { NotifyForm } from '@/components/ui/NotifyForm';
import { PageHero } from '@/components/ui/PageHero';
import { formatDateLong } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'News & Events',
  description: newsPage.lead,
  path: '/news/',
});

export default function NewsPage() {
  const featured = getArticle(newsPage.featured);
  if (!featured) throw new Error(`newsPage.featured "${newsPage.featured}" not found`);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: newsPage.title }]}
        title={newsPage.title}
        lead={newsPage.lead}
      />

      <NewsBrowser
        articles={news}
        featuredSlug={featured.slug}
        perPage={newsPage.perPage}
        featured={
          <article
            aria-labelledby="featured-title"
            className="container-x pb-2 pt-10 lg:flex lg:items-center lg:gap-12 lg:pb-8 lg:pt-14"
          >
            <ImagePlaceholder
              label={featured.image.label}
              src={featured.image.src}
              alt=""
              priority
              className="h-[240px] w-full flex-none rounded-panel md:h-[360px] lg:h-[420px] lg:w-[700px]"
              sizes="(min-width: 1025px) 700px, 100vw"
            />
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <Chip tone="orange">Featured</Chip>
                <span className="text-sm text-muted">
                  <time dateTime={featured.date}>{formatDateLong(featured.date)}</time> ·{' '}
                  {readingMinutes(featured)} min read
                </span>
              </div>
              <h2
                id="featured-title"
                className="mt-[18px] font-serif text-[28px] font-semibold leading-[1.18] tracking-[-.01em] text-ink md:text-[34px] lg:text-[38px]"
              >
                <Link href={articleHref(featured.slug)} className="hover:text-primary">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3.5 text-base leading-[1.6] text-muted lg:text-[17px]">
                {featured.excerpt}
              </p>
              <ButtonLink
                href={articleHref(featured.slug)}
                variant="primary"
                className="mt-6"
                aria-label={`Read story: ${featured.title}`}
              >
                Read story
              </ButtonLink>
            </div>
          </article>
        }
      />

      <section aria-labelledby="newsletter-title" className="bg-cream py-12 lg:py-16">
        <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="newsletter-title"
              className="font-serif text-[26px] font-semibold leading-[1.2] tracking-[-.01em] text-ink lg:text-[32px]"
            >
              {newsPage.newsletter.title}
            </h2>
            <p className="mt-2 text-base text-muted">{newsPage.newsletter.text}</p>
          </div>
          <NotifyForm
            tone="light"
            label="Email address for University news"
            placeholder={newsPage.newsletter.placeholder}
            buttonLabel={newsPage.newsletter.button}
            successMessage="Thank you for subscribing. (Demo: no emails are sent yet.)"
            className="w-full lg:w-[520px]"
          />
        </div>
      </section>
    </>
  );
}
