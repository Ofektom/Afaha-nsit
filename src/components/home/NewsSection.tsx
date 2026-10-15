import { events } from '@/content/events';
import { home } from '@/content/home';
import { getArticle, homeNews, type NewsArticle } from '@/content/news';
import { EventItem } from '@/components/cards/EventItem';
import { NewsCard, NewsListItem } from '@/components/cards/NewsCard';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

const copy = home.news;

function article(slug: string): NewsArticle {
  const a = getArticle(slug);
  if (!a) throw new Error(`homeNews refers to unknown article "${slug}" (src/content/news.ts)`);
  return a;
}

export function NewsSection() {
  const featured = article(homeNews.featured);
  const list = homeNews.list.map(article);

  return (
    <section aria-labelledby="home-news" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="home-news"
          eyebrow={copy.eyebrow}
          title={
            <>
              <span className="md:hidden">{copy.mobileTitle}</span>
              <span className="max-md:hidden">{copy.title}</span>
            </>
          }
          action={
            <ButtonLink href={copy.cta.href} variant="outline-dark">
              {copy.cta.label}
            </ButtonLink>
          }
          actionClassName="max-md:hidden"
          spacing="mb-4 md:mb-8 lg:mb-12"
        />

        <div className="lg:flex lg:items-start lg:gap-10">
          <NewsCard article={featured} className="lg:flex-1" />

          <div className="mt-10 flex flex-col gap-5 max-md:hidden lg:mt-0 lg:w-[500px] lg:flex-none">
            {list.map((a) => (
              <NewsListItem key={a.slug} article={a} />
            ))}
            <div className="flex flex-col gap-4 rounded-card bg-orange-soft p-6">
              <h3 className="text-[13px] font-bold uppercase tracking-eyebrow text-badge-text">
                {copy.eventsHeading}
              </h3>
              <ul className="flex flex-col gap-4">
                {events.map((e) => (
                  <EventItem key={e.title} event={e} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ButtonLink href={copy.cta.href} variant="outline-dark" className="mt-[18px] md:hidden">
          {copy.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
