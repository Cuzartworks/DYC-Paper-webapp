"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Artwork, CommunityPost, Locale } from "@/lib/content";

export function FanArtArchive({ posts, motifs = [], locale, initialMotif = "" }: { posts: CommunityPost[]; motifs?: Artwork[]; locale: Locale; initialMotif?: string }) {
  const [query, setQuery] = useState("");
  const [selectedMotif, setSelectedMotif] = useState(initialMotif);
  const motifTitles = useMemo(() => new Map(motifs.map((work) => [work.slug, work.title])), [motifs]);
  const filteredPosts = useMemo(() => {
    const value = query.trim().toLowerCase();
    return posts
      .filter((post) => !selectedMotif || post.artworkSlug === selectedMotif)
      .filter((post) => !value || `${post.name} ${post.handle}`.toLowerCase().includes(value))
      .sort((a, b) => (motifTitles.get(a.artworkSlug) ?? "").localeCompare(motifTitles.get(b.artworkSlug) ?? ""));
  }, [motifTitles, posts, query, selectedMotif]);

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 xl:px-16">
      <header className="mb-12 border-t border-[#0D0D0D] pt-5">
        <p className="mb-3 text-[0.7rem] uppercase tracking-[0.22em] text-[#737373]">03 — Community archive</p>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h1 className="text-[clamp(2.8rem,6vw,6.5rem)] font-light leading-[0.88] tracking-[-0.075em] text-[#0D0D0D]">
            {locale === "en" ? "Fan art archive" : "ファンアート一覧"}
          </h1>
          <div className="grid w-full max-w-[420px] gap-4 text-sm">
            <label className="grid gap-2">
              <span className="text-[#737373]">{locale === "en" ? "Search by username" : "ユーザー名で検索"}</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={locale === "en" ? "@username" : "@ユーザー名"}
                className="border border-[#0D0D0D] bg-white px-4 py-3 outline-none"
                aria-label={locale === "en" ? "Search fan art by username" : "ファンアートをユーザー名で検索"}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[#737373]">{locale === "en" ? "Search by motif" : "モチーフ作品で検索"}</span>
              <select value={selectedMotif} onChange={(event) => setSelectedMotif(event.target.value)} className="border border-[#0D0D0D] bg-white px-4 py-3 outline-none">
                <option value="">{locale === "en" ? "All motifs" : "すべてのモチーフ"}</option>
                {[...motifs].sort((a, b) => a.title.localeCompare(b.title)).map((work) => <option key={work.slug} value={work.slug}>{work.title}</option>)}
              </select>
            </label>
          </div>
        </div>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/${locale}/fan-art/${post.slug}`} className="group block border border-[#E6E6E6] bg-white transition-opacity hover:opacity-70">
            <Image src={post.image} alt={`${post.name} fan art`} width={700} height={840} className="aspect-[5/6] w-full object-cover" />
            <div className="p-4">
              <p className="text-sm font-medium text-[#0D0D0D]">{post.handle}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#737373]">{motifTitles.get(post.artworkSlug) ?? post.artworkSlug}</p>
              <p className="mt-2 text-sm leading-6 text-[#737373]">{post.message[locale]}</p>
            </div>
          </Link>
        ))}
      </div>

      {!filteredPosts.length && <p className="border-t border-[#E6E6E6] pt-6 text-sm text-[#737373]">{locale === "en" ? "No fan art found." : "該当するファンアートはありません。"}</p>}
    </main>
  );
}
