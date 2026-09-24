import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WorksArchive } from "@/components/WorksArchive";
import { locales, type Locale } from "@/lib/content";
import { getPublishedWorks } from "@/lib/publicWorks";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WorksArchivePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const publishedWorks = await getPublishedWorks();

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <WorksArchive works={publishedWorks} locale={locale} />
      <Footer />
    </div>
  );
}