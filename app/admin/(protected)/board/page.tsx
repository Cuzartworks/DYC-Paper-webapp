"use client";

import { useEffect, useState } from "react";

type BoardPost = {
  id: string;
  title: string;
  date: string;
  type: "Workshop" | "Exhibition" | "Open Call";
  description: string;
};

export default function AdminBoardPage() {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/api/admin/board")
      .then((response) => response.json())
      .then((payload) => setPosts(payload))
      .catch(() => setPosts([]));
  }, []);

  const refreshPosts = async () => {
    const response = await fetch("/api/admin/board");
    const payload = await response.json();
    setPosts(payload);
  };

  const handleAdd = async () => {
    if (!title.trim() || !description.trim()) return;

    await fetch("/api/admin/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        date: new Date().toISOString().slice(0, 10),
        type: "Workshop",
        description: description.trim(),
      }),
    });

    setTitle("");
    setDescription("");
    await refreshPosts();
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#0D0D0D] md:px-8 xl:px-16">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 border-b border-[#E6E6E6] pb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#737373]">管理者ツール</p>
          <h1 className="mt-2 text-4xl font-light tracking-[-0.06em]">掲示板管理</h1>
        </header>

        <div className="mb-8 space-y-4 border border-[#E6E6E6] bg-[#F6F6F6] p-6">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]"
            placeholder="イベント名"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="w-full resize-none border border-[#E6E6E6] bg-white px-4 py-3 outline-none focus:border-[#0D0D0D]"
            placeholder="イベント内容"
          />
          <button onClick={handleAdd} className="rounded-full bg-[#0D0D0D] px-6 py-3 text-sm font-medium text-white">
            掲示板に投稿
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="border border-[#E6E6E6] bg-white p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-light">{post.title}</h2>
                <span className="text-xs uppercase tracking-[0.12em] text-[#737373]">{postTypeLabels[post.type]}</span>
              </div>
              <p className="mt-2 text-sm text-[#737373]">{post.date}</p>
              <p className="mt-4 text-sm leading-7 text-[#2B2B2B]">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

const postTypeLabels: Record<BoardPost["type"], string> = {
  Workshop: "ワークショップ",
  Exhibition: "展示会",
  "Open Call": "公募",
};
