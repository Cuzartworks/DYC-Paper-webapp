import Link from "next/link";
import type { Locale } from "@/lib/content";

export function LanguageSwitcher({ locale, path }: { locale: Locale; path: string }) {
  const targetLocale = locale === "en" ? "ja" : "en";
  const basePath = path.replace(/^\/(en|ja)/, "") || "/";
  const href = `/${targetLocale}${basePath === "/" ? "" : basePath}`;

  return (
    <Link
      href={href}
      className="text-sm font-medium tracking-[0.04em] text-[#0D0D0D] underline-offset-4 hover:underline"
      aria-label="Change language"
    >
      {locale === "en" ? "JA" : "EN"}
    </Link>
  );
}
