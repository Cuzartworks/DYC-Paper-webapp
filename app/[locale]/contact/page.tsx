import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Locale } from "@/lib/content";

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <ContactContent locale={locale} />;
}

function ContactContent({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";

  return (
    <div className="min-h-screen bg-white text-[#0D0D0D]">
      <Header locale={locale} />
      <main className="mx-auto flex max-w-[860px] flex-col items-center px-4 py-20 text-center md:px-8 xl:px-16">
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">
          {isEnglish ? "GET IN TOUCH" : "お問い合わせ"}
        </p>
        <h1 className="max-w-[700px] text-[clamp(2.5rem,4vw,4.6rem)] font-light leading-[1.05] tracking-[-0.06em] text-[#0D0D0D]">
          {isEnglish ? "Questions, collabs, or just say hello." : "ご相談、コラボ、お気軽にお問い合わせください。"}
        </h1>
        <p className="mt-6 max-w-[620px] text-lg leading-8 text-[#2B2B2B]">
          {isEnglish
            ? "Fill out the short form below and we'll get back to you."
            : "下記フォームをご記入いただくと、担当者よりご連絡いたします。"}
        </p>

        <ContactForm locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
