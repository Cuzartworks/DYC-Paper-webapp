import Image from "next/image";
import Link from "next/link";
import type { CommunityPost } from "@/lib/content";

export function CommunityTicker({ locale, posts }: { locale: "en" | "ja"; posts: CommunityPost[] }) {
  const items = posts.map((post, index) => ({
    ...post,
    label: ["community drawing", "shared mark", "unfinished piece", "new interpretation"][index % 4],
  }));

  return (
    <div className="overflow-hidden border-y border-[#E6E6E6] bg-[#F6F6F6]" aria-label="Community artwork submissions">
      <div className="flex min-w-max animate-[marquee_22s_linear_infinite] gap-5 py-3 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <Link key={`${item.handle}-${index}`} href={`/${locale}/fan-art/${item.slug}`} className="inline-flex items-center gap-3 pr-1 transition-opacity hover:opacity-65">
            <Image
              src={item.image}
              alt={`${item.name} fan art`}
              width={96}
              height={96}
              className="h-20 w-20 border border-[#D4D4D4] bg-white object-cover md:h-24 md:w-24"
            />
            <span className="flex flex-col gap-1 pr-2 text-[#0D0D0D]">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[#737373]">{item.label}</span>
              <span className="text-sm font-medium">{item.handle}</span>
            </span>
            <span aria-hidden="true" className="px-2 text-lg text-[#737373]">✦</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
