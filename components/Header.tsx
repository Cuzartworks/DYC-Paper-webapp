"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { communityPosts, works, type Locale } from "@/lib/content";

const navMap = {
  en: [
    { label: "share", href: "/submit", key: "share" },
    { label: "works", href: "/works", key: "works" },
    { label: "fan art", href: "/fan-art", key: "fan-art" },
    { label: "about", href: "/concept", key: "about" },
    { label: "contact", href: "/contact", key: "contact" },
  ],
  ja: [
    { label: "投稿する", href: "/submit", key: "share" },
    { label: "作品一覧", href: "/works", key: "works" },
    { label: "ファンアート", href: "/fan-art", key: "fan-art" },
    { label: "ご案内", href: "/concept", key: "about" },
    { label: "お問い合わせ", href: "/contact", key: "contact" },
  ],
} as const;

function SearchDialog({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredWorks = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return works.slice(0, 5);
    return works.filter((work) => work.title.toLowerCase().includes(value));
  }, [query]);

  const filteredFanArt = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return communityPosts.slice(0, 4);
    return communityPosts.filter((post) => `${post.name} ${post.handle}`.toLowerCase().includes(value));
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[#0D0D0D] transition-opacity hover:opacity-70"
        aria-label="Open search"
      >
        {locale === "en" ? "search" : "検索"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/10 p-4 pt-20 backdrop-blur-[2px]">
          <div className="w-full max-w-[640px] border border-[#E6E6E6] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={locale === "en" ? "Search works or fan art usernames" : "作品名やファンアートのユーザー名を検索"}
                className="w-full border border-[#E6E6E6] bg-[#F6F6F6] px-4 py-3 outline-none focus:border-[#0D0D0D]"
                aria-label="Search works"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-[#0D0D0D]" aria-label="Close search">
                {locale === "en" ? "Close" : "閉じる"}
              </button>
            </div>

            <div className="flex max-h-[420px] flex-col gap-5 overflow-y-auto">
              <div>
                <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#737373]">{locale === "en" ? "Works" : "作品"}</p>
                {filteredWorks.map((work) => (
                <Link
                  key={work.slug}
                  href={`/${locale}/works/${work.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-[#E6E6E6] py-2 text-[#0D0D0D] hover:opacity-70"
                >
                  <span>{work.title}</span>
                  <span className="text-xs text-[#737373]">{work.year}</span>
                </Link>
                ))}
              </div>

              <div>
                <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#737373]">{locale === "en" ? "Fan art / username" : "ファンアート / ユーザー名"}</p>
                {filteredFanArt.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${locale}/fan-art/${post.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-[#E6E6E6] py-2 text-[#0D0D0D] hover:opacity-70"
                  >
                    <span>{post.handle}</span>
                    <span className="text-xs text-[#737373]">{post.name}</span>
                  </Link>
                ))}
              </div>

              {!filteredWorks.length && !filteredFanArt.length && (
                <p className="py-3 text-sm text-[#737373]">
                  {locale === "en" ? "No results found." : "該当する作品はありません。"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const items = navMap[locale];
  const currentPath = pathname?.replace(/^\/(en|ja)/, "") || "/";

  return (
    <header className="border-b border-[#E6E6E6] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[89px] max-w-[1440px] items-center justify-between px-4 md:px-8 xl:px-16">
        <Link href={`/${locale}`} className="text-[1.125rem] font-medium tracking-[0.02em] text-[#0D0D0D]" aria-label="DYC PAPER home">
          DYC PAPER
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm md:flex">
          {items.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="text-[#0D0D0D] transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l border-[#E6E6E6] pl-4">
            <LanguageSwitcher locale={locale} path={currentPath} />
            <SearchDialog locale={locale} />
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] text-sm md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#E6E6E6] md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 text-sm">
            {items.map((item) => (
              <Link key={item.key} href={`/${locale}${item.href}`} className="text-[#0D0D0D]" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} path={currentPath} />
            <SearchDialog locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
