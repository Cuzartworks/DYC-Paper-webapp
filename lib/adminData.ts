export type ContactEntry = {
  id: string;
  name: string;
  email: string;
  channel: "Instagram" | "Website" | "Email" | "Referral";
  topic: "Collaboration" | "Commission" | "Question" | "Event";
  sentiment: "Positive" | "Neutral" | "Needs Follow-up";
  message: string;
  createdAt: string;
};

export type WorkDraft = {
  id: string;
  slug?: string;
  source?: "visitor" | "admin";
  submitter?: string;
  artworkSlug?: string;
  title: string;
  year: number;
  technique: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  description?: { en: string; ja: string };
  status: "Approved" | "Pending" | "Review";
};

export type EventPost = {
  id: string;
  title: string;
  date: string;
  type: "Workshop" | "Exhibition" | "Open Call";
  description: string;
};

export const seedContactEntries: ContactEntry[] = [
  {
    id: "c-101",
    name: "Mina",
    email: "mina@example.com",
    channel: "Instagram",
    topic: "Collaboration",
    sentiment: "Positive",
    message: "We want to feature the DYC PAPER community in a local gallery event.",
    createdAt: "2026-09-11",
  },
  {
    id: "c-102",
    name: "Kento",
    email: "kento@example.com",
    channel: "Website",
    topic: "Commission",
    sentiment: "Needs Follow-up",
    message: "Interested in a commissioned artwork based on the challenged form series.",
    createdAt: "2026-09-15",
  },
  {
    id: "c-103",
    name: "Haru",
    email: "haru@example.com",
    channel: "Email",
    topic: "Question",
    sentiment: "Neutral",
    message: "Asked whether the finished community works can be reposted with credit.",
    createdAt: "2026-09-18",
  },
  {
    id: "c-104",
    name: "Nami",
    email: "nami@example.com",
    channel: "Referral",
    topic: "Event",
    sentiment: "Positive",
    message: "Inquired about the next public drawing session and open call details.",
    createdAt: "2026-09-20",
  },
];

export const seedWorks: WorkDraft[] = [
  {
    id: "w-1",
    title: "Devilish Face",
    year: 2025,
    technique: "インク、グラファイト",
    image: "/works/devilish-face.svg",
    status: "Approved",
  },
  {
    id: "w-2",
    title: "Back Fashion",
    year: 2025,
    technique: "鉛筆、コラージュ",
    image: "/works/back-fashion.svg",
    status: "Review",
  },
  {
    id: "w-3",
    title: "Dancing II",
    year: 2025,
    technique: "マーカー、インク",
    image: "/works/dancing-ii.svg",
    status: "Pending",
  },
];

export const seedBoardPosts: EventPost[] = [
  {
    id: "b-1",
    title: "Community Sketch Night",
    date: "2026-10-08",
    type: "Workshop",
    description: "完成した作品と未完成のスケッチを交換する、小さな公開セッションです。",
  },
  {
    id: "b-2",
    title: "Open Call: Surface Tension",
    date: "2026-10-18",
    type: "Open Call",
    description: "共有の壁面展示に向けて、参加型のドローイングを募集しています。",
  },
];

export function summarizeContactInsights(entries: ContactEntry[]) {
  const topics = entries.reduce<Record<string, number>>((acc, item) => {
    acc[item.topic] = (acc[item.topic] ?? 0) + 1;
    return acc;
  }, {});

  const channels = entries.reduce<Record<string, number>>((acc, item) => {
    acc[item.channel] = (acc[item.channel] ?? 0) + 1;
    return acc;
  }, {});

  const positives = entries.filter((item) => item.sentiment === "Positive").length;
  const followUps = entries.filter((item) => item.sentiment === "Needs Follow-up").length;

  return {
    total: entries.length,
    positives,
    followUps,
    mostActiveTopic: Object.entries(topics).sort((a, b) => b[1] - a[1])[0],
    channelBreakdown: Object.entries(channels).sort((a, b) => b[1] - a[1]),
    summary:
      positives >= followUps
        ? "イベントやコラボレーションへの関心が高く、反応は良好です。"
        : "関心を具体的なアクションにつなげるため、より早いフォローアップが必要です。",
  };
}
