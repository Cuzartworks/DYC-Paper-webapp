"use client";

import { useState } from "react";
import { UploadDropzone } from "@/components/UploadDropzone";
import { works } from "@/lib/content";

export function SubmissionForm({ locale }: { locale: "en" | "ja" }) {
  const isEnglish = locale === "en";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitter, setSubmitter] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState("Devilish Face");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setError("");

    if (!image) {
      setError(isEnglish ? "Please select an image." : "画像を選択してください。");
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${selectedArtwork} — ${submitter.trim() || (isEnglish ? "Community submission" : "コミュニティ投稿")}`,
        submitter: submitter.trim(),
        artworkSlug: works.find((work) => work.title === selectedArtwork)?.slug,
        technique: isEnglish ? "Community submission" : "コミュニティ投稿",
        image,
        imageWidth: 1200,
        imageHeight: 1500,
        description: {
          en: message || "A community interpretation of an unfinished work.",
          ja: message || "未完成の作品に新しい解釈を加えたコミュニティ作品です。",
        },
      }),
    });

    if (!response.ok) {
      setError(isEnglish ? "The submission could not be sent." : "投稿を送信できませんでした。");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setImage("");
    setMessage("");
    setSubmitter("");
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-[800px] gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-[#0D0D0D]">
          {isEnglish ? "Name / Instagram handle" : "名前 / Instagramアカウント"}
          <input
            type="text"
            value={submitter}
            onChange={(event) => setSubmitter(event.target.value)}
            className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none transition-colors focus:border-[#0D0D0D]"
            placeholder={isEnglish ? "@yourhandle" : "@アカウント名"}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-[#0D0D0D]">
          {isEnglish ? "Based on work" : "元になった作品"}
          <select
            value={selectedArtwork}
            onChange={(event) => setSelectedArtwork(event.target.value)}
            className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none transition-colors focus:border-[#0D0D0D]"
          >
            <option>Devilish Face</option>
            <option>Back Fashion</option>
            <option>Dancing II</option>
          </select>
        </label>
      </div>

      <UploadDropzone onFileChange={handleFileChange} />

      <label className="flex flex-col gap-2 text-sm text-[#0D0D0D]">
        {isEnglish ? "Message" : "メッセージ"}
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="resize-none border border-[#E6E6E6] bg-white px-4 py-3 outline-none transition-colors focus:border-[#0D0D0D]"
          placeholder={isEnglish ? "Add a short message about your interpretation." : "作品への解釈やメッセージを入力してください。"}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-[#0D0D0D]">
        <input type="checkbox" className="mt-1 h-4 w-4" required />
        <span>{isEnglish ? "I agree that selected works may be introduced on the site and Instagram." : "選択した作品がサイトやInstagramで紹介されることに同意します。"}</span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-[#0D0D0D] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (isEnglish ? "Sending..." : "送信中…") : isEnglish ? "Submit for Review" : "審査に送る"}
      </button>

      {error && <p className="text-sm text-[#A40000]">{error}</p>}
      {isSuccess && <p className="text-sm text-[#0D0D0D]">{isEnglish ? "Submitted for review. Thank you." : "審査待ちとして送信しました。ありがとうございます。"}</p>}
    </form>
  );
}
