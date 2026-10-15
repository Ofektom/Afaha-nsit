/** Link to the generic "page coming soon" screen for anything without a page yet. */
export function comingSoon(pageName: string): string {
  return `/coming-soon/?page=${encodeURIComponent(pageName)}`;
}

/** Link to a portal's coming-soon page. */
export function portalHref(slug: string): string {
  return `/portals/${slug}/`;
}
