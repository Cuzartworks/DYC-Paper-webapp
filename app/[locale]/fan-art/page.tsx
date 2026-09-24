import { FanArtArchive } from "@/components/FanArtArchive";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { locales, type Locale } from "@/lib/content";
import { getPublishedFanArt, getPublishedWorks } from "@/lib/publicWorks";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FanArtArchivePage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ motif?: string }> }) {
  const { locale } = await params;
  const { motif } = await searchParams;
  const publishedWorks = await getPublishedWorks();
  const publishedFanArt = await getPublishedFanArt();

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <FanArtArchive posts={publishedFanArt} motifs={publishedWorks} initialMotif={motif} locale={locale} />
      <Footer />
    </div>
  );
}