"use client";

import { useState } from "react";

export function ContactForm({ locale }: { locale: "en" | "ja" }) {
  const isEnglish = locale === "en";
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSent(true);
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="mt-16 grid w-full max-w-[800px] scroll-mt-24 gap-6 border-t border-[#0D0D0D] pt-8 text-left">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-[#0D0D0D]">
          {isEnglish ? "Name" : "お名前"}
          <input
            name="name"
            type="text"
            required
            className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none transition-colors focus:border-[#0D0D0D]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#0D0D0D]">
          {isEnglish ? "Email" : "メールアドレス"}
          <input
            name="email"
            type="email"
            required
            className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none transition-colors focus:border-[#0D0D0D]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-[#0D0D0D]">
        {isEnglish ? "Message" : "お問い合わせ内容"}
        <textarea
          name="message"
          required
          rows={6}
          className="resize-none border border-[#E6E6E6] bg-white px-4 py-3 outline-none transition-colors focus:border-[#0D0D0D]"
        />
      </label>

      <button
        type="submit"
        disabled={isSent}
        className="inline-flex w-fit items-center justify-center rounded-full bg-[#0D0D0D] px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-60"
      >
        {isSent ? (isEnglish ? "Message sent" : "送信しました") : isEnglish ? "Send message" : "送信する"}
      </button>
    </form>
  );
}
