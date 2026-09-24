import Image from "next/image";
import Link from "next/link";
import type { Artwork, Locale } from "@/lib/content";

export function ArtworkCard({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  const href = `/${locale}/works/${artwork.slug}`;

  return (
    <article className="group">
      <Link href={href} className="block" aria-label={`View ${artwork.title}`}>
        <div className="relative aspect-[4/5] overflow-hidden border border-[#E6E6E6] bg-[#F3F3F1]">
          {artwork.image.startsWith("data:") ? (
            <img src={artwork.image} alt={artwork.title} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]" />
          ) : (
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={artwork.width ?? 800}
              height={artwork.height ?? 1000}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[1.35rem] font-light leading-tight tracking-[-0.05em] text-[#0D0D0D]">{artwork.title}</h3>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-[#737373]">{artwork.year}</p>
        </div>
        <Link href={href} className="whitespace-nowrap border-b border-[#0D0D0D] pb-1 text-sm text-[#0D0D0D] transition-opacity hover:opacity-60">
          {locale === "en" ? "Download & draw" : "Download & draw"}
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#0D0D0D]">
        <span className="border border-[#0D0D0D] px-2 py-1">JPG</span>
        <span aria-hidden="true">/</span>
        <span className="border border-[#0D0D0D] px-2 py-1">PNG</span>
      </div>
    </article>
  );
}
