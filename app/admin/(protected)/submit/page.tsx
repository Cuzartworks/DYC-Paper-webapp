"use client";

import { useEffect, useMemo, useState } from "react";

type WorkEntry = {
  id: string;
  slug?: string;
  source?: "visitor" | "admin";
  submitter?: string;
  title: string;
  year: number;
  technique: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  description?: { en: string; ja: string };
  status: "Approved" | "Pending" | "Review";
};

export default function AdminSubmitPage() {
  const [works, setWorks] = useState<WorkEntry[]>([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("2025");
  const [technique, setTechnique] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageWidth, setImageWidth] = useState("1200");
  const [imageHeight, setImageHeight] = useState("1500");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionJa, setDescriptionJa] = useState("");
  const [status, setStatus] = useState<WorkEntry["status"]>("Approved");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/works")
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok || !Array.isArray(payload)) {
          throw new Error(payload.error ?? "作品一覧を取得できませんでした。");
        }
        setWorks(payload);
      })
      .catch((reason: Error) => {
        setWorks([]);
        setError(reason.message);
      });
  }, []);

  const total = useMemo(() => works.length, [works]);

  const refreshWorks = async () => {
    const response = await fetch("/api/admin/works");
    const payload = await response.json();
    if (!response.ok || !Array.isArray(payload)) {
      throw new Error(payload.error ?? "作品一覧を取得できませんでした。");
    }
    setWorks(payload);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/works?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    await refreshWorks();
  };

  const handleAdd = async () => {
    setError("");
    if (!title.trim() || !image || !descriptionEn.trim() || !descriptionJa.trim()) {
      setError("作品名、画像、日英の説明文を入力してください。");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          year: Number(year),
          technique: technique.trim() || "Community submission",
          image,
          imageWidth: Number(imageWidth),
          imageHeight: Number(imageHeight),
          description: { en: descriptionEn.trim(), ja: descriptionJa.trim() },
          status,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);

      setTitle("");
      setYear("2025");
      setTechnique("");
      setImage("");
      setImageName("");
      setImageWidth("1200");
      setImageHeight("1500");
      setDescriptionEn("");
      setDescriptionJa("");
      setStatus("Approved");
      await refreshWorks();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "作品を保存できませんでした。もう一度お試しください。");
    } finally {
      setIsSaving(false);
    }
  };

  const handleApprove = async (id: string) => {
    setError("");
    const response = await fetch("/api/admin/works", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "Approved" }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "承認できませんでした。");
      return;
    }

    try {
      await refreshWorks();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "一覧を更新できませんでした。");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 3 * 1024 * 1024) {
      setError("画像ファイル（3MB以下）を選択してください。");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      setImageName(file.name);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#0D0D0D] md:px-8 xl:px-16">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 border-b border-[#E6E6E6] pb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">管理者ツール</p>
          <h1 className="mt-2 text-4xl font-light tracking-[-0.06em]">作品管理</h1>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatCard label="公開作品数" value={String(total)} />
          <StatCard label="審査待ち" value={String(works.filter((item) => item.status === "Pending").length)} />
          <StatCard label="承認済み" value={String(works.filter((item) => item.status === "Approved").length)} />
        </div>

        <div className="mb-8 grid gap-6 border border-[#E6E6E6] bg-[#F6F6F6] p-6">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="新しい作品名を入力"
            className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <label className="grid gap-2 text-sm">作成年
              <input type="number" min="1900" max="2100" value={year} onChange={(event) => setYear(event.target.value)} className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]" />
            </label>
            <label className="grid gap-2 text-sm md:col-span-2">技法
              <input value={technique} onChange={(event) => setTechnique(event.target.value)} placeholder="例：インク、鉛筆" className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]" />
            </label>
          </div>

          <label className="grid gap-2 text-sm">作品画像
            <input type="file" accept="image/*" onChange={handleImageChange} className="border border-[#E6E6E6] bg-white px-4 py-3 text-sm file:mr-4 file:border-0 file:bg-[#0D0D0D] file:px-4 file:py-3 file:text-white" />
            <span className="text-xs text-[#737373]">{imageName || "画像を選択してください（3MB以下）"}</span>
          </label>
          {image && <img src={image} alt="選択した作品のプレビュー" className="max-h-[280px] w-full border border-[#E6E6E6] bg-white object-contain p-4" />}

          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-sm">表示幅（px）
              <input type="number" min="100" max="4000" value={imageWidth} onChange={(event) => setImageWidth(event.target.value)} className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]" />
            </label>
            <label className="grid gap-2 text-sm">表示高さ（px）
              <input type="number" min="100" max="4000" value={imageHeight} onChange={(event) => setImageHeight(event.target.value)} className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]" />
            </label>
          </div>

          <label className="grid gap-2 text-sm">作品詳細（日本語）
            <textarea value={descriptionJa} onChange={(event) => setDescriptionJa(event.target.value)} rows={4} placeholder="作品詳細を入力" className="resize-none border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]" />
          </label>
          <label className="grid gap-2 text-sm">作品詳細（English）
            <textarea value={descriptionEn} onChange={(event) => setDescriptionEn(event.target.value)} rows={4} placeholder="Describe the work" className="resize-none border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]" />
          </label>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <select value={status} onChange={(event) => setStatus(event.target.value as WorkEntry["status"])} className="border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D] md:max-w-[240px]">
              <option value="Pending">審査待ち</option>
              <option value="Review">確認中</option>
              <option value="Approved">承認済み</option>
            </select>
            <button type="button" onClick={handleAdd} disabled={isSaving} className="rounded-full bg-[#0D0D0D] px-6 py-3 text-sm font-medium text-white disabled:opacity-50">
              {isSaving ? "保存中…" : "作品を追加"}
            </button>
          </div>
          {error && <p className="text-sm text-[#A40000]">{error}</p>}
        </div>

        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.id} className="flex flex-col gap-4 border border-[#E6E6E6] bg-white p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-medium">{work.title}</h3>
                <p className="mt-1 text-sm text-[#737373]">{work.technique} · {work.year}</p>
                <p className="mt-1 text-xs text-[#737373]">{work.source === "visitor" ? "観覧者からの投稿" : "管理者投稿"}{work.submitter ? ` · ${work.submitter}` : ""}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.12em] text-[#737373]">{statusLabels[work.status]}</span>
                {work.status !== "Approved" && <button type="button" onClick={() => handleApprove(work.id)} className="rounded-full bg-[#0D0D0D] px-4 py-2 text-sm text-white">承認</button>}
                <button
                  type="button"
                  onClick={() => handleDelete(work.id)}
                  className="rounded-full border border-[#E6E6E6] px-4 py-2 text-sm text-[#0D0D0D]"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const statusLabels: Record<WorkEntry["status"], string> = {
  Approved: "承認済み",
  Pending: "審査待ち",
  Review: "確認中",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#E6E6E6] bg-[#F6F6F6] p-5">
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">{label}</p>
      <p className="mt-3 text-3xl font-light tracking-[-0.06em]">{value}</p>
    </div>
  );
}
