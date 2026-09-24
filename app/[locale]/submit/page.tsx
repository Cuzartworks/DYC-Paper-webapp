import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SubmissionForm } from "@/components/SubmissionForm";
import type { Locale } from "@/lib/content";

export default async function SubmitPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <SubmitContent locale={locale} />;
}

function SubmitContent({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <main className="mx-auto max-w-[960px] px-4 py-20 md:px-8 xl:px-16">
        <div className="mb-10 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">
            {isEnglish ? "Share your drawing" : "作品を共有しよう"}
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,4vw,4rem)] font-light tracking-[-0.06em] text-[#0D0D0D]">
            {isEnglish ? "Share your drawing" : "作品を共有しよう"}
          </h1>
        </div>

        <SubmissionForm locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
