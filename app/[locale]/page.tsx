import { CommunityTicker } from "@/components/CommunityTicker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroIntro } from "@/components/HeroIntro";
import { HowItWorks } from "@/components/HowItWorks";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { getDictionary, locales, type Locale } from "@/lib/content";
import { getPublishedFanArt, getPublishedWorks } from "@/lib/publicWorks";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}

async function HomePage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const publishedWorks = await getPublishedWorks();
  const publishedFanArt = await getPublishedFanArt();

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <CommunityTicker locale={locale} posts={publishedFanArt} />
      <HeroIntro title={dictionary.home.heroTitle} body={dictionary.home.heroBody} />
      <HowItWorks locale={locale} />
      <ArtworkGrid works={publishedWorks} locale={locale} />
      <Footer />
    </div>
  );
}
