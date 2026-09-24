import Image from "next/image";
import Link from "next/link";
import { works, type Artwork, type CommunityPost, type Locale } from "@/lib/content";

export function ArtworkDetail({
  artwork,
  locale,
  communityPosts,
}: {
  artwork: Artwork;
  locale: Locale;
  communityPosts: CommunityPost[];
}) {
  const relatedPosts = communityPosts.filter((post) => post.artworkSlug === artwork.slug);
  const motifTitle = works.find((work) => work.slug === artwork.slug)?.title ?? artwork.title;

  return (
    <article>
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-12 md:px-8 xl:px-16">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-[#0D0D0D] hover:opacity-70">
          ← {locale === "en" ? "Back" : "戻る"}
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-16 md:px-8 md:grid-cols-[1.1fr_0.9fr] xl:px-16">
        <div className="overflow-hidden border border-[#E6E6E6] bg-[#F6F6F6]">
          {artwork.image.startsWith("data:") ? (
            <img src={artwork.image} alt={artwork.title} className="h-full w-full object-cover" />
          ) : (
            <Image src={artwork.image} alt={artwork.title} width={artwork.width ?? 1200} height={artwork.height ?? 1500} className="h-full w-full object-cover" priority />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">{artwork.year}</p>
          <h1 className="text-[clamp(2.5rem,4vw,4.5rem)] font-light leading-[0.95] tracking-[-0.06em] text-[#0D0D0D]">
            {artwork.title}
          </h1>
          <div className="mt-6 space-y-2 text-sm text-[#0D0D0D]">
            <p><span className="text-[#737373]">{locale === "en" ? "Status" : "状態"}:</span> unfinished</p>
          </div>
          <p className="mt-8 max-w-[520px] text-base leading-8 text-[#2B2B2B]">{artwork.description[locale]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={artwork.download.jpg} download className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0D0D0D] bg-white px-5 py-3 text-sm font-medium text-[#0D0D0D] transition-colors hover:bg-[#0D0D0D] hover:text-white">
              <span className="font-semibold">JPG</span>
              <span>{locale === "en" ? "Download" : "ダウンロード"}</span>
            </a>
            <a href={artwork.download.png} download className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0D0D0D] bg-white px-5 py-3 text-sm font-medium text-[#0D0D0D] transition-colors hover:bg-[#0D0D0D] hover:text-white">
              <span className="font-semibold">PNG</span>
              <span>{locale === "en" ? "Download" : "ダウンロード"}</span>
            </a>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8 xl:px-16">
        <div className="mb-8 flex items-end justify-between gap-4 border-t border-[#0D0D0D] pt-5">
          <h2 className="text-[2rem] font-light tracking-[-0.06em] text-[#0D0D0D]">
            {locale === "en" ? "Drawn by the community" : "コミュニティが描いたバージョン"}
          </h2>
          <Link href={`/${locale}/fan-art?motif=${artwork.slug}`} className="shrink-0 border-b border-[#0D0D0D] pb-1 text-xs text-[#0D0D0D] transition-opacity hover:opacity-60">
            {locale === "en" ? "See more" : "もっと見る"}
          </Link>
        </div>

        <div className="-mx-4 overflow-hidden px-4 pb-4 md:-mx-8 md:px-8 xl:-mx-16 xl:px-16">
          <div className="flex min-w-max animate-[marquee_28s_linear_infinite] gap-4">
            {[...relatedPosts, ...relatedPosts].map((post, index) => (
              <Link key={`${post.handle}-${index}`} href={`/${locale}/fan-art/${post.slug}`} className="group block w-[72vw] shrink-0 border border-[#E6E6E6] bg-white transition-opacity hover:opacity-70 sm:w-[280px]">
                <Image src={post.image} alt={post.name} width={600} height={720} className="h-[260px] w-full object-cover" />
                <div className="px-4 py-3 text-sm text-[#0D0D0D]">{post.handle}</div>
              </Link>
            ))}
          </div>
          {!relatedPosts.length && <p className="border border-[#E6E6E6] px-4 py-6 text-sm text-[#737373]">{locale === "en" ? `No fan art for ${motifTitle} yet.` : `${motifTitle}をモチーフにしたファンアートはまだありません。`}</p>}
        </div>
      </section>
    </article>
  );
}
