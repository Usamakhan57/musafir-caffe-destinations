/**
 * Shared application components — reusable across features but specific
 * to this app (Navbar, Footer, PageShell, …).
 *
 * Re-export components from this barrel:
 *   export { Navbar } from "./navbar";
 */
export { Navbar } from "./navbar";
export { Footer } from "./footer";
export { OfflinePage } from "./offline-page";
export { Breadcrumbs } from "./breadcrumbs";
export type { BreadcrumbItem } from "./breadcrumbs";
export {
  MarketingHero,
  ContentCard,
  ContentGrid,
  ContentCta,
  ProseSection,
} from "./marketing";
