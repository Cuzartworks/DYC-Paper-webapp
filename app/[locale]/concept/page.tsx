import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Locale } from "@/lib/content";

export default async function ConceptPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <ConceptContent locale={locale} />;
}

function ConceptContent({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <main className="mx-auto max-w-[960px] px-4 py-20 md:px-8 xl:px-16">
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">
          {isEnglish ? "CONCEPT" : "コンセプト"}
        </p>
        <h1 className="text-[clamp(2.6rem,5vw,5rem)] font-light tracking-[-0.06em] text-[#0D0D0D]">
          {isEnglish ? "Art isn't finished until you touch it." : "アートは、触れたときに完成する。"}
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#737373]">
              {isEnglish ? "The name" : "ブランド名"}
            </h2>
            <p className="text-lg leading-8 text-[#0D0D0D]">DYC PAPER</p>
          </section>
          <section>
            <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#737373]">
              {isEnglish ? "The idea" : "その考え方"}
            </h2>
            <p className="text-lg leading-8 text-[#0D0D0D]">
              {isEnglish
                ? "The work invites the viewer to begin, continue, and complete the story using their own hand."
                : "作品は、見る人が自分の手で始め、続け、完成させることを促します。"}
            </p>
          </section>
        </div>

        <section className="mt-12 border-t border-[#E6E6E6] pt-10">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-[#737373]">
            {isEnglish ? "The root: Pareidolia" : "根幹：パレイドリア"}
          </h2>
          <p className="max-w-[680px] text-lg leading-8 text-[#0D0D0D]">
            {isEnglish
              ? "Pareidolia lets the brain find faces, forms, and meanings in incomplete marks. DYC PAPER turns that instinct into a collaborative art practice."
              : "パレイドリアとは、曖昧な形に人の顔や意味を見出す脳の働きです。DYC PAPERはその感覚を、協働的なアート実践として扱います。"}
          </p>
        </section>

        <Link href={`/${locale}`} className="mt-12 inline-flex items-center text-base text-[#0D0D0D] underline-offset-4 hover:underline">
          {isEnglish ? "Explore the works →" : "作品を見る →"}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
