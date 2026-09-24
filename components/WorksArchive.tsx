import Link from "next/link";
import type { Artwork, Locale } from "@/lib/content";
import { ArtworkCard } from "@/components/ArtworkCard";

export function WorksArchive({ works, locale }: { works: Artwork[]; locale: Locale }) {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 xl:px-16">
      <header className="mb-12 border-t border-[#0D0D0D] pt-5">
        <p className="mb-3 text-[0.7rem] uppercase tracking-[0.22em] text-[#737373]">02 — Work archive</p>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h1 className="text-[clamp(2.8rem,6vw,6.5rem)] font-light leading-[0.88] tracking-[-0.075em] text-[#0D0D0D]">
            {locale === "en" ? "All works" : "作品一覧"}
          </h1>
          <p className="max-w-[280px] text-sm leading-6 text-[#737373]">
            {locale === "en" ? "Browse the complete collection and open any work to draw." : "作品を横に見比べながら、気になる作品を開いて描き足せます。"}
          </p>
        </div>
      </header>

      <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-8 md:-mx-8 md:px-8 xl:-mx-16 xl:px-16">
        {works.map((work) => (
          <div key={work.slug} className="w-[78vw] shrink-0 snap-start sm:w-[360px] lg:w-[400px]">
            <ArtworkCard artwork={work} locale={locale} />
          </div>
        ))}
      </div>

      <Link href={`/${locale}`} className="inline-flex border-b border-[#0D0D0D] pb-1 text-sm text-[#0D0D0D] transition-opacity hover:opacity-60">
        {locale === "en" ? "Back to home" : "ホームへ戻る"}
      </Link>
    </main>
  );
}
