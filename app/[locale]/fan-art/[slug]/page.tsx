import { notFound } from "next/navigation";
import { FanArtDetail } from "@/components/FanArtDetail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { locales, type Locale } from "@/lib/content";
import { getPublishedFanArt } from "@/lib/publicWorks";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const publishedFanArt = await getPublishedFanArt();
  return locales.flatMap((locale) => publishedFanArt.map((post) => ({ locale, slug: post.slug })));
}

export default async function FanArtPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const publishedFanArt = await getPublishedFanArt();
  const post = publishedFanArt.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <FanArtDetail post={post} locale={locale} />
      <Footer />
    </div>
  );
}
