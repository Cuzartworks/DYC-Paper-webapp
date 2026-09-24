export function HeroIntro({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24 xl:px-16">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-end">
        <div>
          <p className="mb-8 text-[0.7rem] uppercase tracking-[0.24em] text-[#737373]">DYC PAPER / DRAW YOUR CREATIVITY</p>
          <h1 className="max-w-[760px] text-[clamp(3.4rem,7vw,7.8rem)] font-light leading-[0.88] tracking-[-0.075em] text-[#0D0D0D]">
            {title}
          </h1>
        </div>
        <div className="max-w-[520px] border-l border-[#0D0D0D] pl-5 md:justify-self-end md:pl-6">
          <p className="text-base leading-8 text-[#2B2B2B]">{body}</p>
          <p className="mt-8 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">01 — Start with an unfinished line</p>
        </div>
      </div>
    </section>
  );
}
