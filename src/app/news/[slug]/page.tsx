import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { articleHref, getArticle, news, readingMinutes, sortedNews } from '@/content/news';
import { NewsGridCard } from '@/components/cards/NewsCard';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatDateLong } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.excerpt,
    path: articleHref(a.slug),
    type: 'article',
    publishedTime: a.date,
  });
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  // Same category first, then the most recent other stories.
  const others = sortedNews().filter((a) => a.slug !== article.slug);
  const related = [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category),
  ].slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'News & Events', href: '/news/' },
          { label: article.category },
        ]}
        title={article.title}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-tint-200">
          <Chip tone="orange">{article.category}</Chip>
          <time dateTime={article.date}>{formatDateLong(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(article)} min read</span>
        </div>
      </PageHero>

      <article className="container-x pb-16 pt-10 lg:pb-24 lg:pt-14">
        <ImagePlaceholder
          label={article.image.label}
          src={article.image.src}
          alt=""
          priority
          className="mx-auto h-[220px] w-full max-w-[960px] rounded-panel md:h-[380px] lg:h-[480px]"
          sizes="(min-width: 1025px) 960px, 100vw"
        />
        <div className="mx-auto mt-10 max-w-[720px]">
          <p className="font-serif text-xl leading-[1.5] text-ink lg:text-[22px]">
            {article.excerpt}
          </p>
          {article.body.map((para) => (
            <p key={para.slice(0, 40)} className="mt-5 text-[17px] leading-[1.75] text-ink/85">
              {para}
            </p>
          ))}
          <div className="mt-10 border-t border-line pt-6">
            <ButtonLink
              href="/news/"
              variant="outline-dark"
              arrow={false}
              icon={<ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />}
              className="flex-row-reverse"
            >
              All news
            </ButtonLink>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="section-y bg-cream">
        <div className="container-x">
          <SectionHeading id="related-title" eyebrow="Newsroom" title="Related news" />
          <ul className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <NewsGridCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
