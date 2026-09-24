import { ArtworkCard } from "@/components/ArtworkCard";
import type { Artwork, Locale } from "@/lib/content";

export function ArtworkGrid({ works, locale }: { works: Artwork[]; locale: Locale }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-24 md:px-8 md:pb-32 xl:px-16">
      <div className="mb-10 flex items-end justify-between gap-6 border-t border-[#0D0D0D] pt-5">
        <div>
          <p className="mb-3 text-[0.7rem] uppercase tracking-[0.22em] text-[#737373]">02 — Archive</p>
          <h2 className="text-[clamp(2.25rem,4vw,4.5rem)] font-light leading-none tracking-[-0.07em] text-[#0D0D0D]">
            {locale === "en" ? "Featured works" : "作品ギャラリー"}
          </h2>
        </div>
        <p className="hidden max-w-[180px] text-right text-sm leading-6 text-[#737373] md:block">
          {locale === "en" ? "Open a work, add a line, and leave your trace." : "作品を開き、線を加え、あなたの跡を残す。"}
        </p>
      </div>

      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 xl:gap-x-8 xl:gap-y-16">
        {works.map((artwork) => (
          <ArtworkCard key={artwork.slug} artwork={artwork} locale={locale} />
        ))}
      </div>
    </section>
  );
}
