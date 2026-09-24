import { notFound } from "next/navigation";
import { ArtworkDetail } from "@/components/ArtworkDetail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { locales, type Locale } from "@/lib/content";
import { getPublishedFanArt, getPublishedWorkBySlug, getPublishedWorks } from "@/lib/publicWorks";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const publishedWorks = await getPublishedWorks();
  return locales.flatMap((locale) => publishedWorks.map((work) => ({ locale, slug: work.slug })));
}

export default async function ArtworkPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const artwork = await getPublishedWorkBySlug(slug);
  const communityPosts = await getPublishedFanArt();

  if (!artwork) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <ArtworkDetail artwork={artwork} locale={locale} communityPosts={communityPosts} />
      <Footer />
    </div>
  );
}
