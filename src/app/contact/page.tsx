import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";

import { ROUTES } from "@/constants";
import { ContactForm } from "@/features/content/components/contact-form";
import {
  ContentCard,
  ContentCta,
  ContentGrid,
  MarketingHero,
  ProseSection,
} from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with the MusafirCaffe team for partnerships, press, support, or destination collaborations.",
  path: ROUTES.contact,
});

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Contact"
        title="Let’s talk destinations, cafés, and collaborations."
        description="Whether you’re a traveler with a tip, a café owner, or a journalist telling the story of coffee cities — we’d love to hear from you."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <ProseSection
        eyebrow="Reach us"
        title="How to get in touch"
        description="Choose the channel that fits. We typically respond within one to two business days."
      >
        <ContentGrid columns={2}>
          <ContentCard
            icon={<Mail className="h-5 w-5" aria-hidden />}
            title="General inquiries"
            description="hello@musafircaffe.com — partnerships, feedback, and general questions about the platform."
          />
          <ContentCard
            icon={<MessageCircle className="h-5 w-5" aria-hidden />}
            title="Traveler support"
            description="Need help with your account or a guide? Visit the Help Center or email support@musafircaffe.com."
            href={ROUTES.help}
          />
          <ContentCard
            icon={<MapPin className="h-5 w-5" aria-hidden />}
            title="Press & media"
            description="For interviews, brand assets, and story angles, head to our Press page or email press@musafircaffe.com."
            href={ROUTES.press}
          />
          <ContentCard
            icon={<Clock className="h-5 w-5" aria-hidden />}
            title="Careers"
            description="Building the next chapter of travel + coffee? See open roles and how we work."
            href={ROUTES.careers}
          />
        </ContentGrid>

        <ContactForm />
      </ProseSection>

      <ContentCta
        title="Prefer a quick answer?"
        description="Browse FAQs and traveler tips before you write — many questions are already covered."
        primaryHref={ROUTES.faq}
        primaryLabel="View FAQ"
        secondaryHref={ROUTES.help}
        secondaryLabel="Help Center"
      />
    </main>
  );
}
