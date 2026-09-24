"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  insights: {
    total: number;
    positives: number;
    followUps: number;
    mostActiveTopic?: [string, number];
    channelBreakdown: Array<[string, number]>;
    summary: string;
  };
  works: Array<{ id: string; title: string; status?: string; technique?: string; year?: number; image?: string; description?: string }>;
  boardPosts: Array<{ id: string; title: string; type?: string; date?: string; description?: string }>;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/admin/insights")
      .then((response) => response.json())
      .then((payload) => setData(payload))
      .catch(() => setData({
        insights: {
          total: 0,
          positives: 0,
          followUps: 0,
          channelBreakdown: [],
          summary: "問い合わせデータはまだありません。",
        },
        works: [],
        boardPosts: [],
      }));
  }, []);

  if (!data) {
    return <main className="min-h-screen bg-[#F6F6F6] px-4 py-8 text-[#0D0D0D]">Loading…</main>;
  }

  const { insights, works, boardPosts } = data;

  return (
    <main className="min-h-screen bg-[#F6F6F6] px-4 py-8 text-[#0D0D0D] md:px-8 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-8 border-b border-[#E6E6E6] pb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">管理者コンソール</p>
          <h1 className="mt-2 text-4xl font-light tracking-[-0.06em]">DYC PAPER 管理画面</h1>
        </header>

        <section className="grid gap-6 md:grid-cols-4">
          <StatCard label="問い合わせ総数" value={String(insights.total)} />
          <StatCard label="好意的な問い合わせ" value={String(insights.positives)} />
          <StatCard label="要フォロー" value={String(insights.followUps)} />
          <StatCard label="最多テーマ" value={topicLabels[insights.mostActiveTopic?.[0] ?? ""] ?? "-"} />
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-none border border-[#E6E6E6] bg-white p-6">
            <h2 className="mb-4 text-xl font-light">問い合わせ概要</h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-[#2B2B2B]">{insights.summary}</p>
              <ul className="space-y-2 text-sm text-[#0D0D0D]">
                {insights.channelBreakdown.map(([channel, count]) => (
                  <li key={channel} className="flex items-center justify-between border-b border-[#E6E6E6] pb-2">
                    <span>{channelLabels[channel] ?? channel}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-none border border-[#E6E6E6] bg-white p-6">
            <h2 className="mb-4 text-xl font-light">クイック操作</h2>
            <div className="flex flex-col gap-3 text-sm">
              <button className="rounded-full bg-[#0D0D0D] px-5 py-3 text-white">審査待ち作品を確認</button>
              <button className="rounded-full border border-[#E6E6E6] px-5 py-3 text-[#0D0D0D]">イベント告知を作成</button>
              <button className="rounded-full border border-[#E6E6E6] px-5 py-3 text-[#0D0D0D]">問い合わせCSVを出力</button>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-2">
          <AdminPanel title="投稿作品" items={works} />
          <AdminPanel title="掲示板" items={boardPosts} />
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#E6E6E6] bg-white p-5">
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">{label}</p>
      <p className="mt-4 text-3xl font-light tracking-[-0.06em]">{value}</p>
    </div>
  );
}

const channelLabels: Record<string, string> = {
  Instagram: "Instagram",
  Website: "ウェブサイト",
  Email: "メール",
  Referral: "紹介",
};

const topicLabels: Record<string, string> = {
  Collaboration: "コラボレーション",
  Commission: "依頼制作",
  Question: "質問",
  Event: "イベント",
};

function AdminPanel({ title, items }: { title: string; items: Array<{ id: string; title: string; status?: string; date?: string; type?: string; description?: string }> }) {
  return (
    <div className="rounded-none border border-[#E6E6E6] bg-white p-6">
      <h2 className="mb-6 text-xl font-light">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-b border-[#E6E6E6] pb-4 last:border-none">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-medium">{item.title}</h3>
              {item.status && <span className="text-xs uppercase tracking-[0.12em] text-[#737373]">{statusLabels[item.status] ?? item.status}</span>}
            </div>
            {item.type && <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#737373]">{postTypeLabels[item.type] ?? item.type}</p>}
            {item.date && <p className="mt-2 text-sm text-[#737373]">{item.date}</p>}
            {item.description && <p className="mt-2 text-sm leading-6 text-[#2B2B2B]">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

const statusLabels: Record<string, string> = {
  Approved: "承認済み",
  Pending: "審査待ち",
  Review: "確認中",
};

const postTypeLabels: Record<string, string> = {
  Workshop: "ワークショップ",
  Exhibition: "展示会",
  "Open Call": "公募",
};
