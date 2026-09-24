const steps = [
  {
    number: "01",
    title: "Download",
    subtitle: "ダウンロード",
    description: "Each work can be downloaded and printed or opened in a drawing app.",
    ja: "各作品をダウンロードする。",
  },
  {
    number: "02",
    title: "Draw",
    subtitle: "描く",
    description: "Add your own stroke on paper or in a digital workspace.",
    ja: "印刷または描画アプリで作品に描き足す。",
  },
  {
    number: "03",
    title: "Share",
    subtitle: "共有",
    description: "Post the completed result and tag the work to share it with the community.",
    ja: "完成版を投稿し、タグを付けて共有する。",
  },
];

export function HowItWorks({ locale }: { locale: "en" | "ja" }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 xl:px-16">
      <div className="mb-12 flex items-end justify-between gap-4">
        <h2 className="text-[2.25rem] font-light tracking-[-0.06em] text-[#0D0D0D]">
          {locale === "en" ? "How it works" : "使い方"}
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.number} className="border-t border-[#E6E6E6] pt-6">
            <p className="mb-5 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">{step.number}</p>
            <h3 className="mb-2 text-[1.9rem] font-light tracking-[-0.05em] text-[#0D0D0D]">{step.title}</h3>
            <p className="mb-3 text-sm text-[#737373]">{step.subtitle}</p>
            <p className="max-w-[320px] text-[0.98rem] leading-7 text-[#0D0D0D]">
              {locale === "en" ? step.description : step.ja}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
