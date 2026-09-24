import Image from "next/image";
import Link from "next/link";
import type { CommunityPost, Locale } from "@/lib/content";

export function FanArtDetail({ post, locale }: { post: CommunityPost; locale: Locale }) {
  return (
    <article>
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-12 md:px-8 xl:px-16">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-[#0D0D0D] transition-opacity hover:opacity-60">
          ← {locale === "en" ? "Back to works" : "作品に戻る"}
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-8 xl:px-16">
        <div className="overflow-hidden border border-[#E6E6E6] bg-[#F3F3F1]">
          <Image src={post.image} alt={`${post.name} fan art`} width={1200} height={1500} className="h-auto w-full" priority />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">
            {locale === "en" ? "Community fan art" : "コミュニティのファンアート"}
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.07em] text-[#0D0D0D]">{post.name}</h1>
          <p className="mt-4 text-sm text-[#737373]">{post.handle}</p>
          <div className="mt-10 border-t border-[#0D0D0D] pt-5">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">
              {locale === "en" ? "Message" : "メッセージ"}
            </p>
            <p className="max-w-[520px] text-lg leading-8 text-[#2B2B2B]">{post.message[locale]}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
